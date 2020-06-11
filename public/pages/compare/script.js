(async () => {
    const paths = await fetchPaths();
    const parent = document.getElementById("main");

    addCollumn(parent, paths, false);
    addCollumn(parent, paths, false);
    
    const addButton = document.getElementById("add-collumn");
    addButton.addEventListener("click", () => {
        addCollumn(parent, paths);
    });

})();