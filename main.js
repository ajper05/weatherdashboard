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
            $("#searchBar").append(a);
    }
}

$("#weatherSearch").on("click", function(event) {
    event.preventDefault();

    let city = $("#userCity").val().trim();
    cities.push(city)
    createButtons();
    
    let cityWeather = queryURL + city + apiKey

    $.ajax({
		url: cityWeather,
        method: "GET"
    }).then(function(response) {
        let temp = response.main.temp;
        let humid = response.main.humidity;
        let wind = response.wind.speed
        let weatherName = response.name;

        console.log(response,temp,humid,wind,weatherName);

        $(".currentCity").text(weatherName);
        $(".temperature").text("Temperature: "+ temp + "°F");
        $(".humidity").text(humid+("%"))


  });

})
  //TODO: openweather API call, constructing the call URL 