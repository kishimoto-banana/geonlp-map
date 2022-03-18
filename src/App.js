import "./App.css";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import geos from "./agg.json";
import { useState } from "react";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 35.6598003,
  lng: 139.7023894,
};

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  return (
    <div className="App">
      <LoadScript googleMapsApiKey="api key">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {geos.map((geo, index) => (
            <Marker
              key={index}
              position={{
                lat: geo.geojson.geometry.coordinates[1],
                lng: geo.geojson.geometry.coordinates[0],
              }}
              onClick={() => {
                setSelectedPlace(geo);
              }}
            />
          ))}
          {selectedPlace && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
              position={{
                lat: selectedPlace.geojson.geometry.coordinates[1],
                lng: selectedPlace.geojson.geometry.coordinates[0],
              }}
            >
              <div>
                {selectedPlace.freq_words.map((word_count, index) => (
                  <p style={{ fontSize: 15 }} key={index}>
                    {word_count.word}: {word_count.count}
                  </p>
                ))}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
