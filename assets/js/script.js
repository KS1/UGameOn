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

// $(".add").each(function () {
//   $(this).click(function () {
//     console.log($(this).css("background-color"));
//     if ($(this).css("background-color") === "rgb(119, 176, 250)") {
//       console.log("if");
//     //   red
//       $(this).css("background-color", "rgb(255, 72, 0)");   
//       // } else if ($(this).css("background-color", "rgb(255, 72, 0)")) {
//     } else {
//       console.log("else");
//     //   blue
//       $(this).css("background-color", "rgb(119, 176, 250)");
//     }
//   });
// });

// current issue - on page refresh all favorite buttons are blue
// On page refresh, add button should show red for all locally stored favorites 
// heart button function - change color
$(".add").click(function (cardId) {
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

var favoriteArr = [];
var dataArr = [];

var getGamesList = function() {
    // var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    // var gamesListApi = `https://www.freetogame.com/api/games`;

    var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games`;

    console.log(gamesListApi);

    // fetch("https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc", {
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
                console.log(data);           

                favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));
                // console.log(favoriteArr);
                dataArr = data;

                for(i=0; i<9; i++)
                {
                    var cardTitleEl = document.querySelector(`#card${i+1}-title`);
                    cardTitleEl.textContent = data[i].title;
                    // console.log("cardTitleEl.textContent: " + cardTitleEl.textContent); 

                    var cardShortDescriptionEl = document.querySelector(`#card${i+1}-short-description`);
                    cardShortDescriptionEl.textContent = data[i].short_description;
                    // console.log("card1-short-description: " + cardShortDescriptionEl.textContent); 

                    var cardImageEl = document.querySelector(`#card${i+1}-img`);
                    cardImageEl.src = data[i].thumbnail;
                    // console.log(cardImageEl); 

                    var cardapEl = document.querySelector(`#ap11`);
                    cardapEl.href = data[i].game_url;
                    // console.log("data[i].game_url: " + data[i].game_url); 

                    // check if the game is favorite
                    // console.log("Calling isMyFavorite function...");
                    // console.log(data[i].title);
                    var myFav = isMyFavorite(data[i].title);
                    // console.log(myFav);
                    if (myFav === true)
                    {
                        var t1 = document.querySelector(`#card${i+1}`);
                        // console.log(t1);
                        t1.style.backgroundColor = "rgb(255, 72, 0)";                         
                    }
                    
                }

                // for(i = 0; i < data.length; i++)
                // {
                //     console.log("Id: " + data[i].id);
                //     console.log("title: " + data[i].title);
                //     console.log("thumbnail: " + data[i].thumbnail);                   
                //     console.log("short_description: " + data[i].short_description);                    
                //     console.log("game_url: " + data[i].game_url);
                //     console.log("genre: " + data[i].genre);
                //     console.log("platform: " + data[i].platform);
                //     console.log("publisher: " + data[i].publisher);
                //     console.log("developer: " + data[i].developer);
                //     console.log("release_date: " + data[i].release_date);
                //     console.log("freetogame_profile_url: " + data[i].freetogame_profile_url);
                // }
            });
        } else {
            alert(`Error: ${response.statusText}`)
        }
        // console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
    
}

