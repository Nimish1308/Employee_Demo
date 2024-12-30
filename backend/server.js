const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/crud_example").then(() => {
    console.log("DB Connection Created")
}).catch(() => {
    console.log("DB Connection Failed")
})

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        required:false
    }
},
    { timestamps: true }
)

const Emp=mongoose.model("employee",empSchema); 

//API
app.get("/", (req, res) => {
    res.send(`Sample API is working!!!!!!!!!!!`)
})

//Create
app.post("/create",async(req,res)=>{
    try {
        const empBody=req.body;
        const empObject=new Emp(empBody);
        const empSave=await empObject.save();
        res.send(empSave)
    } catch (error) {
        res.send(error)
    }
})

//Find by id
app.get("/findbyid/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findById({_id:id});
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//Find all
app.get("/find",async(req,res)=>{
    try {
       
        const data=await Emp.find({});
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//Update
app.put("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//Delete
app.delete("/delete/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Emp.findByIdAndDelete({_id:id});
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})


app.listen(PORT, () => {
    console.log(`Server is running at port no:${PORT}`)
})