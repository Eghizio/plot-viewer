const fetchPaths = async () => await fetch("/api/plots").then(res => res.json());

const addCollumn = (parent, paths, removable=true) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("collumn");

    const selectElement = addNavigation(articleElement, removable);
    populateCollumn(articleElement, selectElement, paths);

    parent.appendChild(articleElement);
};

const addNavigation = (parent, removable=true) => {
    const navigation = document.createElement("nav");
    navigation.classList.add("nav-folder");

    const selectElement = document.createElement("select");
    selectElement.classList.add("select-folder");

    const removeButton = document.createElement("button");
    removeButton.classList.add("button-remove");
    removeButton.innerText = "❌";
    removeButton.title = "Remove collumn";

    removeButton.addEventListener("click", () => {
        parent.remove();
    });

    navigation.appendChild(selectElement);
    if(removable) navigation.appendChild(removeButton);

    parent.appendChild(navigation);

    return selectElement;
};

const populateCollumn = (parent, selectElement, paths) => {
    const ID = '_' + Math.random().toString(36).substr(2, 9);

    // Parse Plots and their folder names
    const folders = paths.map(path => path.replace("plots/", "")).reduce((acc, el) => {
        const [folder, plot] = el.split("/");
        if(!acc[folder]) acc[folder] = [];
        acc[folder].push(plot);
        return acc;
    }, {});

    // Set title to currently displayed folder (first)
    document.title = `${Object.keys(folders)[0]} - Plot Viewer - View`;

    // Bind folder names to Select
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
        plotImage.src = `/plots/${name}/${plot}`;

        containerElement.appendChild(label);
        containerElement.appendChild(plotImage);
        
        return containerElement;
    };
    
    // Generate plot folders and populate them
    const folderElements = new DocumentFragment();
    Object.entries(folders).forEach((folder, i) => {
        const [name, plots] = folder;
        const folderElement = document.createElement("div");

        folderElement.classList.add("folder");
        folderElement.classList.add(name+ID);
        const display = i===0 ? "selected" : "hidden";
        folderElement.classList.add(display);

        // Populate
        const plotElements = new DocumentFragment();
        plots.forEach(plot => {
            const plotElement = createPlotElement(name, plot);
            plotElements.appendChild(plotElement);
        });

        folderElement.appendChild(plotElements);
        folderElements.appendChild(folderElement);
    });

    

    selectElement.addEventListener("change", (e) => {
        const folders = [...e.target.options].map(folder => folder.value);
        const selectedFolder =  folders[e.target.selectedIndex];

        // Hide all
        folders.forEach(folder => {
            const element = document.querySelector(`div.folder.${folder+ID}`);
            element.classList.remove("selected");
            element.classList.add("hidden");
        });

        // Show selected
        const selected = document.querySelector(`div.folder.${selectedFolder+ID}`);
        selected.classList.remove("hidden");
        selected.classList.add("selected");

        // Set title to currently displayed folder
        document.title = `${selectedFolder} - Plot Viewer - View`; //does change on compare
    });

    parent.appendChild(folderElements);
};