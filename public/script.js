(async () => {
    // Get Plots and their folder names
    const paths = await fetch("/api/plots").then(res => res.json());
    const folders = paths.map(path => path.replace("plots/", "")).reduce((acc, el) => {
        const [folder, plot] = el.split("/");
        if(!acc[folder]) acc[folder] = [];
        acc[folder].push(plot);
        return acc;
    }, {});

    // Set title to currently displayed folder (first)
    document.title = `${Object.keys(folders)[0]} - Plot Viewer`;

    // Bind folder names to Select
    const selectElement = document.getElementById("folders");
    Object.keys(folders).forEach(name => {
        const optionElement = document.createElement("option");
        optionElement.value = name;
        optionElement.innerText = name;

        selectElement.appendChild(optionElement);
    });

    
    const createPlotElement = (name, plot) => {
        const containerElement = document.createElement("div");
        containerElement.classList.add("plot-container");

        const label = document.createElement("h3");
        label.innerText = plot.replace(".png", "");
        
        const plotImage = document.createElement("img");
        plotImage.classList.add("plot");
        plotImage.src = `plots/${name}/${plot}`;

        containerElement.appendChild(label);
        containerElement.appendChild(plotImage);
        
        return containerElement;
    };
    
    // Generate containers and populate them
    const folderElements = new DocumentFragment();
    Object.entries(folders).forEach((folder, i) => {
        const [name, plots] = folder;
        const folderElement = document.createElement("div");

        folderElement.classList.add("folder");
        folderElement.classList.add(name);
        const display = i===0 ? "selected" : "hidden";
        folderElement.classList.add(display);

        // // Label
        // const label = document.createElement("h2");
        // label.innerText = name;
        // folderElement.appendChild(label);

        // Populate
        const plotElements = new DocumentFragment();
        plots.forEach(plot => {
            const plotElement = createPlotElement(name, plot);
            plotElements.appendChild(plotElement);
        });

        folderElement.appendChild(plotElements);

        folderElements.appendChild(folderElement);
    });

    document.body.appendChild(folderElements);

    selectElement.addEventListener("change", (e) => {
        const folders = [...e.target.options].map(folder => folder.value);
        const selectedFolder =  folders[e.target.selectedIndex];

        // Hide all
        document.querySelectorAll("div.folder").forEach(folder => {
            folder.classList.remove("selected");
            folder.classList.add("hidden");
        });

        // Show selected
        const selected = document.querySelector(`div.folder.${selectedFolder}`);
        selected.classList.remove("hidden");
        selected.classList.add("selected");

        // Set title to currently displayed folder
        document.title = `${selectedFolder} - Plot Viewer`;
    });

})();