import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import PlaceIcon from "@mui/icons-material/Place";
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.73061,
    longitude: -73.935242, //Default city = NYC
    zoom: 11,
  });

  return (
    <div className="app">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/kanigeeuh/ckvib9vgs0qhc14o5k4kdz6hx"
      >
        <Marker
          latitude={40.782864}
          longitude={-73.965355}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <PlaceIcon style={{ fontSize: viewport.zoom * 5, color: "blue" }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
