import express from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors'
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

app.post("/signup", async(req,resp)=>{
const userData= req.body;
if(userData.email && userData.password){
  const db = await connection();
  const collection= await db.collection("users")
  const result = await collection.insertOne(userData)
if(result){
jwt.sign(userData,'Google',{expiresIn:'5days'},(error,token)=>{
    resp.send({
        success:true,
        msg:'signup done',
        token
    })
})
} else{
   resp.send({
        success:false,
        msg:'signup not done',
        token
    })  
}
}
})
app.post("/login", async(req,resp)=>{
const userData= req.body;
if(userData.email && userData.password){
  const db = await connection();
  const collection= await db.collection("users")
  const result = await collection.findOne({email:userData.email,password:userData.password})
if(result){
jwt.sign(userData,'Google',{expiresIn:'5days'},(error,token)=>{
    resp.send({
        success:true,
        msg:'login done',
        token
    })
})
}
 else{
   resp.send({
        success:false,
        msg:'user not found',
    }) 
     
}
}
else {
        resp.send({
            success: false,
            msg: 'invalid input'
        });
    }
})

app.post("/add-task", verifyJWTToken ,async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(req.body);

    if(result){
        resp.send({message:"new task added",success:true,result})
    } else{
        resp.send({message:"task not added",success:false})
    }
});


app.get("/tasks", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = db.collection(collectionName);

    const result = await collection.find().toArray();

    if(result){
        resp.send({message:"task list fetched",success:true,result})
    } else{
        resp.send({message:"error try after some time",success:false})
    }
});


app.get("/task/:id", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const id = req.params.id;
    const collection = db.collection(collectionName);

    const result = await collection.findOne({ _id: new ObjectId(id) });

    if(result){
        resp.send({ success: true, result });
    } else {
        resp.send({ success: false });
    }
});


app.put("/update/:id", verifyJWTToken, async (req, resp) => {
    try {
        const db = await connection();
        const id = req.params.id;
        const collection = db.collection(collectionName);

        
        if (!ObjectId.isValid(id)) {
            return resp.status(400).send({ success: false, message: "Invalid ID" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title: req.body.title, description: req.body.description } }
        );

        resp.send({ success: true, result });

    } catch (error) {
        resp.status(500).send({ success: false, error: error.message });
    }
});



app.delete("/delete/:id", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const id = req.params.id;
    const collection = db.collection(collectionName);
 
    if (!ObjectId.isValid(id)) {
        return resp.send({ success: false, message: "Invalid ID" });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if(result){
        resp.send({message:"task deleted",success:true,result})
    } else{
        resp.send({message:"error try after some time",success:false})
    }
});
app.delete("/delete-multiple",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const Ids = req.body;
    const deleteTaskIds= Ids.map((item)=>new ObjectId(item))
    const collection = db.collection(collectionName);

    const result = await collection.deleteMany({ _id:{$in:deleteTaskIds}});

    if(result){
        resp.send({message:"task deleted",success:true,result})
    } else{
        resp.send({message:"error try after some time",success:false})
    }
});

function verifyJWTToken(req,resp,next){
const token = req.cookies['token'];
jwt.verify(token,'Google',(error,decoded)=>{
    if(error){
        return resp.send({
            message:"Invalid token",
            success:false
        })
    }
    next()
console.log(decoded);

})

}

app.listen(3400);