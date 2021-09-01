const express = require('express');
const app= express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "merchantproduct",
});

app.post('/create',(req, res)=>{
  const name=req.body.name;
  const description=req.body.description;
  const seoMeta=req.body.seoMeta;
  const seoMetaDescription=req.body.seoMetaDescription;

  db.query(
    "INSERT INTO product (name, description, seoname, seodescription) VALUES (?,?,?,?)",
    [name, description, seoMeta, seoMetaDescription], 
    (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});

app.get('/products',(req, res) => {
  db.query(
    "Select * from product", 
    (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/update', (req, res) => {
  const id= req.body.id;
  const name=req.body.name;
  db.query("UPDATE product SET name= ? where id =?",[name, id], (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result);
    }
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM product where id= ?", 
    id, (err, result)=>{
      if(err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
})

app.listen(3001 ,()=> {
  console.log("yay your server is running on port 3001")
});


// const router = express.Router();
// const multer = require('multer');

// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// const upload=multer();
// router.post("/upload", upload.single("file"), async function(req, res, next) {
//   const {
//     file,
//     body: { name }
//   } = req;

//   const fileName = name + file.detectedFileExtension;
//   await pipeline(
//     file.stream,
//     fs.createWriteStream(`${__dirname}/../public/images/${fileName}`)
//   );

//   res.send("File uploaded as " + fileName);
// });

// module.exports = router;
