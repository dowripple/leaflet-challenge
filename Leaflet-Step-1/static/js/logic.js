// URL to earthquake json data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var quakeMarkers = []

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// function to return the color
function markerColor(magnitude) {
  if (magnitude > 8) {
    return 'red'
  } else if (magnitude > 4) {
    return 'yellow'
  } else {
    return 'green'
  }
}

// GET request, and function to handle returned JSON data
d3.json(queryUrl, function(data) {
  
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature : addPopup,
    pointToLayer: addMarker
  });

//   console.log(data.features[0])

  data.features.forEach(function(location) {

    // console.log(location.geometry.coordinates)
    quakeMarkers.push(
        L.circle(location.geometry.coordinates, {
            stroke: false,
            fillOpacity: 0.75,
            color: markerColor(location.properties.mag),
            fillColor: markerColor(location.properties.mag),
            radius: markerSize(location.properties.mag)
        })
    )

  })

  createMap(earthquakes, quakeMarkers);

});

function addMarker(feature, location) {
  var options = {
    stroke: false,
    fillOpacity: 0.75,
    color: markerColor(feature.properties.mag),
    fillColor: markerColor(feature.properties.mag),
    radius: markerSize(feature.properties.mag)
  }

  return L.circleMarker(location, options);

}

// Define a function we want to run once for each feature in the features array
function addPopup(feature, layer) {
    // Give each feature a popup describing the place and time of the earthquake
    return layer.bindPopup(`<h3> ${feature.properties.place} </h3> <hr> <h4>Magnitude: ${feature.properties.mag} </h4> <p> ${Date(feature.properties.time)} </p>`);
}

// function to receive a layer of markers and plot them on a map.
function createMap(earthquakes, quakeMarkers) {

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

    console.log(quakes)

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