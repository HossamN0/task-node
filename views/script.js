const form = document.getElementById("form")
const location = document.getElementById("location")
const forecast = document.getElementById("forecast")
const error = document.getElementById("error")
const inputtxt = document.getElementById("inputtxt")


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    weatherFun()
    form.reset()
})

let weatherFun = async()=>{
    try{
        let value = inputtxt.value
        let dataJson = await fetch(`http://localhost:3000/weather?address=${value}`)
        let data = await dataJson.json()
        console.log(data)
        if(data.error){
            error.innerHTML = data.error
            location.innerHTML = ""
            forecast.innerHTML = ""
        }else{
            error.innerHTML = ""
            location.innerHTML = data.name + " " + data.country
            setTimeout(()=>{
                forecast.innerHTML = data.temp
            }, 1000)
        }
    }
    catch (e){
        console.log(e)
    }
}