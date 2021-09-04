const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const MerchantModel = require('./Merchant.js')

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://newuser:aditya_23@crud.igfry.mongodb.net/merchant?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

app.post("/insert", async (req, res) => {
  const name=req.body.name;
    const description=req.body.description;
    const seoMeta=req.body.seoMeta;
    const seoMetaDescription=req.body.seoMetaDescription; 

  const merchant = new MerchantModel({
    productName: name, 
    productDescription: description,
    seoName : seoMeta,
    seoDescription : seoMetaDescription})
    
    await merchant.save((err, result) =>{
      if(err) {
        res.send(err)
      }
      res.send(result)
    })
})

app.get("/read", async (req,res)=> {
  MerchantModel.find({}, (err, result) =>{
    if(err) {
      res.send(err)
    }
    res.send(result)
  })
})

app.put("/update", async (req, res) => {
  const name=req.body.newName;
    const id = req.body.id;

  try {
    await MerchantModel.findById(id, (err, updatedName) => {
      updatedName.productName = name
      updatedName.save()
      res.send("update")
    })
  }catch(err) {
    console.log(err)
  }
})

app.delete("/delete/:id", async (req, res) => {
  const id= req.params.id;
  await MerchantModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})