"use strict";

window.onload = init;
//accordion global variable
const parksContainer = document.getElementById("parksContainer");
//array to hold the parks that are valid for the selected category
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
    const locationRadio = document.getElementById("locationTypeRadio");
    const typeRadio = document.getElementById("parkTypeRadio");
    let optionDropdown = document.getElementById("optionDropdown");
    let optionDiv = document.getElementById("optionDiv");
    let optionLabel = document.getElementById("optionLabel");

    //once a radio is checked, reset the list and make the dropdown visible
    if (locationRadio.checked) { //search by location
        resetList();
        optionDiv.style = "visibility: visible;";
        optionLabel.innerText = "Select Location :";

        locationsArray.forEach(location => {
            let newOption = new Option(location);
            optionDropdown.appendChild(newOption);
        })
    }
    else if (typeRadio.checked) { //search by park type
        resetList();
        optionDiv.style = "visibility: visible;";
        optionLabel.innerText = "Select Type :";

        parkTypesArray.forEach(type => {
            let newOption = new Option(type);
            optionDropdown.appendChild(newOption);
        })
    }
    else {//DISPLAY ALL, dropdown stays hidden
        resetList();
        allSelected();
    }
}

//determine whether or not the location and type radios are selected
//this will never be able to run if the user displays all because the dropdown is hidden
function parkSelected() {
    const locationRadio = document.getElementById("locationTypeRadio");
    const typeRadio = document.getElementById("parkTypeRadio");
    if (locationRadio.checked) {
        locationSelected();
    }
    else if (typeRadio.checked) {
        typeSelected();
    }
}

//Display selected parks and their information
function locationSelected() {
    //first, reset the accordion and currentParks
    let parkAccordion = document.getElementById("parksContainer");
    parkAccordion.innerHTML = "";
    currentParks.length = 0;

    //determine how many parks are valid for the selection
    const optionDropdown = document.getElementById("optionDropdown");
    const selectedState = optionDropdown.value;
    nationalParksArray.forEach(park => {
        //if the state of the park matches, add it to the valid parks array
        if (park.State == selectedState) {
            currentParks.push(park);
        }
    });

    //add all currentParks to the accordion in order
    for (let y = 0; y < currentParks.length; y++) {
        //pass the current park and the accordion number (nonzero numbers only)
        addParkToContainer(currentParks[y], (y + 1))
    }
}

function typeSelected() {
    //first, reset the accordion and currentParks to start fresh
    let parkAccordion = document.getElementById("parksContainer");
    parkAccordion.innerHTML = "";
    currentParks.length = 0;

    //determine how many parks are valid for the selection
    const optionDropdown = document.getElementById("optionDropdown");
    const selectedType = optionDropdown.value.toLowerCase();
    nationalParksArray.forEach(park => {
        //make sure casing is always consistent for the comparison
        let parkName = park.LocationName.toLowerCase();
        //if the type of the park matches, add it to the valid parks array
        if (parkName.includes(selectedType)) {
            currentParks.push(park);
        }
    });

    //add all currentParks to the accordion in order
    for (let y = 0; y < currentParks.length; y++) {
        //pass the current park and the accordion number (nonzero numbers only)
        addParkToContainer(currentParks[y], (y + 1))
    }
}

//case where the user wants to display all parks
function allSelected() {
    //first, reset the accordion and currentParks
    let parkAccordion = document.getElementById("parksContainer");
    parkAccordion.innerHTML = "";
    currentParks.length = 0;

    //iterate through every park
    for (let y = 0; y < nationalParksArray.length; y++) {
        //pass the park through to the function
        addParkToContainer(nationalParksArray[y], (y + 1));
    }
}

//function to set up each accordion listing
function addParkToContainer(park, number) {
    let accordionItemDiv = document.createElement("div");
    accordionItemDiv.className = "accordion-item";

    parksContainer.appendChild(accordionItemDiv);

    let accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";

    accordionItemDiv.appendChild(accordionHeader);

    let btn = document.createElement("button");
    btn.className = "accordion-button collapsed";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "collapse");

    //number has to start with one for the accordion
    let targetId = "flush-collapse-" + number;

    btn.setAttribute("data-bs-target", "#" + targetId);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", targetId);

    let btnTextNode = document.createTextNode(park.LocationName + " (" + park.LocationID.toUpperCase() + ")");
    btn.appendChild(btnTextNode);

    accordionHeader.appendChild(btn);

    let flushCollapseDiv = document.createElement("div");
    flushCollapseDiv.id = targetId;
    flushCollapseDiv.className = "accordion-collapse collapse"
    flushCollapseDiv.setAttribute("data-bs-parent", "#parksContainer");

    let accordionBody = document.createElement("div");
    accordionBody.className = "accordion-body";

    //ACCORDION BODY: PARK INFORMATION

    accordionBody.appendChild(parkInfoDiv(park));

    flushCollapseDiv.appendChild(accordionBody);

    accordionItemDiv.appendChild(flushCollapseDiv);


}

