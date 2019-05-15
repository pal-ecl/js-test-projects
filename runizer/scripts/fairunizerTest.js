(function () {

    //------------model
    let model = (function () {

        // store png and id
        let images = [];

        let promise;

        let Png = function (id, img) {
            this.id = id;
            this.img = img;
        }

        return {
            addPng: function (toCanvas) {
                let pngToAdd;
                //canvas creation
                pngToAdd = html2canvas(toCanvas);
                return pngToAdd;
            },

            storePng: function (newPng){
                let newImage, Id;
                if (images.length > 0) {
                    Id = images[images.length - 1].id + 1;
                } else {
                    Id = 0;
                }
                newImage = new Png(Id, newPng);
                images.push(newImage);
                return Id;
            },

            deletePng: function (ID) {
                let index;

                index = images.reduce((imagesIndex, image, index) => (image.id == ID)
                ? index
                : imagesIndex, -1);

                if (index !== -1) {
                    images.splice(index, 1);
                }
            }
        }

    })();
    //------------/model
    //------------view

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
            idConvertSize: '#convertSize',
            idWidth: '#widthConversion',
            idHeight: '#heightConversion',
            idGenPng: '#genPng',
            classPngImage: '.pngImage',
            idImageZone: '#imageZone'
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
                document.querySelector(DOMstrings.idToConvert).value = "";
            },

            clearConvertedLetters: function () {
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

            getToCanvas: function () {
                return document.querySelector(DOMstrings.idConvertedText);
            },

            displayPng: function (pngToAdd, id) {
                document.querySelector(DOMstrings.IdInputText).value = "";
                let divPng = document.createElement('div');
                divPng.className = 'pngImage';
                divPng.id = id;
                divPng.appendChild(pngToAdd);
                imageZone.appendChild(divPng);               
            },

            deletePng: function () {
                let toDeleteImgs = document.querySelectorAll(DOMstrings.toDeleteImgs);
                if (toDeleteImgs) {
                    toDeleteImgs.forEach(function (toDeleteImg) {
                        imageZone.removeChild(toDeleteImg);
                    });
                }
            },

            deleteImage: function (id) {
                let toDeletePng = document.getElementById(id);
                if (toDeletePng) {
                    imageZone.removeChild(toDeletePng);
                }
            }



        }


    })();

    //----------/view

    //----------controller
    let controller = (function (model, view) {


        let setupEventListenners = function () {
            let DOM = view.getDOMstrings();

            document.querySelector(DOM.IdInputText).addEventListener('submit', ctrlConvertText);

            document.querySelector(DOM.idToConvert).addEventListener('focus', function (evt) {
                view.clearInput();
                view.clearConvertedLetters();

            });

            document.querySelector(DOM.idConvertSize).addEventListener('submit', function (evt) {
                evt.preventDefault();
                view.convertSize();
            });

            document.querySelector(DOM.idGenPng).addEventListener('submit', ctrlAddPng);

            document.querySelector(DOM.idImageZone).addEventListener('click', ctrlDeletePng);

            document.querySelector(DOM.idDeletePng).addEventListener('submit', function (evt) {
                evt.preventDefault();
                view.deletePng();
            });

        };

        //check if there is something to convert
        let ctrlConvertText = function (evt) {
            let DOM = view.getDOMstrings();
            evt.preventDefault();
            if (document.querySelector(DOM.idToConvert).value) {
                view.clearConvertedLetters();
                view.createConversionText();
            }
        };

        let ctrlAddPng = async function (evt) {
            evt.preventDefault();
            let toCanvas = view.getToCanvas();
            let pngToAdd = await model.addPng(toCanvas);
            let id = model.storePng(pngToAdd);
            view.displayPng(pngToAdd, id);
        };

        let ctrlDeletePng = function (event) {
            let imageId;
            imageId = event.target.closest('.pngImage').id;
            if (imageId) {
                model.deletePng(imageId);
                view.deleteImage(imageId);
            }
        }

        return {
            init: function () {
                setupEventListenners();
            }
        };


    })(model, view);
    controller.init();

})()