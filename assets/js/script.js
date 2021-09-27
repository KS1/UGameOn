
// initialize variables
var favoriteArr = [];
var dataArr = [];
var sortedArr = [];
var sortedRDateArr = [];

// function getGamesList is called on page load
var getGamesList = function() {  
    var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games`;   

    fetch(gamesListApi, {	
    "method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "0f14760277msh4633a73019285dap13a775jsnde37e09289b4"
	}
    })
    .then(response => {
        if (response.ok) {
            response.json().then(function(data) {    
             
                // get favorites from local storage
                favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));
                
                // get copies of array for sorting 
                dataArr = data;                
                sortedArr = dataArr.slice();
                sortedRDateArr = dataArr.slice();

                // sort arrays
                sortData();

                // fill up card data
                fillUpCardData(data);

                // load favorites in modal
                loadFavorites();
              
            });
        } else {
            alert(`Error: ${response.statusText}`)
        }        
    })
    .catch(err => {
        console.error(err);
    });
    
}

// call api to get filtered data by platform
var getGamesByPlatform = function(platform) {

    // Games by platform: Insert platform, eg: pc, browser or all 
    var gamesFilterApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`;

    fetch(gamesFilterApi, {	
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key": "0f14760277msh4633a73019285dap13a775jsnde37e09289b4"
        }
        })
        .then(response => {
            if (response.ok) {
                response.json().then(function(data) {                

                    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));
    
                     // fill up card data
                    fillUpCardData(data);
                   
                });
            } else {
                alert(`Error: ${response.statusText}`)
            }
            
        })
        .catch(err => {
            console.error(err);
        });

}

// heart button to change color and save in local storage
$(".add-icon").click(function (cardId) {    
    $(this).each(function (i) {   
      if (this.style.backgroundColor !== "rgb(255, 72, 0)") {          
        this.style.backgroundColor = "rgb(255, 72, 0)";       
       
        //add title to local storage       
        saveFavoriteCard(cardId.target.id);       
      } else {        
        this.style.backgroundColor = "rgb(119, 176, 250)";
        
        //remove title from local storage       
        removeFavoriteCard(cardId.target.id);        
      }
    });
  });

// save favorite game into local storage
var saveFavoriteCard = function(cardId) {
   
    var c1 = document.querySelector(`#${cardId}-title`);
    var favorite = c1.textContent;
    
    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));
    if(favoriteArr == null)
        favoriteArr = [];

    if (!favoriteArr){
        // prevent duplicate favorite from being saved and move it to end of array
        for (var i = 0; i < favoriteArr.length; i++) {
            if (favorite === favoriteArr[i]) {
                favoriteArr.splice(i, 1);
            }
        }
    }

    favoriteArr.push(favorite);
    localStorage.setItem('myFavoriteGames', JSON.stringify(favoriteArr));

    // load favorites in modal
    loadFavorites();

}

// remove favorite game from local storage
var removeFavoriteCard = function(cardId) {
 
    var c1 = document.querySelector(`#${cardId}-title`);
    var favorite = c1.textContent;   

    if (!favoriteArr) {
        favoriteArr = [];
        return false;
    }

    // remove item from array
    for (var i = 0; i < favoriteArr.length; i++) {
        if (favorite === favoriteArr[i]) {
            favoriteArr.splice(i, 1);
        }
    }

    // save favorite array in local storage
    localStorage.setItem('myFavoriteGames', JSON.stringify(favoriteArr));

    // load favorites in modal
    loadFavorites();
   
}

// load favorites in modal 
var loadFavorites = function() {

    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));

    if (!favoriteArr) {
        favoriteArr = [];
        return false;
    } 
    else if (favoriteArr.length > 10) {
        // save only the ten most recent favorites
        favoriteArr.shift();
    }

    // hide list items in modal initially
    if(favoriteArr.length<9){      
        for(j=1; j<=9; j++)
        {
            var g2 = document.querySelector(`#game${j}`);  
            g2.style.display = 'none';                     
        }
    }   
    
    // add favorite items in modal list
    for (var i = 0; i < favoriteArr.length; i++) {
        var g1 = document.querySelector(`#game${i+1}`);      
        g1.textContent = favoriteArr[i]; 
        g1.style.display = 'block';        
        var favurl = getFavUrl(favoriteArr[i]);
        g1.href = favurl;
    }
}

