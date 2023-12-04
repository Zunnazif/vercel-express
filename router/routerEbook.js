import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSONPreset } from 'lowdb/node'

const route = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ebooks = JSON.parse(fs.readFileSync(__dirname + "/ebookDb.json", "utf8")).data

route.post('/GetMultipleEBookByName', (req, res) => {

    const { bookName } = req.body;

    const keywordToSearch = bookName;
    const keyword = keywordToSearch.toLowerCase();
    const result = ebooks.filter(item => item.bookName.toLowerCase().indexOf(keyword) > -1)

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

route.post('/GetMultipleEBookBySKU', (req, res) => {
    const { sku } = req.body

    let search = sku
    let arrSplit = search.split(" ")
    console.log(arrSplit)
    let result = []
    
    for (let i = 0; i < arrSplit.length; i++) {
        ebooks.filter(item => {
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

route.post("/AddSingleEBook", async (req, res) => {

    const { sku, bookName, link } = req.body;
    let datas = {
        sku,
        bookName,
        link
    }

    const db = await JSONPreset('./router/ebookDb.json', {data: []})
    const { data } = db.data;
    
    data.push(datas)

    await db.write()

    res.status(200).send({isSucceeded: true, message: `Berhasil menambahkan link ebook no SKU ${datas.sku}`})

})

route.post("/AddMultipleEBook", async (req, res) => {

    const { datas } = req.body;
    console.log(datas)
    const db = await JSONPreset('./router/ebookDb.json', {data: []})
    const { data } = db.data;
    datas.forEach(item => {
        data.push(item)
    });

    await db.write()

    res.status(200).send({isSucceeded: true, message: `Berhasil menambahkan ${datas.length} link ebook`})
})


export default route