(async () => {
    const paths = await fetchPaths();

    selectPlotsPopulation(paths, document.getElementById("folders"), document.getElementById("main"));
})();