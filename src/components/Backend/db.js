const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/quizer";
const connectToMongo=()=>{
    console.log("Connected To Mongoose Successfully")
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To Mongoose Successfully")
    })
    // mongoose.connect(mongoURI)
    // .then(() => {
    //     console.log('Connected to MongoDB');
    // })
    // .catch(err => {
    //     console.error('Connection error:', err);
    // });
}
module.exports=connectToMongo;