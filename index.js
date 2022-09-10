import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/Login-Register",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email,password } = req.body;
  User.findOne({email:email},(err,user)=>{
    if(user){
if(password===user.password){
  res.send({message:"Login Successful", user:user})
}
else{
  res.send({message:"Password is not correct"})
}
    }
    else{
      res.send({message:"User not Registered"})
    }
  })
});
app.post("/register", (req, res) => {
 const {name,email,password} = req.body; //You can try console.log(req.body) here

 User.findOne({email:email},(err,user)=>{
  if(user){
    res.send({message:"User already registered"})
  }

  else{
    const user = new User //this will create user database in mongodb
    ({
     name, //or name:name
     email,
     password
    })
    user.save(err=>{ //user.save will save the user data in database
     if(err){
       res.send(err)
     }
     else{
       res.send({message :"Successfully Registered"})
     }
    })
  }

    
  
})
})

 

app.listen(9000, () => {
  console.log("Started at PORT 9000")
})
