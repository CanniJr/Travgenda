import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

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
      >
        <Marker
          latitude={40.782864}
          longitude={-73.965355}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>test</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
