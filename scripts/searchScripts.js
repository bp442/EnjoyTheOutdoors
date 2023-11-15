"use strict";

window.onload = init;

//global variable to store the current parks that are valid for the current selection to use in multiple functions
let currentParks = [];

function init() {
    const selectRadios = document.querySelectorAll('input[name="flexRadioDefault"]');
    selectRadios.forEach(radio => {
        radio.addEventListener('click', radioClick);
    });
    const parkSelectDropdown = document.getElementById("parkSelectDropdown");

    parkSelectDropdown.onchange = parkSelected;

}

function radioClick() {
    //Fill out the dropdown with the correct parks given the type
    //Only need one radio button because there are only two, only one can be checked.
    const locationRadio = document.getElementById("locationTypeRadio");
    let parkSelectDropdown = document.getElementById("parkSelectDropdown");

    if (locationRadio.checked) {
        resetList();

        locationsArray.forEach(location =>{
            let newOption = new Option(location);
            parkSelectDropdown.appendChild(newOption);

        })
    }
}
function parkSelected() {
    //Display selected park and its information
}

function resetList() {
    //reset the global variable so that it can be reused for the customer selection
    //also resets the dropdown to be refilled
    let selectList = document.getElementById("parkSelectDropdown");
   // selectList.options.length = 0;
    currentParks.length = 0;
}