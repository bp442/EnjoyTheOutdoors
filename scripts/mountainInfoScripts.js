"use strict";

window.onload = init;

function init(){
fillDropdown();
changeMountain();
let dropdown = document.getElementById("mountainDropdown");

dropdown.onchange = changeMountain;
}

function fillDropdown(){
    let dropdown = document.getElementById("mountainDropdown");

    mountainsArray.forEach(mountain =>{
        let newOption = new Option(mountain.name);

        dropdown.appendChild(newOption);
    })
}

//runs upon changing an option in the dropdown menu
function changeMountain(){
    let selectedMountain = document.getElementById("mountainDropdown").value;

    for(let y=0; y < mountainsArray.length; y++){
        if(selectedMountain == mountainsArray[y].name){
            replaceData(mountainsArray[y]);
            break;
        }
    }
}

//replaces the data on the screen with the new mountain's data
function replaceData(mountain){
    let mountainImage = document.getElementById("mountainImage");
    let mountainInfo = document.getElementById("mountainInfo");
    let mountainName = document.getElementById("mountainName");
    let difficultyText = document.getElementById("difficultyText");
    let sunriseTimeText = document.getElementById("sunriseTime");
    let sunsetTimeText = document.getElementById("sunsetTime");
    let lat = mountain.coords.lat;
    let lng = mountain.coords.lng;
    let sunriseTime;
    let sunsetTime;
    getSunsetForMountain(lat,lng).then(data =>{
        sunriseTime = data.results.sunrise;
        sunsetTime = data.results.sunset;
        sunriseTimeText.innerText = sunriseTime + " UTC";
        sunsetTimeText.innerText = sunsetTime + " UTC";
    })

    mountainImage.src = "images/" + mountain.img;
    mountainImage.alt = mountain.desc;
    mountainInfo.innerText = mountain.desc;
    mountainName.innerText = mountain.name;
    difficultyText.innerText = "Difficulty: " + mountain.effort;
 
}
// function that can "fetch" the sunrise/sunset times
async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
   }
   
   