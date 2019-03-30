
(function () {

    //------------/view

    let view = (function () {

        let DOMstrings = {
            IdInputText: '#inputText',
            idToConvert: '#toConvert',
            classConvertedLetters: '.convertedLetters',
            ConvertedLetterClass: 'convertedLetters',
            classConvertedLetter: 'fLetter',
            idConvertedText: '#convertedText',
            idDeletePng: '#deletePng',
            toDeleteImgs: 'canvas',
            idConvertSize:'#convertSize',
            idWidth: '#widthConversion',
            idHeight: '#heightConversion',
            idGenPng: '#genPng'
        }

        return {

            getDOMstrings: function () {
                return DOMstrings;
            },

            createConversionText: function () {
                let toConvertLetters, convertedLetters;

                toConvertLetters = document.querySelector(DOMstrings.idToConvert).value;
                convertedLetters = document.createElement('div');
                convertedLetters.className = DOMstrings.ConvertedLetterClass;

                for (let letter of toConvertLetters) {
                    let divConvertedLetters = document.createElement('div');
                    divConvertedLetters.className = DOMstrings.classConvertedLetter;
                    divConvertedLetters.textContent = letter;
                    convertedLetters.appendChild(divConvertedLetters);
                }
                convertedText.appendChild(convertedLetters);
            },

            clearInput: function () {
                let convertedLetters = document.querySelector(DOMstrings.classConvertedLetters);
                if (convertedLetters) {
                    convertedText.removeChild(convertedLetters);
                }

            },

            convertSize: function () {
                let convertedLetters, toWidth, toHeight;
                
                convertedLetters = document.querySelector(DOMstrings.classConvertedLetters);
                toWidth = document.querySelector(DOMstrings.idWidth).value;
                toHeight = document.querySelector(DOMstrings.idHeight).value;
                if (convertedLetters) {
                    convertedLetters.style.width = toWidth + "px";
                    convertedLetters.style.height = toHeight + "px";
                }
            
                convertedText.style.width = parseInt(toWidth, 10) + 5 + "px";
                convertedText.style.height = parseInt(toHeight, 10) + 5 + "px";
            },

            genPng: function () {
                document.querySelector(DOMstrings.IdInputText).value = "";
            
                //canvas creation
                html2canvas(document.querySelector(DOMstrings.idConvertedText)).then(canvas => {
                    imageZone.appendChild(canvas)
                });
            },

            deletePng: function () {
                let toDeleteImgs = document.querySelectorAll(DOMstrings.toDeleteImgs);
                if (toDeleteImgs) {
                    toDeleteImgs.forEach(function (toDeleteImg) {
                        imageZone.removeChild(toDeleteImg);
                    });
                }
            }
            


        }


    })();

    //----------/view

    //----------controller
    let controller = (function (view) {
        

        let setupEventListenners = function () {
            let DOM = view.getDOMstrings();

            document.querySelector(DOM.IdInputText).addEventListener('submit', ctrlConvertText);

            document.querySelector(DOM.idToConvert).addEventListener('focus', function (evt){
                view.clearInput();
            });

            document.querySelector(DOM.idConvertSize).addEventListener('submit', function (evt){
                evt.preventDefault();
                view.convertSize();
            });

            document.querySelector(DOM.idGenPng).addEventListener('submit', function (evt){
                evt.preventDefault();
                view.genPng();
            });
            
            document.querySelector(DOM.idDeletePng).addEventListener('submit', function (evt){
                evt.preventDefault();
                view.deletePng();
            });

        };
        
        //check if there is something to convert
        let ctrlConvertText = function (evt) {
            let DOM = view.getDOMstrings();
            evt.preventDefault();
            if (document.querySelector(DOM.idToConvert).value){
                view.clearInput();
                view.createConversionText();                
            }
        };

        return {
            init: function () {
                setupEventListenners();
            }
        };


    })(view);
    controller.init();

})()