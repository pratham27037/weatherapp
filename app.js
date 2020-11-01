const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
  const query=req.body.cityName;
  const appkey = "f63293c22d42aa4aed682545b4b7cd8d";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units="+unit;

  https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on("data",(data)=>{
      var weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp
      const weatherDescription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageUrl = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently "+weatherDescription+"<p>")
      res.write("<h1>the temperature in "+query+" is "+temp+" degree Celcius<h1>")
      res.write("<image src="+imageUrl+">")
      res.send()
    })
  })
})



app.listen(3000,()=>{
  console.log("server started")
})
