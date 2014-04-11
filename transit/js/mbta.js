/* global constants */
NUM_RED_STNS = 22;
NUM_BLUE_STNS = 12;
NUM_ORANGE_STNS = 19;

/* objects to hold infor for all stations on each line */
redStns = new Object();
blueStns = new Object();
orangeStns = new Object();

/* Red line splits after JFK/UMass (redStns[12]) into two branches. In my
 * stations object, stations at index 13-17 are the Braintree branch and then
 * all stations after Braintree are the Ashmont branch, beginning with Saven
 * Hill
 */
redStns[0] = {"name":"Alewife","lat":"42.395428","lng":"-71.142483"};
redStns[11] = {"name":"Andrew","lat":"42.330154","lng":"-71.057655"};
redStns[21] = {"name":"Ashmont","lat":"42.284652","lng":"-71.064489"};
redStns[17] = {"name":"Braintree","lat":"42.2078543","lng":"-71.0011385"};
redStns[10] = {"name":"Broadway","lat":"42.342622","lng":"-71.056967"};
redStns[4] = {"name":"Central Square","lat":"42.365486","lng":"-71.103802"};
redStns[6] = {"name":"Charles/MGH","lat":"42.361166","lng":"-71.070628"};
redStns[1] = {"name":"Davis","lat":"42.39674","lng":"-71.121815"};
redStns[8] = {"name":"Downtown Crossing","lat":"42.355518","lng":"-71.060225"};
redStns[19] = {"name":"Fields Corner","lat":"42.300093","lng":"-71.061667"};
redStns[3] = {"name":"Harvard Square","lat":"42.373362","lng":"-71.118956"};
redStns[12] = {"name":"JFK/UMass","lat":"42.320685","lng":"-71.052391"};
redStns[5] = {"name":"Kendall/MIT","lat":"42.36249079","lng":"-71.08617653"};
redStns[13] = {"name":"North Quincy","lat":"42.275275","lng":"-71.029583"};
redStns[7] = {"name":"Park Street","lat":"42.35639457","lng":"-71.0624242"};
redStns[2] = {"name":"Porter Square","lat":"42.3884","lng":"-71.119149"};
redStns[16] = {"name":"Quincy Adams","lat":"42.233391","lng":"-71.007153"};
redStns[15] = {"name":"Quincy Center","lat":"42.251809","lng":"-71.005409"};
redStns[18] = {"name":"Savin Hill","lat":"42.31129","lng":"-71.053331"};
redStns[20] = {"name":"Shawmut","lat":"42.29312583","lng":"-71.06573796"};
redStns[9] = {"name":"South Station","lat":"42.352271","lng":"-71.055242"};
redStns[14] = {"name":"Wollaston","lat":"42.2665139","lng":"-71.0203369"};

/* Blue line starts at Wonderland and ends at Bowdoin*/
blueStns[6] = {"name":"Airport","lat":"42.374262","lng":"-71.030395"};
blueStns[8] = {"name":"Aquarium","lat":"42.359784","lng":"-71.051652"};
blueStns[2] = {"name":"Beachmont","lat":"42.39754234","lng":"-70.99231944"};
blueStns[11] = {"name":"Bowdoin","lat":"42.361365","lng":"-71.062037"};
blueStns[10] = {"name":"Government Center","lat":"42.359705","lng":"-71.059215"};
blueStns[7] = {"name":"Maverick","lat":"42.36911856","lng":"-71.03952958"};
blueStns[4] = {"name":"Orient Heights","lat":"42.386867","lng":"-71.004736"};
blueStns[1] = {"name":"Revere Beach","lat":"42.40784254","lng":"-70.99253321"};
blueStns[9] = {"name":"State Street","lat":"42.358978","lng":"-71.057598"};
blueStns[3] = {"name":"Suffolk Downs","lat":"42.39050067","lng":"-70.99712259"};
blueStns[0] = {"name":"Wonderland","lat":"42.41342","lng":"-70.991648"};
blueStns[5] = {"name":"Wood Island","lat":"42.3796403","lng":"-71.02286539"};