//set up the inside of each accordion body
function parkInfoDiv(park) {
    let bodyDiv = document.createElement("div");
    bodyDiv.className = "text-center";
    let locationDiv = document.createElement("div");
    locationDiv.className = "row justify-content-around";

    //add address row to the accordion 
    //CHECK IF ALCATRAZ
    if (park.Address != 0) {
        let address = park.Address + ", " + park.City + ", " + park.State + ", " + park.ZipCode;
        let addressNode = document.createTextNode(address);
        locationDiv.appendChild(addressNode);
    }
    else {
        let address = park.City + ", " + park.State;
        let addressNode = document.createTextNode(address);
        locationDiv.appendChild(addressNode);
    }
    bodyDiv.appendChild(locationDiv);


    //add Visit link if available
    if (park.hasOwnProperty('Visit')) {
        let visitURL = park.Visit;
        let visitHyperlink = document.createElement("a");
        let visitText = document.createTextNode("Visit Website");

        visitHyperlink.appendChild(visitText);
        visitHyperlink.title = "Visit Website";
        visitHyperlink.href = visitURL;
        visitHyperlink.target = "_blank";
        bodyDiv.appendChild(visitHyperlink);
    }
    else{
        let visitUnavailable = document.createElement('span');
        visitUnavailable.style = "font-weight: bold";
        visitUnavailable.appendChild(document.createTextNode("Website Unavailable"));
        
        bodyDiv.appendChild(visitUnavailable);
    }

    //check if phone number / fax exists and add them
    let numbersRowDiv = document.createElement("div");
    numbersRowDiv.className = "row text-center";

    let phoneDiv = document.createElement("div");
    phoneDiv.className = "col";

    let faxDiv = document.createElement("div");
    faxDiv.className = "col";

    let phoneNumber = park.Phone;
    let faxNumber = park.Fax;

    //The park has both a phone number AND fax number
    if (phoneNumber != 0 && faxNumber != 0) {
        let phoneNumNode = document.createTextNode("Phone Number: " + phoneNumber);
        let faxNumNode = document.createTextNode("Fax Number: " + faxNumber);

        phoneDiv.appendChild(phoneNumNode);
        faxDiv.appendChild(faxNumNode);

        numbersRowDiv.appendChild(phoneDiv);
        numbersRowDiv.appendChild(faxDiv);
        bodyDiv.appendChild(numbersRowDiv);
    }
    //the park only has a fax number
    else if (phoneNumber == 0 && faxNumber != 0) {
        let phoneNumNode = document.createTextNode("Phone Number: N/A");
        let faxNumNode = document.createTextNode("Fax Number: " + faxNumber);

        phoneDiv.appendChild(phoneNumNode);
        faxDiv.appendChild(faxNumNode);

        numbersRowDiv.appendChild(phoneDiv);
        numbersRowDiv.appendChild(faxDiv);
        bodyDiv.appendChild(numbersRowDiv);
    }
    //the park only has a phone number
    else if (faxNumber == 0 && phoneNumber != 0) {
        let phoneNumNode = document.createTextNode("Phone Number: " + phoneNumber);
        let faxNumNode = document.createTextNode("Fax Number: N/A");

        phoneDiv.appendChild(phoneNumNode);
        faxDiv.appendChild(faxNumNode);

        numbersRowDiv.appendChild(phoneDiv);
        numbersRowDiv.appendChild(faxDiv);
        bodyDiv.appendChild(numbersRowDiv);
    }
    else{
        let phoneNumNode = document.createTextNode("Phone Number: N/A");
        let faxNumNode = document.createTextNode("Fax Number: N/A");

        phoneDiv.appendChild(phoneNumNode);
        faxDiv.appendChild(faxNumNode);

        numbersRowDiv.appendChild(phoneDiv);
        numbersRowDiv.appendChild(faxDiv);
        bodyDiv.appendChild(numbersRowDiv);
    }


    return bodyDiv;
}


function resetList() {
    //reset the global variable so that it can be reused for the customer selection
    //also resets the dropdown to be refilled
    //also resets the park accordion
    let selectList = document.getElementById("optionDropdown");
    let parkAccordion = document.getElementById("parksContainer");
    let optionDiv = document.getElementById("optionDiv");
    optionDiv.style = "visibility: hidden;";
    // reset to blank
    currentParks.length = 0;
    selectList.options.length = 0;

    parkAccordion.innerHTML = "";

}