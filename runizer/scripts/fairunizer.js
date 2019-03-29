"use strict"

//Selection of the text
let inputText = document.getElementById("inputText");

inputText.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let toConvert = document.getElementById("toConvert").value;
    //creation of the container div
    let convertedLetters = document.createElement('div');
    convertedLetters.className = "convertedLetters";
    // each letter is added in a new div
    for (let letter of toConvert) {
        let divConvertedLetters = document.createElement('div');
        divConvertedLetters.className = "fLetter";
        divConvertedLetters.textContent = letter;
        convertedLetters.appendChild(divConvertedLetters);
    };
    // container div added to the dom
    convertedText.appendChild(convertedLetters);
});

//clear the conversion zone
toConvert.addEventListener('focus', function (evt) {
    evt.preventDefault();
    let convertedLetters = document.querySelector('.convertedLetters');
    if (convertedLetters){
    convertedText.removeChild(convertedLetters);
    }
});


// size of the converted text zone
let convertSize = document.getElementById("convertSize");

convertSize.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let convertedLetters = document.getElementsByClassName("convertedLetters")[0];
    let fWidth = document.getElementById("widthConversion").value;
    let fHeight = document.getElementById("heightConversion").value;
    if (convertedLetters) {
        convertedLetters.style.width = fWidth + "px";
        convertedLetters.style.height = fHeight + "px";
    }

    convertedText.style.width = parseInt(fWidth, 10) + 5 + "px";
    convertedText.style.height = parseInt(fHeight, 10) + 5 + "px";
});


//validate the conversion to create image
let genPng = document.getElementById("genPng");

genPng.addEventListener('submit', function (evt) {
    evt.preventDefault();
    document.querySelector('input').value = "";

    //canvas creation
    html2canvas(document.getElementById('convertedText')).then(canvas => {
        imageZone.appendChild(canvas)
    });
});

//deleting of the images
let deletePng = document.getElementById("deletePng");
deletePng.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let toDeleteImgs = document.querySelectorAll('canvas');
    if (toDeleteImgs) {
        toDeleteImgs.forEach(function (toDeleteImg) {
            imageZone.removeChild(toDeleteImg);
        });
    }
});