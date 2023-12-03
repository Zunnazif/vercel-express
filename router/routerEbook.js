const express = require("express")
const route = express.Router();
const fs = require('fs')
const data = JSON.parse(fs.readFileSync(__dirname + "/ebookDb.json", "utf8")).data

route.post("/GetMultipleEBookByName", (req, res) => {

    const { bookName } = req.body;

    const keywordToSearch = bookName;
    const keyword = keywordToSearch.toLowerCase();
    const result = data.filter(item => item.bookName.toLowerCase().indexOf(keyword) > -1)

    if (result.length > 0) {
        res.send({
            eBooks: result, 
            message: `Berhasil Mengambil ${result.length} Link E-Book`, 
            isSucceeded: true
        })
    } else {
        res.send({
            eBooks: null, 
            message: "Link E-Book Not Found", 
            isSucceeded: false
        })
    }
})

route.post("/GetMultipleEBookBySKU", (req, res) => {
    const { sku } = req.body

    let search = sku
    let arrSplit = search.split(" ")
    console.log(arrSplit)
    let result = []
    
    for (let i = 0; i < arrSplit.length; i++) {
        data.filter(item => {
            if (item.sku == arrSplit[i]) {
                result.push(item)
            }
        })
    }
    
    if (result.length > 0) {
        res.send({
            eBooks: result, 
            message: `Berhasil Mengambil ${result.length} Link E-Book`, 
            isSucceeded: true
        })
    } else {
        res.send({
            eBooks: null, 
            message: "Link E-Book Not Found", 
            isSucceeded: false
        })
    }
})


module.exports = route