var getGamesFilter = function() {
 
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
    var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=mmorpg&sort-by=release-date`;

    // Filter Games by multiple tags for personalized results
    // Insert tag, eg: mmorpg, shooter, pvp, mmofps and more. 
    // Optionally you can also use the "platform" and "sort" parameters
    // works - returned 297 records
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?tag=3d.mmorpg.fantasy.pvp&platform=pc`;

    // Return details from a specific game: Insert game id
    // works - returns 1 record. [we need to change "games" to "game" in url]  
    // var gamesListApi = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=452`;

    console.log(gamesListApi);

    // works
    // fetch("https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc", {
    
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
                
                console.log("Response is OK");
                console.log(data);
                // console.log(typeof(data));

                // query returns 2 or more records  
                console.log(data.length);

                // Games by platform & category & sorted
                for(i = 0; i < data.length; i++)
                {
                    console.log("Id: " + data[i].id);
                    console.log("title: " + data[i].title);
                    console.log(data[i].thumbnail);                   
                    console.log(data[i].short_description);                    
                    console.log(data[i].game_url);
                    console.log(data[i].genre);
                    console.log(data[i].platform);
                    console.log(data[i].publisher);
                    console.log(data[i].developer);
                    console.log(data[i].release_date);
                    console.log(data[i].freetogame_profile_url);

                    // console.log(data[i].minimum_system_requirements);
                    // console.log(data[i].minimum_system_requirements.os);
                    // console.log(data[i].minimum_system_requirements.processor);
                    // console.log(data[i].minimum_system_requirements.memory);
                    // console.log(data[i].minimum_system_requirements.graphics);
                    // console.log(data[i].minimum_system_requirements.storage);

                    // console.log(data[i].screenshots);

                    // console.log(data[i].screenshots[0]);
                    // console.log(data[i].screenshots[0].id);
                    // console.log(data[i].screenshots[0].image);

                    // console.log(data[i].screenshots[1]);
                    // console.log(data[i].screenshots[1].id);
                    // console.log(data[i].screenshots[1].image);

                    // console.log(data[i].screenshots[2]);
                    // console.log(data[i].screenshots[2].id);
                    // console.log(data[i].screenshots[2].image);

                    // console.log(data[i].screenshots[3]);
                    // console.log(data[i].screenshots[3].id);
                    // console.log(data[i].screenshots[3].image);
                }

                // query returns 1 record 
                // console.log(data.id);
                // console.log(data.title);
                // console.log(data.thumbnail);
                // console.log(data.short_description);
                // console.log(data.description);
                // console.log(data.game_url);
                // console.log(data.genre);
                // console.log(data.platform);
                // console.log(data.publisher);
                // console.log(data.developer);
                // console.log(data.release_date);
                // console.log(data.freetogame_profile_url);

                // console.log(data.minimum_system_requirements);
                // console.log(data.minimum_system_requirements.os);
                // console.log(data.minimum_system_requirements.processor);
                // console.log(data.minimum_system_requirements.memory);
                // console.log(data.minimum_system_requirements.graphics);
                // console.log(data.minimum_system_requirements.storage);

                // console.log(data.screenshots);

                // console.log(data.screenshots[0]);
                // console.log(data.screenshots[0].id);
                // console.log(data.screenshots[0].image);

                // console.log(data.screenshots[1]);
                // console.log(data.screenshots[1].id);
                // console.log(data.screenshots[1].image);

                // console.log(data.screenshots[2]);
                // console.log(data.screenshots[2].id);
                // console.log(data.screenshots[2].image);

                // console.log(data.screenshots[3]);
                // console.log(data.screenshots[3].id);
                // console.log(data.screenshots[3].image);
               
            });
        } else {
            alert(`Error: ${response.statusText}`)
        }
        console.log(response);
        
    })
    .catch(err => {
        console.error(err);
    });
}

