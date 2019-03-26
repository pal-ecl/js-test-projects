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


// size of the converted text zone
let convertSize = document.getElementById("convertSize");

convertSize.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let convertedLetters = document.getElementsByClassName("convertedLetters")[0];
    let fWidth = document.getElementById("widthConversion").value + "px";
    let fHeight = document.getElementById("heightConversion").value + "px";
    if (convertedLetters) {
        convertedLetters.style.width = fWidth;
        convertedLetters.style.height = fHeight;
    }

    convertedText.style.width = fWidth;
    convertedText.style.height = fHeight;
});


//validate the conversion to create image
let genPng = document.getElementById("genPng");

genPng.addEventListener('submit', function (evt) {
    evt.preventDefault();

    //canvas creation
    document.querySelector('input').value = "";
    html2canvas(document.getElementById('convertedText'), {
        onrendered: function (canvas) {
            let imgData = canvas.toDataURL("image/png");
            //image creation
            let fImage = document.createElement('img');
            fImage.src = imgData;
            imageZone.appendChild(fImage);
        }
    });
    //once the image is created we delete the conversion
    let convertedLetters = document.querySelector('.convertedLetters');
    convertedText.removeChild(convertedLetters);
});

//deleting of the images
let deletePng = document.getElementById("deletePng");
deletePng.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let toDeleteImgs = document.querySelectorAll('img');
    if (toDeleteImgs) {
        toDeleteImgs.forEach(function (toDeleteImg) {
            imageZone.removeChild(toDeleteImg);
        });
    }
});