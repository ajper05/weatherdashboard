let cities =[]
//openweather api key fb96e9e4a08a704e7e522a72ff158382

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

  });

  //TODO: openweather API call, constructing the call URL 