// var CONFIG = require('../serverroverwrite.cfg');
// mapboxgl.accessToken = CONFIG.mapbox.ACCESS_TOKEN;

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uYW5pIiwiYSI6ImNqYm5zbXhrbzU4bXgzM256MzQ5bjJ5YnkifQ.GICgZ4YgdjI5xeamsEd49w';




var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/light-v9',
    style: 'mapbox://styles/annani/cjn0ee24d85te2spgggk9e8o5',
    zoom: 9,
    pitch: 50,
    center: [-73.99, 40.73]
    // style: 'mapbox://styles/annani/cjcg9nye772tm2rmzjfyy9ga0'
});


// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
//     }));


// var geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
// });

// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

var url = '../data/bookstores.geojson';

map.on('load', function () {
    window.setInterval(function() {
        map.getSource('bookstores').setData(url);
    }, 1000);

    map.addSource('bookstores', { type: 'geojson', data: url });
    map.addLayer({
        "id": "bookstores",
        // "type": "symbol",
        "type": "circle",
        "source": "bookstores",
        "filter": [ "==", "Type", "Bookstore"],
        "paint": {
            "circle-radius": 6,
            "circle-color": "#ff0000"
        },
        // "layout": {
        //     "icon-image": "rocket-15"
        // }
    });
    map.addLayer({
        "id": "library",
        // "type": "symbol",
        "type": "circle",
        "source": "bookstores",
        "filter": [ "==", "Type", "Library"],
        "paint": {
            "circle-radius": 6,
            "circle-color": "#ff0000"
        },
        // "layout": {
        //     "icon-image": "cat", "icon-size": 0.25
        // }
    });

});

    //add pop-up
// When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', ['bookstores', 'library'], function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.Location)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', ['bookstores', 'library' ], function () {
        map.getCanvas().style.cursor = 'pointer';
        console.log('i am catching the click');
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', ['bookstores', 'library' ], function () {
        map.getCanvas().style.cursor = '';
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


//Fly to feature

var booksArray = [[40.7128, 74.0060], [10.3910, 75.4794]]
document.getElementById('fly').addEventListener('click', function () {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
        center: booksArray[Math.floor(Math.random() * booksArray.length)]
    });
});