// get favorite card url from title
function getFavUrl(favTitle){ 
    var fUrl = "";
    if (!dataArr) { return; }
    for (var i = 0; i < 9; i++) {        
        if(favTitle === dataArr[i].title) {            
            fUrl = dataArr[i].game_url;
        }        
    }
    return fUrl;
}

// check if title is in local storage
function isMyFavorite(gameTitle) {   
    var isFav = false;
    
    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));

    if(!favoriteArr) {return isFav; }
    for (var i = 0; i < favoriteArr.length; i++) {        
        if(gameTitle !== favoriteArr[i])
        { // Do nothing 
        } else { 
            isFav = true;
        }
    }

    return isFav;
}

// fuction triggers when user clicks filtering option
function checkPlatform (checkobject) {

    var checkboxId = checkobject.id;
    var param = "all";
    
    if(checkboxId === "pc") {
        var brcheck = document.querySelector(`#browser`);
        if(checkobject.checked === true){            
            if(brcheck.checked === true){
                param = "all";
            }
            else {
                param = "pc";
            }
        } else {
            if(brcheck.checked === true){
                param = "browser";
            }
            else {
                param = "all";
            }
        }
    }
    else if (checkboxId === "browser") {
        var pccheck = document.querySelector(`#pc`);
        if(checkobject.checked === true){            
            if(pccheck.checked === true){
                param = "all";
            }
            else {
                param = "browser";
            }
        } else {
            if(pccheck.checked === true){
                param = "pc";
            }
            else {
                param = "all";
            }
        }

    }

    // call function to query api
    getGamesByPlatform(param);    
    
}

// pagination
function populatePageData(pnum){

    // set all page elements with no highlight
    for(i=1; i<=10; i++){
        var p = document.querySelector(`#li${i}`);
        p.className = "waves-effect";
    }

    // populate page data and highlight pagination button
    switch (pnum) {
        case '1':
            pageGetData(0);            
            var p = document.querySelector("#li1");            
            p.className = "active blue lighten-2";            
            break;
        case '2':
            pageGetData(9);
            var p = document.querySelector("#li2");            
            p.className = "active blue lighten-2";  
            break;    
        case '3':
            pageGetData(18);
            var p = document.querySelector("#li3");            
            p.className = "active blue lighten-2";  
            break;
        case '4':
            pageGetData(27);
            var p = document.querySelector("#li4");            
            p.className = "active blue lighten-2";  
            break;
        case '5':
            pageGetData(36);
            var p = document.querySelector("#li5");            
            p.className = "active blue lighten-2";  
            break;
        case '6':
            pageGetData(45);
            var p = document.querySelector("#li6");            
            p.className = "active blue lighten-2";  
            break;
        case '7':
            pageGetData(54);
            var p = document.querySelector("#li7");            
            p.className = "active blue lighten-2";  
            break;    
        case '8':
            pageGetData(63);
            var p = document.querySelector("#li8");            
            p.className = "active blue lighten-2";  
            break;
        case '9':            
            pageGetData(72);
            var p = document.querySelector("#li9");            
            p.className = "active blue lighten-2";  
            break;
        case '10':
            pageGetData(81);
            var p = document.querySelector("#li10");            
            p.className = "active blue lighten-2";  
            break;                    
        default:
            // console.log(`default`);
        }

}

function pageGetData(pnum){

    var j=0;
    for(i=pnum; i<pnum+9; i++)
    {
        var cardTitleEl = document.querySelector(`#card${j+1}-title`);
        cardTitleEl.textContent = dataArr[i].title;
        
        var cardShortDescriptionEl = document.querySelector(`#card${j+1}-short-description`);
        cardShortDescriptionEl.textContent = dataArr[i].short_description;
        
        var cardImageEl = document.querySelector(`#card${j+1}-img`);
        cardImageEl.src = dataArr[i].thumbnail;

        var gameLinkEl = document.querySelector(`#cgame${j+1}`);
        gameLinkEl.href = dataArr[i].game_url;

        // check if the game is favorite
        var myFav = isMyFavorite(dataArr[i].title);
        // change favorite button color
        var t1 = document.querySelector(`#card${j+1}`);   
        if (myFav === true) {                            
            t1.style.backgroundColor = "rgb(255, 72, 0)";
        } else {
            t1.style.backgroundColor = "rgb(119, 176, 250)";
        }

        j++;        
    }
    
}

