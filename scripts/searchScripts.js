"use strict";

window.onload = init;

//global variable to store the current parks that are valid for the current selection to use in multiple functions
let currentParks = [];

function init() {
    const selectRadios = document.querySelectorAll('input[name="flexRadioDefault"]');
    selectRadios.forEach(radio => {
        radio.addEventListener('click', radioClick);
    });
    const optionDropdown = document.getElementById("optionDropdown");

    optionDropdown.onchange = parkSelected;

}

function radioClick() {
    //Fill out the dropdown with the correct parks given the type
    //Only need one radio button because there are only two, only one can be checked.
    const locationRadio = document.getElementById("locationTypeRadio");
    let optionDropdown = document.getElementById("optionDropdown");
    let optionDiv = document.getElementById("optionDiv");
    let optionLabel = document.getElementById("optionLabel");

    //once a radio is checked, reset the list and make the dropdown visible
    if (locationRadio.checked) { //search by location
        resetList();
        optionDiv.style="visibility: visible;";
        optionLabel.innerText = "Select Location :";

        locationsArray.forEach(location =>{
            let newOption = new Option(location);
            optionDropdown.appendChild(newOption);
        })
    }
    else{ //search by park type
        resetList();
        optionDiv.style="visibility: visible;";
        optionLabel.innerText = "Select Type :";

        parkTypesArray.forEach(type =>{
            let newOption = new Option(type);
            optionDropdown.appendChild(newOption);
        })
    }
}
function parkSelected() {
    //Display selected park and its information
}

function resetList() {
    //reset the global variable so that it can be reused for the customer selection
    //also resets the dropdown to be refilled
    let selectList = document.getElementById("optionDropdown");
   // selectList.options.length = 0;
    currentParks.length = 0;
    selectList.options.length = 0;
    let selectDiv = document.getElementById("optionDiv");

    selectDiv.style="visibility: hidden;"
}