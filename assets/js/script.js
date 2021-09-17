
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

var favoriteArr = [];

var getGamesList = function() {
    // var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    var gamesListApi = `https://www.freetogame.com/api/games`;

    console.log(gamesListApi);

    // fetch("https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc", {
    fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
	
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
                // console.log(data[0]);   

                for(i=0; i<7; i++)
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

                }
                // // Card 1
                // var card1TitleEl = document.querySelector('#card1-title');
                // card1TitleEl.textContent = data[0].title;
                // // console.log("card1TitleEl.textContent: " + card1TitleEl.textContent); 

                // var card1ShortDescriptionEl = document.querySelector('#card1-short-description');
                // card1ShortDescriptionEl.textContent = data[0].short_description;
                // // console.log("card1-short-description: " + card1ShortDescriptionEl.textContent); 

                // var card1ImageEl = document.querySelector('#card1-img');
                // card1ImageEl.src = data[0].thumbnail;
                // // console.log(card1ImageEl.src); 

                // // Card 2
                // var card2TitleEl = document.querySelector('#card2-title');
                // card2TitleEl.textContent = data[1].title;
                // // console.log("card2TitleEl.textContent: " + card2TitleEl.textContent); 

                // var card2ShortDescriptionEl = document.querySelector('#card2-short-description');
                // card2ShortDescriptionEl.textContent = data[1].short_description;
                // // console.log("card2-short-description: " + card2ShortDescriptionEl.textContent); 

                // var card2ImageEl = document.querySelector('#card2-img');
                // card2ImageEl.src = data[1].thumbnail;
                // // console.log(card2ImageEl.src); 

                // // Card 3
                // var card3TitleEl = document.querySelector('#card3-title');
                // card3TitleEl.textContent = data[2].title;
                // // console.log("card3TitleEl.textContent: " + card3TitleEl.textContent); 

                // var card3ShortDescriptionEl = document.querySelector('#card3-short-description');
                // card3ShortDescriptionEl.textContent = data[2].short_description;
                // // console.log("card3-short-description: " + card3ShortDescriptionEl.textContent); 

                // var card3ImageEl = document.querySelector('#card3-img');
                // card3ImageEl.src = data[2].thumbnail;
                // // console.log(card3ImageEl.src); 

                // // Card 4
                // var card4TitleEl = document.querySelector('#card4-title');
                // card4TitleEl.textContent = data[3].title;
                // // console.log("card4TitleEl.textContent: " + card4TitleEl.textContent); 

                // var card4ShortDescriptionEl = document.querySelector('#card4-short-description');
                // card4ShortDescriptionEl.textContent = data[3].short_description;
                // // console.log("card4-short-description: " + card4ShortDescriptionEl.textContent); 

                // var card4ImageEl = document.querySelector('#card4-img');
                // card4ImageEl.src = data[3].thumbnail;
                // // console.log(card4ImageEl.src); 

                // // Card 5
                // var card5TitleEl = document.querySelector('#card5-title');
                // card5TitleEl.textContent = data[4].title;
                // // console.log("card5TitleEl.textContent: " + card5TitleEl.textContent); 

                // var card5ShortDescriptionEl = document.querySelector('#card5-short-description');
                // card5ShortDescriptionEl.textContent = data[4].short_description;
                // // console.log("card5-short-description: " + card5ShortDescriptionEl.textContent); 

                // var card5ImageEl = document.querySelector('#card5-img');
                // card5ImageEl.src = data[4].thumbnail;
                // // console.log(card5ImageEl.src); 

                // // Card 6
                // var card6TitleEl = document.querySelector('#card6-title');
                // card6TitleEl.textContent = data[5].title;
                // // console.log("card6TitleEl.textContent: " + card6TitleEl.textContent); 

                // var card6ShortDescriptionEl = document.querySelector('#card6-short-description');
                // card6ShortDescriptionEl.textContent = data[5].short_description;
                // // console.log("card6-short-description: " + card6ShortDescriptionEl.textContent); 

                // var card6ImageEl = document.querySelector('#card6-img');
                // card5ImageEl.src = data[5].thumbnail;
                // // console.log(card6ImageEl.src); 


                // // Card 7
                // var card7TitleEl = document.querySelector('#card7-title');
                // card7TitleEl.textContent = data[6].title;
                // // console.log("card7TitleEl.textContent: " + card7TitleEl.textContent); 

                // var card7ShortDescriptionEl = document.querySelector('#card7-short-description');
                // card7ShortDescriptionEl.textContent = data[6].short_description;
                // // console.log("card7-short-description: " + card7ShortDescriptionEl.textContent); 

                // var card7ImageEl = document.querySelector('#card7-img');
                // card7ImageEl.src = data[6].thumbnail;
                // // console.log(card7ImageEl.src); 




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

// save favorite into local storage
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

// save favorite into local storage
// var saveFavoriteCard2 = function() {
//     var c1 = document.querySelector('#card2-title');
//     var favorite = c1.textContent;
//     loadFavorites();
//     // prevent duplicate favorite from being saved and move it to end of array
//     for (var i = 0; i < favoriteArr.length; i++) {
//         if (favorite === favoriteArr[i]) {
//             favoriteArr.splice(i, 1);
//         }
//     }
//     favoriteArr.push(favorite);
//     localStorage.setItem('favorites', JSON.stringify(favoriteArr));
// }

