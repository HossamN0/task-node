const request = require("request")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")

const forecastGeo = (city, callback)=>{
    
    const urlgeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw`

    request({url:urlgeo, json:true}, (error, response)=>{
        if(error){
            callback("error", undefined)
        }else if(response.body.message){
            callback(response.body.message, undefined)
        }else if (response.body.features.length == 0) {
            callback("Unable to find location" , undefined)
        }else{
            callback(undefined,{
                longtitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1]
        })
        }
    })
}


const forecast = (long, lat, callback)=>{
    
    const url = `https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=${lat},${long}`

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback("error", undefined)
        }else if(response.body.error){
            callback(response.body.error.message, undefined)
        }else{
            callback(undefined,{
                name: response.body.location.name,
                country: response.body.location.country,
                temp: response.body.current.temp_c
            })
        }
    })
}


const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))


app.set('view engine', 'hbs')
const pathnow = path.join(__dirname, "../views")
app.set("views", pathnow)

app.get("/", (req, res)=>{
    res.render("index",{
        title: "Home page"
    })
})
app.get("/weather", (req, res)=>{
    if(!req.query.address){
        res.send({
            error: "Enter address"
        })
    }

    forecastGeo(req.query.address, (error, data)=>{
        if(error){
            return res.send({error})
        }
    
        forecast(data.longtitude, data.latitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                data: forecastData
            })
        })
    })
})

app.get("*", (req,res)=>{
    res.send("Page not Found")
})

app.listen(port, ()=>{
    console.log(`worked on ${port}`)
})