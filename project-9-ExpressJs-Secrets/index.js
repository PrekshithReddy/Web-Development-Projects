import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import { dirname} from "path";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

var UserIsAuthorized=false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req,res,next)
{
    const password=req.body["password"];
    if(password=="ILoveProgramming")
    {
        UserIsAuthorized=true;
    }
    next();
}
app.use(passwordCheck);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/check",(req,res)=>{
    if(UserIsAuthorized)
    {
        res.sendFile(__dirname+"/public/secret.html");
    }
    else{
        res.sendFile(__dirname+"/public/index/html");
    }
});

app.listen(port,()=>{
    console.log("Listening to th port"+port);
});