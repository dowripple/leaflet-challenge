// URL to earthquake json data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var quakeMarkers = []

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 10;
}

// GET request, and function to handle returned JSON data
d3.json(queryUrl, function(data) {
  // Once we get a response, create a geoJSON layer containing the features array and add a popup for each marker
  // then, send the layer to the createMap() function.
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature : addPopup
  });

//   console.log(data.features[0])

  data.features.forEach(function(location) {

    // console.log(location.geometry.coordinates)
    quakeMarkers.push(
        L.circle(location.geometry.coordinates, {
            stroke: false,
            fillOpacity: 0.75,
            color: 'white',
            fillColor: 'white',
            radius: location.properties.mag
        })
    )

  })

  createMap(earthquakes, quakeMarkers);
});

// Define a function we want to run once for each feature in the features array
function addPopup(feature, layer) {
    // Give each feature a popup describing the place and time of the earthquake
    return layer.bindPopup(`<h3> ${feature.properties.place} </h3> <hr> <p> ${Date(feature.properties.time)} </p>`);
}

// function to receive a layer of markers and plot them on a map.
function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };
  
    var quakes = L.layerGroup(quakeMarkers);

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes,
      Magnitude: quakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }