//main js file:
let showCoordinates = document.getElementById("showCoordinates")
let geoLocationBtn = document.getElementById("geoLocationBtn")
let inputBtn = document.getElementById("inputBtn")
let inputPlace = document.getElementById("inputPlace")
let main = document.getElementById("main")
let oneDayWeather = document.getElementById("oneDayWeather")
let fiveDaysWeather = document.getElementById("fiveDaysWeather")
//let class0 = document.querySelector(".class0")
let container  = document.querySelector(".container")
let backgroundClip = document.querySelector(".background-clip")
let clearFullHD = document.querySelector(".clearFullHD")
let cloudsFullHD = document.querySelector(".cloudsFullHD")
let rainFullHD = document.querySelector(".rainFullHD")
let snowFullHD = document.querySelector(".snowFullHD")


let err1 = document.getElementById("err1")
let err2 = document.getElementById("err2")
let err3 = document.getElementById("err3")
let err4 = document.getElementById("err4")

//  1 . get geo location after press 'geo-location-btn' and show weather based on geo location:
/*=============================================================================================*/
geoLocationBtn.addEventListener("click",getGeoLocation)
geoLocationBtn.addEventListener("click",()=>{
    inputPlace.classList.add("hideInputPlace")
    inputBtn.classList.add("hideInputBtn")
})

//hide geoLocation icon: 
geoLocationBtn.addEventListener("click",()=>{
    geoLocationBtn.classList.add("hideInputPlace")
    geoLocationBtn.classList.add("hideGeoLocationBtn")
    geoLocationBtn.classList.add("floatSpanTransition")
})

function getGeoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,failure)
    }else{err1.innerHTML = `could not get location`}
}
function success(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    //function here to grab long, lat variables
    //syntex
    //append these lat long in html:
    showCoordinates.innerHTML = `Latitude : ${latitude} Longitude: ${longitude}`
    myCoordinates(latitude, longitude)
}
function failure(err){
   // err2.innerHTML `could not get location`
    //switch case 
    switch(err.code){
        case err.PERMISSION_DENIED: 
        err3.innerHTML = `Permission Denied`
        break
        case err.TIME_OUT: 
        err3.innerHTML = `Time Out`
        break
        case err.POSITION_UNAVAILABLE: 
        err3.innerHTML = `Position Unavialable`
        break

    }
}
function myCoordinates(latitude, longitude){
    let URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
         fetch(URL)
         .then(response=>{
            console.log(response)
            return response.json()
         })
         .then(data=>{
            console.log(data)
            console.log(data.list[0])
            oneDayWeather.innerHTML = `
                        <p class="todayWeather1">Today's Weather </p>
                        <p class="oneDayWeatherParaA">${data.city.name}</p>
                        <p class="oneDayWeatherParaB">${data.list[0].weather[0].main} </p>
                                    
            <div class="img-div">
            <img class="svgStyleClass2" src="./weatherSvg/${data.list[0].weather[0].main.toLowerCase()}.svg">
            </div>
                    <span class="oneDayWeatherParaC oneMax">${(data.list[0].main.temp_max-273).toFixed(0)} &deg;C</span>
                    <span class="oneDayWeatherParaC oneMin">${(data.list[0].main.temp_min-273).toFixed(0)} &deg;C</span>
                                                  
                                    `
                                    oneDayWeather.classList.add('opacityAddOneDay')
                //change background-img according to weather[0].main :
                let clearFullHD = document.querySelector(".clearFullHD")
                let cloudsFullHD = document.querySelector(".cloudsFullHD")
                  let rainFullHD = document.querySelector(".rainFullHD")
                let snowFullHD = document.querySelector(".snowFullHD")
                let BGLakeFullHD = document.querySelector(".BGLakeFullHD")
               
                //trying fix BG img issue:
                
              
               //now im trying use Switch/Case to chnage BG:
               switch(data.list[0].weather[0].main){
                case "Clear": 
                clearFullHD.classList.add('opacity1')
                break;
                case "Rain": 
                rainFullHD.classList.add('opacity1')
                break;
                case "Clouds": 
                cloudsFullHD.classList.add('opacity1')
                break;
                case "Snow": 
                snowFullHD.classList.add('opacity1')
                break;
                default: 
                BGLakeFullHD.classList.add('opacity1')
               }
           
            //for Loop:
            for(let i = 0; i<data.list.length; i = i+8){
                console.log(data.list[i])

               /* window.onload = function(){
                    data.list[0].style.color = "blue";
                }  */

                let time = new Date(data.list[i].dt*1000)
                let day = time.toDateString().split(" ")[0]
               
                

           
            
            //*************5 days weather:
            let _5Daysdiv = document.createElement("span")
                _5Daysdiv.innerHTML = `
                        <p class="weekDayPara">${day}</p>
                        
                        <img class="svgStyleClass" src="./weatherSvg/${data.list[i].weather[0].main.toLowerCase()}.svg">
                        <p class="tempPara fiveMax"> ${(data.list[i].main.temp_max-273).toFixed(0)} &deg;C</p>
                        <p class="tempPara fiveMin"> ${(data.list[i].main.temp_min-273).toFixed(0)} &deg;C</p>
                        <p class="descriptionPara">${data.list[i].weather[0].description}</p>
                                  
                `
                fiveDaysWeather.appendChild(_5Daysdiv)
                _5Daysdiv.classList.add("floatSpan")

                _5Daysdiv.classList.add("floatSpanTransition")
               
            }
            
         })
         .catch(err=>{
            console.error(err)
         })
}

