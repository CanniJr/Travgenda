import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PlaceIcon from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";
import axios from "axios";
import "./App.css";

function App() {
  const [showPopup, togglePopup] = useState(true);
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.73061,
    longitude: -73.935242, //Default city = NYC
    zoom: 11,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div className="app">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/kanigeeuh/ckvib9vgs0qhc14o5k4kdz6hx"
      >
        <Marker
          onClick={() => togglePopup((prevState) => !prevState)}
          latitude={40.782864}
          longitude={-73.965355}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <PlaceIcon style={{ fontSize: viewport.zoom * 5, color: "blue" }} />
        </Marker>
        {showPopup && (
          <Popup
            latitude={40.782864}
            longitude={-73.965355}
            closeButton={true}
            closeOnClick={false}
            onClose={() => togglePopup(false)}
            anchor="left"
            onC
          >
            <div className="card">
              <label>Place</label>
              <h4 className="card__place">Central Park</h4>
              <label>Review</label>
              <p className="card__review">Nice Park</p>
              <label>Rating</label>
              <div className="card__ratings">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <label>Description</label>
              <span className="card__username">
                Created by <b>Canni</b>
              </span>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
