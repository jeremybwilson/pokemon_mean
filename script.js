// Practice Assignment: Pokedex
// Objectives:
// Familiarity with APIs, asynchronous code, and callbacks.
// Familiarity with DOM manipulation.

$(document).ready(function () {
    // set base URL for Pokemon API character info
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const offSet = 20
    const resultLimit = 20;

    // set root portion of media/img URL here
    const imgBaseUrl = 'https://pokeapi.co/media/sprites/pokemon/';
    // const imgBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    //  Pokeapi.co pagination broken currently so limit parameters are non-functional
    //  Hard coding resultLimit parameter into loops to limit results instead of response.results.length
    // build API Url to incorporate limit count
    // const apiUrlWithLimits = apiUrl + '?limit=' + resultLimit + '&offset=' + offSet;

    // define (array) of Pokemon IDs based on specified results limit
    const pokemonIds = buildPokemonIDsArray(resultLimit);
    // console.log('pokemonIDs array: ', pokemonIds);
    const imageSources = buildPokemonImageArray(resultLimit);

    // console.log(`resultLimit: ${resultLimit}`);
    console.log(`imageSources.length: ${imageSources.length}`);
    // console.log(`imageSources[0]: ${imageSources[0]}`);

    setImagesFunc();

    // function to build an array for Pokemon Image names
    function buildPokemonImageArray(value){
        let imageSources = []
        let imageFileExt = '.png';
        for(var i = 1; i <= resultLimit; i++){
            // resulting image path should be => index (i) + .png
            imageSources.push(imgBaseUrl + i + imageFileExt);
        }
        return imageSources;
    }

    // function to create set number of Pokemon ID
    function buildPokemonIDsArray(value){
        let pokemonIDsArray = [];
        for(var i = 1; i <= resultLimit; i++){
            pokemonIDsArray.push(i);
        }
        return pokemonIDsArray;
    }

    function setImagesFunc(){
        $('#display-pokemon-area .pokemon-img').each(function(){
            // console.log(`this represents: ${this}`);
            // console.log(`imagePath: ${imageSources[$(this).attr('imageId')]}`);
            $(this).attr('src', imageSources[$(this).attr('imageId')]);
        });
    }

    $('.scroll-button').click(function(){
        if($(this).attr('dir') == "0"){
            leftButtonElement();
        } else {
            rightButtonElement();
        }
    });

    function checkRange(temp){
        if(temp >= imageSources.length){
            temp = 0;
            console.log('value of temp:', temp);
        }
        else if(temp < 0){
            temp = imageSources.length - 1;
            console.log('value of temp:', temp);
        }
        return temp;
    }

    function leftButtonElement() {
        // loop through each image element in DOM
        $('#display-pokemon-area .pokemon-img').each( function(){
            let b = $(this).attr('imageId');// assign the value of this to var b
            b++  // now increment b var => b var here denotes banner
            $(this).attr('imageId', checkRange(b));
        });
        setImagesFunc();
    }
    
    function rightButtonElement() {
        // loop through each image element in DOM
        $('#display-pokemon-area .pokemon-img').each( function(){
            let b = $(this).attr('imageId');  // assign the value of this to var b 
            b++  // now increment b var => b var here denotes banner
            $(this).attr('imageId', checkRange(b));
        });
        setImagesFunc();
    }

    $.get(apiUrl, function(response) {
        for(let i = 0; i <= resultLimit; i++){
            // let results = response.results;
            // let imgAlt = response.results[i].name;
            // let pokemonCharName = response.results[i].name;
        //     // set variable to pull in specific Pokemon character ID (from URL) here,
        //     // get subtring value from the API endpoint for results.url
            // let url = response.results[i].url.split('/');
            // let pokemonCharID = response.results[i].url.split('/')[6];
        //     // create imagePath URL here
            // const pokemonCharFullPath = imgBaseUrl + pokemonCharID + '.png';
            // console.log('imageAlt: ' + imgAlt + ' | ' + 'pokemonCharName: ' + pokemonCharName + 'pokemonCharID: ' + pokemonCharID);
        }
    }, 'json');

    $('.pokemon-img').click(function(){
        const id = pokemonIds[$(this).attr('imageId')];
        const pokemonInfoUrl = apiUrl + id;
        $.get(pokemonInfoUrl, function(response){
            $('#info-name').text(`Name: ${response.name}`);
            $('#info-words').text(`Weight: ${response.weight}`);
            $('#info-titles').text(`Species: ${response.species.name}`);
        }, 'json');
    });
});