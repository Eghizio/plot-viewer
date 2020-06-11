(async () => {
    const paths = await fetchPaths();
    const parent = document.getElementById("main");

    addCollumn(parent, paths, false);
})();