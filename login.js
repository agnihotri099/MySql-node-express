const mysql=require('mysql')
const express=require('express')
const bodyParser=require('body-parser')
const encoder=bodyParser.urlencoded()

const app=express();

app.use("/assets",express.static("assets"))

const connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"9415",
    database:"nodejs"
});

connection.connect(function(error){
  if(error) throw error
  else console.log("connected to database successfully")
})


//authenticate app and database
app.post("/",encoder,function(req,res){
    const username=req.body.username;
    const password=req.body.password

    connection.query("select * from loginuser where user_name=? and user_pass=?",[username,password],function(error,results,fields){
        if(results.length>0){
                res.redirect("/welcome")
        }
        else{
                res.redirect("/")
        }
        res.end()
    })
})

//when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname+"/welcome.html")
})


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.listen(5000)