//==================================================================================== 

//  2. get weather to use  click *input-btn*  : 
/*=============================================*/

inputBtn.addEventListener("click",inputBtnFunction)

//inputBtn.addEventListener("click",changeBgVideos)
inputBtn.addEventListener("click", ()=>{
    geoLocationBtn.classList.add("hideGeoLocationBtn")
})

//hide input and submit btn
inputBtn.addEventListener("click", ()=>{
    inputPlace.classList.add("hideInputPlace")
    inputBtn.classList.add("hideInputBtn")
    inputBtn.classList.add("floatSpanTransition")
})

function inputBtnFunction(){
    let cityName = document.getElementById("inputPlace").value
    let URL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`
   /* let URL2 =  `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIkey}` */
    /*        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`  */

    fetch(URL2)
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .then(data=>{
        console.log(data)

        console.log(data.list[0])
            oneDayWeather.innerHTML = `
            <p class="todayWeather1">Today's Weather </p>
            <p class="oneDayWeatherParaA">${data.city.name}</p>
            <p class="oneDayWeatherParaB">${data.list[0].weather[0].main} </p>
             
            <div class="img-div">
            <img class="svgStyleClass2" src="./weatherSvg/${data.list[0].weather[0].main.toLowerCase()}.svg">
            </div>
            <span class="oneDayWeatherParaC oneMax">${(data.list[0].main.temp_max-273).toFixed(0)} &deg;C</span>
            <span class="oneDayWeatherParaC oneMin">${(data.list[0].main.temp_min-273).toFixed(0)} &deg;C</span>
                                      
                                    `

                                    oneDayWeather.classList.add('opacityAddOneDay')
                
            
             //now im trying use Switch/Case to chnage BG:
             switch(data.list[0].weather[0].main){
                case "Clear": 
                clearFullHD.classList.add('opacity1')
                break;
                case "Rain": 
                rainFullHD.classList.add('opacity1')
                break;
                case "Clouds": 
                cloudsFullHD.classList.add('opacity1')
                break;
                case "Snow": 
                snowFullHD.classList.add('opacity1')
                break;
                case "Thunder": 
                clearFullHD.classList.add('opacity1')
                break;
                default: 
                BGLakeFullHD.classList.add('opacity1')
               }
           
            //for Loop:
            for(let i = 0; i<data.list.length; i = i+8){
                console.log(data.list[i])

                window.onload = function(){
                    data.list[0].style.color = "blue";
                }

                let time = new Date(data.list[i].dt*1000)
                let day = time.toDateString().split(" ")[0]
               
                

            //************1 day weather:
        
            
            //*************5 days weather:
            let _5Daysdiv = document.createElement("span")
                _5Daysdiv.innerHTML = `
                        <p class="weekDayPara">${day}</p>
                        <img class="svgStyleClass" src="./weatherSvg/${data.list[i].weather[0].main.toLowerCase()}.svg">
                        <p class="tempPara fiveMax"> ${(data.list[i].main.temp_max-273).toFixed(0)}&deg;C</p>
                        <p class="tempPara fiveMin"> ${(data.list[i].main.temp_min-273).toFixed(0)}&deg;C</p>
                        <p class="descriptionPara">${data.list[i].weather[0].description}</p>         
                `
                fiveDaysWeather.appendChild(_5Daysdiv)
                _5Daysdiv.classList.add("floatSpan2")

                _5Daysdiv.classList.add("floatSpanTransition")
               
            }
            
         })


    
}

 //changing video bg in one-day weather div
                //change background-img according to weather[0].main :
/*
                function changeBgVideos(){
                let cityName = document.getElementById("inputPlace").value
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIkey}`
    )
    .then(response=>{
        console.log(response)
        return response.json()
    })
    .then(data=>{
        console.log(data)
       
            
   
    } )
            
}

*/


