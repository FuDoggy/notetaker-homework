var db = require("../db/db.json");
var fs = require("fs")
var path = require("path")

module.exports = function(app) {

    app.get(`/api/notes`, function(req, res) {
        res.json(db)
    });


    app.post(`/api/notes`, function(req, res) {
        console.log(req.body)
        db.push(req.body); 
        console.log(__dirname)
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

    app.delete("/api/notes/:id", function(req, res){
        const {id} = req.params;
        console.log(id)
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
            if(err) throw err
            const dataArr = JSON.parse(data)
            for (let i = 0; i < dataArr.length; i++) {
               if(dataArr[i].id == id) {
                   dataArr.splice(i, 1)
               }
            }
            console.log(dataArr)

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dataArr), function(err) {
                if (err) throw err
                res.send("Success")
            })
        })        
    });  
    
}