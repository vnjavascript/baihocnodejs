var express = require("express");
var  fortunes = require("./fortunes");
var app = express();
// setup handlebar engine $ npm install --save express3-handlebars
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'Masterpage' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//===============================================
app.use(express.static(__dirname+"/public"));
app.set('port' , process.env.PORT || 3000 );
app.get("/" , function(req , res){
    // res.type("text/plain");
    // res.send("Meadowlark Travel");
    res.render("home");
})
app.get("/about" , function(req , res){
    // res.type("text/plain");
    // res.send("About Meadowlark Travel");
    
    const randomFortune  = fortunes[Math.floor(Math.random()*fortunes.length)];

   //Math.floor(Math.random * fortune.fortunes.length)
    res.render("about",{fortune : randomFortune});
})

app.get("/say" , (req , res)=>{
res.render("say");
})

// customer pages 404 
app.use(function(req , res , next){
   // res.status(404);
    res.render("404")
})

// customer 500page
app.use(function(err,req,res,next){
    console.error(err.stack);
   // res.type("text/plain");
  //  res.status(500);
    res.render("500");
})
app.listen(app.get("port") , function(){
console.log("start port : " + app.get("port"));
});