var getGamesByPlatform = function(platform) {
    // Games by platform: Insert platform, eg: pc, browser or all
    // works -- pc 297 records, browser 77 records, all 365 records
    // var gamesFilterApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=all`;

    // var gamesFilterApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc`;

    // var gamesFilterApi = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser`;

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
                    
                    console.log("Response is OK");
                    console.log(data);
                    // console.log(typeof(data));
    
                    // query returns 2 or more records  
                    console.log(data.length);
                    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));
                    // console.log(favoriteArr);
    
                    for(i=0; i<9; i++)
                    {
                        var cardTitleEl = document.querySelector(`#card${i+1}-title`);
                        cardTitleEl.textContent = data[i].title;
                        // console.log("cardTitleEl.textContent: " + cardTitleEl.textContent); 
    
                        var cardShortDescriptionEl = document.querySelector(`#card${i+1}-short-description`);
                        cardShortDescriptionEl.textContent = data[i].short_description;
                        // console.log("card1-short-description: " + cardShortDescriptionEl.textContent); 
    
                        var cardImageEl = document.querySelector(`#card${i+1}-img`);
                        cardImageEl.src = data[i].thumbnail;
                        // console.log(cardImageEl); 
    
                        var cardapEl = document.querySelector(`#ap11`);
                        cardapEl.href = data[i].game_url;
                        // console.log("data[i].game_url: " + data[i].game_url); 
    
                        // check if the game is favorite
                        // console.log("Calling isMyFavorite function...");
                        // console.log(data[i].title);
                        var myFav = isMyFavorite(data[i].title);
                        // console.log(myFav);

                        var myFav = isMyFavorite(data[i].title);
                        console.log(myFav);
                        var t1 = document.querySelector(`#card${i+1}`);
                        console.log(t1);
                        if (myFav === true) {                            
                            t1.style.backgroundColor = "rgb(255, 72, 0)";
                        } else {
                            t1.style.backgroundColor = "rgb(119, 176, 250)";
                        }

                        
        
                        
                    }

                    // Games by platform & category & sorted
                    // for(i = 0; i < data.length; i++)
                    // {
                        // console.log("Id: " + data[i].id);
                        // console.log("title: " + data[i].title);
                        // console.log(data[i].thumbnail);                   
                        // console.log(data[i].short_description);                    
                        // console.log(data[i].game_url);
                        // console.log(data[i].genre);
                        // console.log(data[i].platform);
                        // console.log(data[i].publisher);
                        // console.log(data[i].developer);
                        // console.log(data[i].release_date);
                        // console.log(data[i].freetogame_profile_url);
    
                        // console.log(data[i].minimum_system_requirements);
                        // console.log(data[i].minimum_system_requirements.os);
                        // console.log(data[i].minimum_system_requirements.processor);
                        // console.log(data[i].minimum_system_requirements.memory);
                        // console.log(data[i].minimum_system_requirements.graphics);
                        // console.log(data[i].minimum_system_requirements.storage);
    
                        // console.log(data[i].screenshots);
    
                        // console.log(data[i].screenshots[0]);
                        // console.log(data[i].screenshots[0].id);
                        // console.log(data[i].screenshots[0].image);
    
                        // console.log(data[i].screenshots[1]);
                        // console.log(data[i].screenshots[1].id);
                        // console.log(data[i].screenshots[1].image);
    
                        // console.log(data[i].screenshots[2]);
                        // console.log(data[i].screenshots[2].id);
                        // console.log(data[i].screenshots[2].image);
    
                        // console.log(data[i].screenshots[3]);
                        // console.log(data[i].screenshots[3].id);
                        // console.log(data[i].screenshots[3].image);
                    // }
    
                    // query returns 1 record 
                    // console.log(data.id);
                    // console.log(data.title);
                    // console.log(data.thumbnail);
                    // console.log(data.short_description);
                    // console.log(data.description);
                    // console.log(data.game_url);
                    // console.log(data.genre);
                    // console.log(data.platform);
                    // console.log(data.publisher);
                    // console.log(data.developer);
                    // console.log(data.release_date);
                    // console.log(data.freetogame_profile_url);
    
                    // console.log(data.minimum_system_requirements);
                    // console.log(data.minimum_system_requirements.os);
                    // console.log(data.minimum_system_requirements.processor);
                    // console.log(data.minimum_system_requirements.memory);
                    // console.log(data.minimum_system_requirements.graphics);
                    // console.log(data.minimum_system_requirements.storage);
    
                    // console.log(data.screenshots);
    
                    // console.log(data.screenshots[0]);
                    // console.log(data.screenshots[0].id);
                    // console.log(data.screenshots[0].image);
    
                    // console.log(data.screenshots[1]);
                    // console.log(data.screenshots[1].id);
                    // console.log(data.screenshots[1].image);
    
                    // console.log(data.screenshots[2]);
                    // console.log(data.screenshots[2].id);
                    // console.log(data.screenshots[2].image);
    
                    // console.log(data.screenshots[3]);
                    // console.log(data.screenshots[3].id);
                    // console.log(data.screenshots[3].image);
                   
                });
            } else {
                alert(`Error: ${response.statusText}`)
            }
            console.log(response);
            
        })
        .catch(err => {
            console.error(err);
        });


}

// save favorite game into local storage
var saveFavoriteCard = function(cardId) {
    var c1 = document.querySelector(`#${cardId}-title`);
    var favorite = c1.textContent;
    
    loadFavorites();
    // prevent duplicate favorite from being saved and move it to end of array
    for (var i = 0; i < favoriteArr.length; i++) {
        if (favorite === favoriteArr[i]) {
            favoriteArr.splice(i, 1);
        }
    }
    favoriteArr.push(favorite);
    localStorage.setItem('myFavoriteGames', JSON.stringify(favoriteArr));
}

// remove favorite game from local storage
var removeFavoriteCard = function(cardId) {
    var c1 = document.querySelector(`#${cardId}-title`);
    var favorite = c1.textContent;   
    // remove item from array
    for (var i = 0; i < favoriteArr.length; i++) {
        if (favorite === favoriteArr[i]) {
            favoriteArr.splice(i, 1);
        }
    }
    localStorage.setItem('myFavoriteGames', JSON.stringify(favoriteArr));
}

