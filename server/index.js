const express = require("express");
const app = express();
const connectDB = require("./configs/mongodb.config");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors=require('cors');

dotenv.config();

const userRouter = require('./routes/user');
const assess_voiceRouter=require('./routes/assess-voice')
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.use('/user',userRouter);
app.use('/trainee',assess_voiceRouter);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started at port ${PORT}`);
    });
}).catch((error)=>{
    console.log("error while starting the server");
    console.log(error);
});