// load favorites from local storage
var loadFavorites = function() {
    favoriteArr = JSON.parse(localStorage.getItem('myFavoriteGames'));

    console.log(favoriteArr);

    if (!favoriteArr) {
        favoriteArr = [];
        return false;
    } 
    // else if (favoriteArr.length > 5) {
    //     // save only the five most recent favorites
    //     favoriteArr.shift();
    // }
    
    for (var i = 0; i < favoriteArr.length; i++) {
        var g1 = document.querySelector(`#game${i+1}`);
        g1.textContent = favoriteArr[i]; 
        g1.href = "pokemon.html"; //TODO: add url of the game        
    }

      // set recent cities
    // var recentCities = document.querySelector('#fDiv');
    // var cityListUl = document.createElement('ul');
    // cityListUl.className = 'list-group list-group-flush city-list';
    // recentCities.appendChild(cityListUl);

    // for (var i = 0; i < favoriteArr.length; i++) {
    //     var cityListItem = document.createElement('button');
    //     cityListItem.setAttribute('type', 'button');
    //     cityListItem.className = 'list-group-item';
    //     cityListItem.setAttribute('value', favoriteArr[i]);
    //     cityListItem.textContent = favoriteArr[i];
    //     cityListUl.prepend(cityListItem);
    // }

    // var cityList = document.querySelector('.city-list');
    // cityList.addEventListener('click', selectRecent)


    // https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
    // var myFavorites = document.querySelector('#favoriteList');
    // // var a = document.querySelector('#game1');
    // var a = document.createElement('a'); 
    // a.className = "collection-item";
    // var link = document.createTextNode("This is link");
    // a.appendChild(link);
    // a.title = "This is link";
    // a.href = "https://www.geeksforgeeks.org";
    // myFavorites.appendChild(a);

    // var myFavorites = document.querySelector('#favoriteList');
    // var favoriteListA = document.createElement('a');
    // var link = document.createTextNode("This is link");
    // a.appendChild(link); 
    // a.title = "This is Link";
    // a.href = "https://www.geeksforgeeks.org"; 

    // // favoriteListA.className = 'collection-item';
    // // favoriteListA.setAttribute('value', "test");
    // myFavorites.appendChild(favoriteListA);

    // for (var i = 0; i < favoriteArr.length; i++) {
    //     var cityListItem = document.createElement('button');
    //     cityListItem.setAttribute('type', 'button');
    //     cityListItem.className = 'list-group-item';
    //     cityListItem.setAttribute('value', cityArr[i]);
    //     cityListItem.textContent = cityArr[i];
    //     cityListUl.prepend(cityListItem);
    // }

    // set recent cities
    // var recentCities = document.querySelector('#recent-cities');
    // var cityListUl = document.createElement('ul');
    // cityListUl.className = 'list-group list-group-flush city-list';
    // recentCities.appendChild(cityListUl);

    // for (var i = 0; i < cityArr.length; i++) {
    //     var cityListItem = document.createElement('button');
    //     cityListItem.setAttribute('type', 'button');
    //     cityListItem.className = 'list-group-item';
    //     cityListItem.setAttribute('value', cityArr[i]);
    //     cityListItem.textContent = cityArr[i];
    //     cityListUl.prepend(cityListItem);
    // }

    // var cityList = document.querySelector('.city-list');
    // cityList.addEventListener('click', selectRecent)
}


getGamesList();


// btnGetGamesList.addEventListener('click', getGamesList);

btnGetGamesFilter.addEventListener('click', getGamesFilter);

// initialize modal - https://materializecss.com/modals.html
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // M.AutoInit();
  });


  

// card1-add.addEventListener('click', saveFavorite);
//   document.addEventListener('onclick', function() {
    // var elem = document.querySelectorAll('.fixed-action-btn');    
    // var instances = M.FloatingActionButton.init(elems, options);    
//   });

// function test(data){
//     console.log(data);
// }

//   var card1Btn = document.querySelector('#card1-add');
//   card1Btn.addEventListener('click', () => {
//       saveFavoriteCard()
    
//     });



//   var card2Btn = document.querySelector('#card2-add');
//   card2Btn.addEventListener('click', saveFavoriteCard2);

//   var card3Btn = document.querySelector('#card3-add');
//   card3Btn.addEventListener('click', saveFavoriteCard3);

//   var card4Btn = document.querySelector('#card4-add');
//   card4Btn.addEventListener('click', saveFavoriteCard4);

//   var card5Btn = document.querySelector('#card5-add');
//   card5Btn.addEventListener('click', saveFavoriteCard5);

//   var card6Btn = document.querySelector('#card6-add');
//   card6Btn.addEventListener('click', saveFavoriteCard6);

//   var card7Btn = document.querySelector('#card7-add');
//   card7Btn.addEventListener('click', saveFavoriteCard7);


//   https://materializecss.com/floating-action-button.html
//   document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.fixed-action-btn');
//     var instances = M.FloatingActionButton.init(elems, options);
//   });

//   var instance = M.FloatingActionButton.getInstance(elem);
//   instance.open();

//   instance.close();
//   instance.destroy();