// sort data
function sortData(){
    
    // get sorted array by title
    sortedArr.sort((a, b) => (a.title > b.title) ? 1 : -1);

    // get sorted array by release date in descending order
    sortedRDateArr.sort((a, b) => {
        let da = new Date(a.release_date),
            db = new Date(b.release_date);
        return db - da;
    });
    
    // fill up card data based on sorting option
    var x = document.getElementById("sortselect").value;  
    if(x === 'opt0'){
        fillUpCardData(dataArr);
    } else if(x === 'opt1'){
        fillUpCardData(sortedArr);
    }
    else if (x === 'opt2'){
        fillUpCardData(sortedRDateArr);
    }
    
}

// fill up card data based on sorting option
function fillUpCardData(cardDataArr) {

    for(i=0; i<9; i++)
        {
            var cardTitleEl = document.querySelector(`#card${i+1}-title`);
            cardTitleEl.textContent = cardDataArr[i].title;
            
            // var cardRDateEl = document.querySelector(`#card1-release-date`);
            // cardRDateEl.textContent = cardDataArr[i].release_date;

            var cardShortDescriptionEl = document.querySelector(`#card${i+1}-short-description`);
            cardShortDescriptionEl.textContent = cardDataArr[i].short_description; 

            var cardImageEl = document.querySelector(`#card${i+1}-img`);
            cardImageEl.src = cardDataArr[i].thumbnail;

            var gameLinkEl = document.querySelector(`#cgame${i + 1}`);
            gameLinkEl.href = cardDataArr[i].game_url;    

            // check if the game is favorite
            var myFav = isMyFavorite(cardDataArr[i].title);
            // change favorite button color
            var t1 = document.querySelector(`#card${i+1}`);   
            if (myFav === true) {                            
                t1.style.backgroundColor = "rgb(255, 72, 0)";
            } else {
                t1.style.backgroundColor = "rgb(119, 176, 250)";
            }
            
        }
}



// call getGamesList funtion on page load
getGamesList();

// initialize modal 
// https://materializecss.com/modals.html
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);   
  });

// initialize collapsible
document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems);
});


// ///////////////////////////////////////////////////
//  debugging section


// https://www.freetogame.com/api-doc
// https://rapidapi.com/digiwalls/api/free-to-play-games-database
// Rate Limits: Please avoid doing more than 4 requests per second.
// Responses
// 200: Success
// 404: Object not found: Game or endpoint not found
// 500: Something wrong on our end (unexpected server errors)

// Get games list - returns 365 records
// 365 items
//     [100 items
//         0:{11 items
//             "id":1
//             "title":"Dauntless"
//             "thumbnail":"https://www.freetogame.com/g/1/thumbnail.jpg"
//             "short_description":"A free-to-play, co-op action RPG with gameplay similar to Monster Hunter."
//             "game_url":"https://www.freetogame.com/open/dauntless"
//             "genre":"MMORPG"
//             "platform":"PC (Windows)"
//             "publisher":"Phoenix Labs"
//             "developer":"Phoenix Labs, Iron Galaxy"
//             "release_date":"2019-05-21"
//             "freetogame_profile_url":"https://www.freetogame.com/dauntless"
//             }

// Get details for a specific game - returns 1 record// 

