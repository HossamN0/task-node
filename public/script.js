const form = document.getElementById("form1")
const locationf = document.getElementById("location")
const forecast = document.getElementById("forecast")
const errorf = document.getElementById("error")


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    weatherFun()
    form.reset()
})

let weatherFun = async()=>{
    try{
        let valuee = document.getElementById("inputtxt").value
        let dataJson = await fetch(`http://localhost:3000/weather?address=${valuee}`)
        let data = await dataJson.json()
        if(data.error){
            errorf.innerHTML = data.error
            locationf.innerHTML = ""
            forecast.innerHTML = ""
        }else{
            errorf.innerHTML = ""
            locationf.innerHTML = data.data.name + " " + data.data.country
            setTimeout(()=>{
                forecast.innerHTML = data.data.temp
            }, 1000)
        }
    }
    catch (e){
        console.log(e)
    }
}