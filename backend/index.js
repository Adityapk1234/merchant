const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const MerchantModel = require('./Merchant.js')
require('dotenv').config();

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
    
    await merchant.save();
    res.send(merchant)
})

app.get("/read", async (req,res)=> {
  await MerchantModel.find({}, (err, result) =>{
    if(err) {
      res.send(err)
    }else {
    res.send(result)
  }
  })
})

app.put("/update", async (req, res) => {
  const newName=req.body.backendnewName;
  const id = req.body.id;
  console.log(newName,id)
  try {
    await MerchantModel.findById(id, (err, nameToUpdate) => {
      nameToUpdate.productName = String(newName);
      nameToUpdate.save();
    })
  }catch(err) {
    console.log(err)
  }
  res.send("Updated");
});

app.delete("/delete/:id", async (req, res) => {
  const id= req.params.id;
  await MerchantModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Server running on port 3001')
})