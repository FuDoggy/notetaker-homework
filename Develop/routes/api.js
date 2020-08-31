var db = require("../db/db.json");
var fs = require("fs")
var path = require("path")

module.exports = function(app) {

    app.get(`/api/notes`, function(req, res) {
        res.json(db)
    });

    // app.post("/api/notes", function(req, res){
    //     fs.readFile(__dirname + "/db/db.json", "utf8", function(err) {
    //         if(err) throw err
    //         // console.log(data)
    //         console.log(req.body)
    //         const userInput = JSON.parse(data)
    //         req.body.id = userInput.length + 1
    //         userInput.push(req.body)
    //         console.log(userInput)
    //     fs.writeFile(__dirname + "/db/db.json", JSON.stringify(userInput), function(err) {
    //         if (err) throw err
    //         })
    //     })
    // });
    app.post(`/api/notes`, function(req, res) {
        console.log(req.body)
        db.push(req.body); 
        fs.readFile(path.join(__dirname, "../db/db.json"), function(err, data) {
            if (err) throw err
            const userInput = JSON.parse(data)
            req.body.id = userInput.length + 1
            userInput.push(req.body);
        

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
            if (err) throw err
            res.send("Success")
        })
        })
    });

    app.delete(`/api/notes/:id`, function(req, res) {
        console.log(req.params.id);
        db.splice(req.params.id, 1);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
            if (err) throw err;
            res.send("Success")
        })
        //for loop to compare 
    });
}