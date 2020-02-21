# leaflet-challenge
## by Michael Dowlin
## 2/20/20

### Description
This project pulls earthquake data from the USGS website.  The dataset selected was all earthquakes for the past seven days.  The javascript file "logic.js" pulls in the json data and generates a map using Leaflet and mapbox.  Each feature (earthquake) has a circle marker where the size, color and opacity are derived from the magnitude.  There is a legend in the bottom right but it is hard to see because I had trouble with the CSS!

![Quake Chart](Leaflet-Step-1/Images/earthquake_map_chart.png)

### Contents
| File                        | Description                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------|
|Leaflet-Step-1/static/js/logic.js             |Javascript code that will create the map, complete with earthquake markers|
|Leaflet-Step-1/indext.html                  |Home page for geo-chart
