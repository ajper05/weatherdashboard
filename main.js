let cities =[]
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "&appid=fb96e9e4a08a704e7e522a72ff158382&units=imperial" // also adding on the parameter to call for imperial unit measurements to get back farenheit temps

//Takes cities added to the empty cities array and creates buttons for them in the weather search history
function createButtons(){
    for (i = 0; i < cities.length;i++){
        let a = $("<button>");
            a.addClass("cityBtn")
            a.attr("city-data", cities[i]);
            a.text(cities[i]);
            $(".citysearchBtns").append(a);
    }
}

$("#weatherSearch").on("click", function(event) {
    event.preventDefault();

    let city = $("#userCity").val().trim();
    if (cities.includes(city)){
        //do nothing to prevent repeat additions to the array
    }
    else{ 
    $(".citysearchBtns").empty();    
    cities.push(city);
    createButtons();
    getCurrentWeather()
    }
})
function getCurrentWeather(){
    let city = $("#userCity").val().trim();
    $(".currentCity").empty();
    $(".uvIndex").empty();
    $(".temperature").empty();
    $(".humidity").empty();
    $(".windSpeed").empty();

    
    let cityWeather = queryURL + city + apiKey

    $.ajax({
		url: cityWeather,
        method: "GET"
    }).then(function(response) {
        let temp = response.main.temp;
        let humid = response.main.humidity;
        let wind = response.wind.speed
        let weatherName = response.name;
        //need to add latitutde and longitude to feed into a seperate UV index function that does a different api call to get the uv index
        let lat = response.coord.lat
        let long = response.coord.lon

        console.log(response,temp,humid,wind,weatherName);

        $(".currentCity").text(weatherName +" " + "("+moment().format("MMM Do YYYY")+")");
        $(".temperature").text("Temperature: "+ temp + "°F");
        $(".humidity").text("Humidity: "+humid+("%"))
        $(".windSpeed").text("Wind Speed: "+wind+(" MPH"))
        getUVindex(lat,long);
        fiveDay(city);
        $("#userCity").val("")


  });

}

  
  function getUVindex(lat, long) {
	 let uvSearch = "https://api.openweathermap.org/data/2.5/uvi?&appid=fb96e9e4a08a704e7e522a72ff158382&lat=" + lat + "&lon=" + long; 
	
	console.log(uvSearch);

	$.ajax({
		url: uvSearch,
		method: "GET"
	}).then(function(response) {
        let uvIndex = parseInt(response.value);
        //Create a button because I can't get it to style just around the text it just highlights the entire line in a color if I just append the class to the uv index p tag
        let resultButton = $("<button>").text("UV Index: "+ uvIndex)
        $(".uvIndex").append(resultButton)

        if (uvIndex <= 3) {
            resultButton.addClass("uvLow");
        }
        else if (uvIndex <= 8) {
            resultButton.addClass("uvModerate");
        }
        else if (uvIndex <= 11){
            resultButton.addClass("uvHigh");
        }
        else {
            resultButton.addClass("uvExtreme");
        }


    });
  }

function buttonWeather(){
    let city = $(this).attr("city-data");
    $("#userCity").val(city)
    getCurrentWeather()
}
    
function fiveDay(city){
    fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q="+city+apiKey+"&cnt=5";

    $.ajax({
        url: fiveDayQuery,
        method: "GET"
    }).then(function(response){
        console.log(response)
        let fiveDaybar = $("#5dayForecast");
        let createCards = $("<div class='card-deck'>");
        fiveDaybar.append(createCards)
        
    })
}

$(document).on("click", ".cityBtn", buttonWeather);
