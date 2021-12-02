import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PlaceIcon from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";
import axios from "axios";
import * as timeago from "timeago.js";
import Register from "./components/register/Register";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [markerID, setMarkerID] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [rating, setRating] = useState(0);
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
    getPins();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newMarker.lat,
      long: newMarker.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewMarker(null);
    } catch (error) {
      console.log(error);
    }
  };

  const markerClickHandler = (id, lat, long) => {
    setMarkerID(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddMarker = (e) => {
    const [long, lat] = e.lngLat;
    setNewMarker({
      lat,
      long,
    });
  };
  // const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <div className="app">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/kanigeeuh/ckvib9vgs0qhc14o5k4kdz6hx"
        onDblClick={handleAddMarker}
        transitionDuration="150"
      >
        {pins.map((pin) => (
          <>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-viewport.zoom * (3 / 2)}
              offsetTop={-viewport.zoom * 3}
            >
              <PlaceIcon
                style={{
                  fontSize: viewport.zoom * 3,
                  color: pin.username === currentUser ? "red" : "gray",
                  cursor: "pointer",
                }}
                onClick={() => markerClickHandler(pin._id, pin.lat, pin.long)}
              />
            </Marker>
            {pin._id === markerID && (
              <Popup
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setMarkerID(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Title</label>
                  <h4 className="card__place">{pin.title}</h4>
                  <label>Description</label>
                  <p className="card__review">{pin.description}</p>
                  <label>Rating</label>
                  <div className="card__ratings">
                    {/* {Array.from(new Array(Math.floor(pin.rating))).map(
                      (star) => (
                        <Star />
                      )
                    )} */}
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Description</label>
                  <span className="card__username">
                    Created by <b>{pin.username}</b>
                  </span>
                  <span>{timeago.format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newMarker && (
          <Popup
            latitude={newMarker.lat}
            longitude={newMarker.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewMarker(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={submitHandler}>
                <label>Title</label>
                <input
                  placeholder="Write a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Give us a description of this place."
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="newPin__Button" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout">Log Out</button>
        ) : (
          <div className="buttons">
            <button className="button login">Log In</button>
          </div>
        )}
        <Register />
      </ReactMapGL>
    </div>
  );
}

export default App;
