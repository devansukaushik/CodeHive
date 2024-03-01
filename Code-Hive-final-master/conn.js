
const mongoose= require("mongoose");
const dotenv =require("dotenv")
const DATABASE_URL = process.env.CONNECTION_URL;
mongoose.connect(`${DATABASE_URL}` ,
{useNewUrlParser:true , useUnifiedTopology:true,autoIndex:true}
).then(()=>{
    console.log("conection successfulllll");
}).catch((e)=>{
    console.log("error in connection" + e);
})
module.exports=mongoose;