// load favorites from local storage
var loadFavorites = function() {

    console.log("Inside loadFavorites function...");
    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));

    console.log(favoriteArr);

    if (!favoriteArr) {
        favoriteArr = [];
        return false;
    } 
    else if (favoriteArr.length > 10) {
        // save only the ten most recent favorites
        favoriteArr.shift();
    }
    
    for (var i = 0; i < favoriteArr.length; i++) {
        var g1 = document.querySelector(`#game${i+1}`);
        g1.textContent = favoriteArr[i];         
        var favurl = getFavUrl(favoriteArr[i]);
        g1.href = favurl;
    }
}

function getFavUrl(favTitle){ 
    var fUrl = "";
    if (!dataArr) { return; }
    for (var i = 0; i < 9; i++) {
        // console.log(dataArr[i].game_url);
        if(favTitle === dataArr[i].title) {
            // console.log("Inside if: " + favTitle + "  " + dataArr[i].game_url);
            fUrl = dataArr[i].game_url;
        }
        else{
            // console.log("Inside else");
        }
    }
    return fUrl;
}

function isMyFavorite(gameTitle) {
   
    var isFav = false;
    // favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));

    // console.log(favoriteArr);
    // console.log(gameTitle);
    
    if(!favoriteArr) {return isFav; }
    for (var i = 0; i < favoriteArr.length; i++) {
        // console.log(favoriteArr[i]);
        if(gameTitle !== favoriteArr[i])
        { // Do nothing 
        } else { 
            isFav = true;
            // console.log(isFav);
        }

        // g1.href = "pokemon.html"; //TODO: add url of the game          
        // var f1 = document.querySelector(`#card${i+1}`);
        // console.log(g1);
        // console.log(f1);
        // console.log(f1.parentElement);
        // console.log(f1.style.backgroundColor);
    }

    return isFav;
}

// fuction for filtering
function checkPlatform (checkobject) {
    console.log(checkobject);
    checkId = checkobject.id;
    console.log(checkobject.checked);
    console.log("Inside checkPlatform function: " + checkId);  
    
    if(checkId === 'pc' || checkId === 'browser' ) {
        var allcheck = document.querySelector(`#all`);
        allcheck.checked = false;
    }
    else if(checkId === 'all') {
        var pccheck = document.querySelector(`#pc`);
        pccheck.checked = true;
        var brcheck = document.querySelector(`#browser`);
        brcheck.checked = true;
    }

    if(checkobject.checked === true){
        getGamesByPlatform(checkId);
    }
    
}

function populatePageData(pnum){
    console.log('Inside populatePageData function');

    switch (pnum) {
    case '1':
        console.log('Case 1');
        pageGetData(0);
        break;
    case '2':
        console.log('Case 2');
        pageGetData(9);
        break;    
    case '3':
        console.log('Case 3');
        pageGetData(18);
        break;
    case '4':
        console.log('Case 4');
        pageGetData(27);
        break;
    case '5':
        console.log('Case 5');
        pageGetData(36);
        break;                    
    default:
        console.log(`default`);
    }

}

function pageGetData(pnum){

    console.log("Inside pageGetData function")
    console.log(dataArr);
    
    // var cardTitleEl = document.querySelector(`#card${1}-title`);
    // console.log(cardTitleEl);
    // console.log(cardTitleEl.textContent);

    var j=0;
    for(i=pnum; i<pnum+9; i++)
    {
        var cardTitleEl = document.querySelector(`#card${j+1}-title`);
        console.log("dataArr[i].title: " + dataArr[i].title);
        // console.log(cardTitleEl);
        // console.log(cardTitleEl.textContent);
    
        cardTitleEl.textContent = dataArr[i].title;
        console.log("cardTitleEl.textContent: " + cardTitleEl.textContent); 
        
        var cardShortDescriptionEl = document.querySelector(`#card${j+1}-short-description`);
        cardShortDescriptionEl.textContent = dataArr[i].short_description;
        // console.log("card1-short-description: " + cardShortDescriptionEl.textContent); 

        var cardImageEl = document.querySelector(`#card${j+1}-img`);
        cardImageEl.src = dataArr[i].thumbnail;
        // console.log(cardImageEl); 

        j++;
        
    }
}

getGamesList();

btnGetGamesFilter.addEventListener('click', getGamesFilter);

// initialize modal - https://materializecss.com/modals.html
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);   
  });

  