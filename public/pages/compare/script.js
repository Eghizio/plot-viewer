{/* <article id="left"> //id=ID
    <nav>
        <select id="folders"></select>
        <button>Remove</button>
    </nav>
    <div class="folder name">
        <div class="plot-container"></div> // more plots
    </div>
</article> */}
const ID = '_' + Math.random().toString(36).substr(2, 9);

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

const addCollumn = (paths, parent) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("collumn");
    articleElement.id = ID;

    const selectElement = addNavigation(articleElement);
    selectPlotsPopulation(paths, selectElement, articleElement);
    parent.appendChild(articleElement);
};



(async () => {
    const paths = await fetchPaths();

    selectPlotsPopulation(paths, document.getElementById("folder1"), document.getElementById("left"));
    selectPlotsPopulation(paths, document.getElementById("folder2"), document.getElementById("right"));
    addCollumn(paths, document.getElementById("main"));
})();