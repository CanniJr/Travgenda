import { useState } from "react";
import ReactMapGL from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    logitude: -122.4376,
    zoom: 8,
  });

  return <div className="App">Travgenda</div>;
}

export default App;
