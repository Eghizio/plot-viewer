const fs = require("fs");
const express = require("express");

const walkDirectory = (dir) =>{
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        file = dir + "/" + file;
        const stat = fs.statSync(file);

        if(stat && stat.isDirectory()) 
            results = results.concat(walkDirectory(file)); // Recurse into a subdirectory
        else
            results.push(file); // Is a file
    });

    return results;
}

// Run server and serve API with file structure, and html that consumes it and displays img's
const app = express();

app.set('json spaces', 2);

app.use("/", express.static("public"));
app.use("/plots", express.static("plots"));

app.get("/api/plots", (req, res) => res.json(walkDirectory("plots")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log("\x1b[35m%s\x1b[0m", `Server started on port ${PORT}... \n${Date()}`));