/* Orange line starts at Oak Grove and ends at Forest Hills */
orangeStns[11] = {"name":"Back Bay","lat":"42.34735","lng":"-71.075727"};
orangeStns[9] = {"name":"Chinatown","lat":"42.352547","lng":"-71.062752"};
orangeStns[4] = {"name":"Community College","lat":"42.373622","lng":"-71.069533"};
orangeStns[8] = {"name":"Downtown Crossing","lat":"42.355518","lng":"-71.060225"};
orangeStns[18] = {"name":"Forest Hills","lat":"42.300523","lng":"-71.113686"};
orangeStns[17] = {"name":"Green Street","lat":"42.310525","lng":"-71.107414"};
orangeStns[6] = {"name":"Haymarket","lat":"42.363021","lng":"-71.05829"};
orangeStns[15] = {"name":"Jackson Square","lat":"42.323132","lng":"-71.099592"};
orangeStns[1] = {"name":"Malden Center","lat":"42.426632","lng":"-71.07411"};
orangeStns[12] = {"name":"Mass Ave","lat":"42.341512","lng":"-71.083423"};
orangeStns[5] = {"name":"North Station","lat":"42.365577","lng":"-71.06129"};
orangeStns[0] = {"name":"Oak Grove","lat":"42.43668","lng":"-71.071097"};
orangeStns[14] = {"name":"Roxbury Crossing","lat":"42.331397","lng":"-71.095451"};
orangeStns[13] = {"name":"Ruggles","lat":"42.336377","lng":"-71.088961"};
orangeStns[7] = {"name":"State Street","lat":"42.358978","lng":"-71.057598"};
orangeStns[16] = {"name":"Stony Brook","lat":"42.317062","lng":"-71.104248"};
orangeStns[3] = {"name":"Sullivan","lat":"42.383975","lng":"-71.076994"};
orangeStns[10] = {"name":"Tufts Medical","lat":"42.349662","lng":"-71.063917"};
orangeStns[2] = {"name":"Wellington","lat":"42.40237","lng":"-71.077082"};

function init() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
    request.send(null);
    request.onreadystatechange = callback;
}

/* Handle the request */
function callback() {
    if (request.readyState == 4 && request.status == 200) {
        var parsed = JSON.parse(request, responseText);
        if (parsed.line) {
            geoLocate();   
        }
    } else if (request.status == 500 && request.readyState == 4) {
        var errorElem = document.getElementById("mbtamap");
        errorElem.innerHTML = "<h1>Internal Server Error</h>";
        errorElem.innerHTML += "<p>Trying again...</p>";
        setTimeout(initialize, 300);
    }
}

function getCurrentLocation() {

    var lat = 0;
    var lng = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            renderMap(lat, lon);
        });
    }
    else {
        alert("Geolocation is not supported by your browser.");
    }
}

function renderMap(lat, lng) {
    var myPos = new google.maps.LatLng(lat, lng);
    var map = new google.maps.Map(document.getElementById("mbtamap"), mapOptions);
 
    renderStnPins();
    map.setPos(myPos);

    posMarker = new google.maps.Marker({
        position: myPos,
        title: "You are here",
        icon: "http://maps.google.com/mapfiles/kml/shapes/arrow.png"
    });
    posMarker.setMap(map);

    infowindow.setContent("You are here, which is " + (Math.round((0.621371 * closest.distance) * 100) / 100) + 
    " miles from the closest " + parsed.line + " line station, " + closest.name + ".");
    infowindow.open(map, posMarker);
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("You are here. You are " + (Math.round((0.621371 * closest.distance) * 100) / 100) + 
            " miles from the closest " + parsed.line + " line station, which is " + closest.name);
        infowindow.open(map, posMarker);
    });
}

function renderStnPins()
{
    var flightPlanCoord];

    if (parsed.line == "red") {
        var morePlanCoordinates = [];
        for (var i = 0; i < NUM_RED; i++) {
            createMarker(redStns[i]);
            if (i < 18) {
                flightPlanCoords[i] = 
                  new google.maps.LatLng(redStns[i].lat,redStns[i].longe);
            } else {
                morePlanCoordinates[i - 17] =
                  new google.maps.LatLng(redStns[i].lat,redStns[i].longe);
            }

            if (calcDist(redStns[i]) < closest.distance) {
                closest.distance = calcDist(redStns[i]);
                closest.name = redStns[i].name;
            }
        }
        //Savin Hill is at index 1, so add JFK to morePlanCoordinates at index 0
        morePlanCoordinates[0] = new google.maps.LatLng(redStns[12].lat,redStns[12].longe);
        drawLines(flightPlanCoords);
        drawLines(morePlanCoordinates);
    } else if (parsed.line == "blue") {
        for (var i = 0; i < NUM_BLUE; i++) {
            createMarker(blueStns[i]);
            flightPlanCoords[i] = new google.maps.LatLng(blueStns[i].lat,blueStns[i].longe);
            if (calcDist(blueStns[i]) < closest.distance) {
                closest.distance = calcDist(blueStns[i]);
                closest.name = blueStns[i].name;
            }
        }
        drawLines(flightPlanCoords);
    } else {
        for (var i = 0; i < NUM_ORANGE; i++) {
            createMarker(orangeStns[i]);
            flightPlanCoords[i] = 
                new google.maps.LatLng(orangeStns[i].lat,orangeStns[i].longe);
            if (calcDist(orangeStns[i]) < closest.distance) {
                closest.distance = calcDist(orangeStns[i]);
                closest.name = orangeStns[i].name;
            }
        }
        drawLines(flightPlanCoords);
    }
}