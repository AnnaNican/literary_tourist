// var CONFIG = require('../serverroverwrite.cfg');
// mapboxgl.accessToken = CONFIG.mapbox.ACCESS_TOKEN;

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYW5pIiwiYSI6ImNqYm5zbXhrbzU4bXgzM256MzQ5bjJ5YnkifQ.GICgZ4YgdjI5xeamsEd49w';





var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/light-v9',
    style: 'mapbox://styles/annani/cjn0ee24d85te2spgggk9e8o5',
    zoom: 13,
    pitch: 50,
    center: [-73.99, 40.73],
    light: {anchor: "viewport", 
            color: "white", intensity: 0.9 }
});



var url = '../data/bookstores.geojson';

map.on('load', function () {
    window.setInterval(function() {
        map.getSource('bookstores').setData(url);}, 1000);
    map.addSource('bookstores', { type: 'geojson', data: url });

    // Custom Markers Bookstores
    map.loadImage('../css/location-pink.png', function(error, image) {
        if (error) throw error;
        map.addImage('custom-icon-pink', image);


        map.addLayer({
            "id": "bookstores",
            "type": "symbol",
            "source": "bookstores",
            "filter": [ "==", "Type", "Bookstore"],
            "layout": {
                "icon-image": "custom-icon-pink",
                "icon-size": 0.1,
                "icon-allow-overlap": true
            }
        });
    });

    //Custom Markers Libraries
    map.loadImage('../css/location-purple.png', function(error, image) {
        if (error) throw error;
        map.addImage('custom-icon-purple', image);

        map.addLayer({
            "id": "library",
            "type": "symbol",
            "source": "bookstores",
            "filter": [ "==", "Type", "Library"],
            "layout": {
                "icon-image": "custom-icon-purple",
                "icon-size": 0.1,
                "icon-allow-overlap": true
            }
        });
    });

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

objects = ['bookstores', 'library']

for (i = 0; i < objects.length; i++) {
    console.log(objects[i])

    map.on('mouseenter', objects[i], function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.Description;
        var bookstore_name = e.features[0].properties.Location;
        // var bookstore_image = e.features[0].properties.Image;
        // console.log(e.features[0].properties.LocationURL);
        // console.log(e.features[0].properties.Location);
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup.setLngLat(coordinates)
            // .setHTML(description)
            .setHTML("<h4>" + bookstore_name + '</h4>' + '<p>Description:' + description + '</p>')
             // + '<img src="' + bookstore_image + '">')
             .addTo(map);
         });


    map.on('mouseleave', objects[i], function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('click', objects[i], function (e) {
        var bookstoreurl = e.features[0].properties.LocationURL;
        var win = window.open(bookstoreurl, '_blank');
        win.focus();
    });

};

});


// toggle between layers
var toggleableLayerIds = [ 'bookstores', 'library' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
};


// Fly dynamically over the cities
// Get data from cities.json and then load it as array
var citiesArray = [];
var requestURL = '../data/cities.json'
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

console.log(citiesArray);

request.onload = function() {
  citiesArray = request.response;
    };


document.getElementById('fly').addEventListener('click', function () {
    map.flyTo({
        center: citiesArray[Math.floor(Math.random() * citiesArray.length)]
    });
});


// Add search
/* given a query in the form "lng, lat" or "lat, lng" returns the matching
 * geographic coordinate(s) as search results in carmen geojson format,
 * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
 */
var coordinatesGeocoder = function (query) {
    // match anything which looks like a decimal degrees coordinate pair
    var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
    if (!matches) {
        return null;
    }

    function coordinateFeature(lng, lat) {
        return {
            center: [lng, lat],
            geometry: {
                type: "Point",
                coordinates: [lng, lat]
            },
            place_name: 'Lat: ' + lat + ', Lng: ' + lng, // eslint-disable-line camelcase
            place_type: ['coordinate'], // eslint-disable-line camelcase
            properties: {},
            type: 'Feature'
        };
    }

    var coord1 = Number(matches[1]);
    var coord2 = Number(matches[2]);
    var geocodes = [];

    if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
};

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder: coordinatesGeocoder,
    zoom: 4,
    placeholder: "Enter the city you are interested in visiting"
}));


// document.getElementById('control').appendChild(coordinatesGeocoder.onAdd(map));

console.log(coordinatesGeocoder);
console.log(document.getElementById('control'));