// {15 items
//     "id":452
//     "title":"Call Of Duty: Warzone"
//     "thumbnail":"https://www.freetogame.com/g/452/thumbnail.jpg"
//     "status":"Live"
//     "short_description":"A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare."
//     "description":"Call of Duty: Warzone is both a standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare. Warzone features two modes — the general 150-player battle royle, and “Plunder”. The latter mode is described as a “race to deposit the most Cash”. In both modes players can both earn and loot cash to be used when purchasing in-match equipment, field upgrades, and more. Both cash and XP are earned in a variety of ways, including completing contracts. An interesting feature of the game is one that allows players who have been killed in a match to rejoin it by winning a 1v1 match against other felled players in the Gulag. Of course, being a battle royale, the game does offer a battle pass. The pass offers players new weapons, playable characters, Call of Duty points, blueprints, and more. Players can also earn plenty of new items by completing objectives offered with the pass."
//     "game_url":"https://www.freetogame.com/open/call-of-duty-warzone"
//     "genre":"Shooter"
//     "platform":"Windows"
//     "publisher":"Activision"
//     "developer":"Infinity Ward"
//     "release_date":"2020-03-10"
//     "freetogame_profile_url":"https://www.freetogame.com/call-of-duty-warzone"
//     "minimum_system_requirements":{5 items
//     "os":"Windows 7 64-Bit (SP1) or Windows 10 64-Bit"
//     "processor":"Intel Core i3-4340 or AMD FX-6300"
//     "memory":"8GB RAM"
//     "graphics":"NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950"
//     "storage":"175GB HD space"
//     }
//     "screenshots":[4 items
//     0:{...}2 items
//     1:{...}2 items
//     2:{...}2 items
//     3:{...}2 items
//     ]
//     }

// Games by platform & category & sorted
// [39 items
//     0:{11 items
//     "id":472
//     "title":"Jade Goddess"
//     "thumbnail":"https://www.freetogame.com/g/472/thumbnail.jpg"
//     "short_description":"Jade Goddess is a free-to-play, browser based MMO inspired by Eastern mythology."
//     "game_url":"https://www.freetogame.com/open/jade-goddess"
//     "genre":"MMORPG"
//     "platform":"Web Browser"
//     "publisher":"101XP"
//     "developer":"101XP"
//     "release_date":"2020-06-15"
//     "freetogame_profile_url":"https://www.freetogame.com/jade-goddess"
//     }

// var getGamesFilter = function() {
 
    // var gamesListApi = `https://www.freetogame.com/api/games`; //does not work

    // works - returns 365 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games`;

    // works
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc`;

    // Games by platform: Insert platform, eg: pc, browser or all
    // works -- pc 297 records, browser 77 records, all 365 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=all`;

    // Games by category or tag: Insert game category or tag, 
    // eg: mmorpg, shooter, pvp, mmofps and
    // mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, 
    // survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, 
    // top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, 
    // battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, 
    // action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, 
    // horror, mmorts

    // works - shooter 97 records with category. [tag does not work - returns 365 records]
    // mmorpg 164 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`;

    // Sort games by release date, alphabetical or relevance
    // Insert sort by, eg: release-date, popularity, alphabetical or relevance
    // works - alphabetical 365 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical`;

    // Games by platform & category & sorted   
    // works - returned 39 records 
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=mmorpg&sort-by=release-date`;

    // Filter Games by multiple tags for personalized results
    // Insert tag, eg: mmorpg, shooter, pvp, mmofps and more. 
    // Optionally you can also use the "platform" and "sort" parameters
    // works - returned 297 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?tag=3d.mmorpg.fantasy.pvp&platform=pc`;

    // Return details from a specific game: Insert game id
    // works - returns 1 record. [we need to change "games" to "game" in url]  
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=452`;

    // works
    // fetch("https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc", {
    
    // fetch(gamesListApi, {	
    // "method": "GET",
	// "headers": {
	// 	"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
	// 	"x-rapidapi-key": "0f14760277msh4633a73019285dap13a775jsnde37e09289b4"
	// }
    // })
    // .then(response => {
    //     if (response.ok) {
    //         response.json().then(function(data) {             

                // Games by platform & category & sorted
                // for(i = 0; i < data.length; i++)
                // {
                //     console.log("Id: " + data[i].id);
                //     console.log("title: " + data[i].title);
                //     console.log(data[i].thumbnail);                   
                //     console.log(data[i].short_description);                    
                //     console.log(data[i].game_url);
                //     console.log(data[i].genre);
                //     console.log(data[i].platform);
                //     console.log(data[i].publisher);
                //     console.log(data[i].developer);
                //     console.log(data[i].release_date);
                //     console.log(data[i].freetogame_profile_url);                   
                // }
//             });
//         } else {
//             alert(`Error: ${response.statusText}`)
//         }

//     })
//     .catch(err => {
//         console.error(err);
//     });
// }
// ///////////////////////////////////////////////////