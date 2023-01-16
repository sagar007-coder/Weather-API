const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function(req, res) {

    res.sendFile(__dirname + '/index.html');
})

app.post("/", function(req, res) {


    const q = req.body.city;

    var url ="https://api.openweathermap.org/data/2.5/forecast?q="+ q +"&appid=4d69317395092071205a7b650cabfbe4&units=metric";

    https.get(url, function (response) {
        response.on("data", function (data) {
            const json = JSON.parse(data);
            const temp = json.list[0].main.temp;
            const weatherDescription = json.list[0].weather[0].description;
            const icon = json.list[0].weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
              
            
            res.write("<h1>The Temperatur in " + q + " is " +temp+" C.</h1>");
            res.write("<h2>With  " +weatherDescription+" .</h2>")
            //res.write(imgUrl);
            res.write("<img src="+imgUrl+">");
             res.send();


        })

    })


 

})




app.listen(3000, function(){
    console.log("Server listening on port 3000");
});