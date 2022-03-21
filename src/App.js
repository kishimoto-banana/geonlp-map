import "./App.css";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import geos from "./agg.json";
import { useState } from "react";
import SearchBarContainer from "./components/searchBarContainer";

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 35.6598003,
  lng: 139.7023894,
};

const searchOptions = [];
for (let geo of geos) {
  for (let word_count of geo.freq_words) {
    searchOptions.push({
      surface: geo.geojson.properties.surface,
      word: word_count.word,
      count: word_count.count,
      geo: geo,
    });
  }
}

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <LoadScript googleMapsApiKey="api key">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          <div style={{ paddingTop: "60px", paddingLeft: "8px" }}>
            <SearchBarContainer
              data={searchOptions}
              filter={filter}
              setFilter={setFilter}
              placeholder="検索…"
              setSelectedPlace={setSelectedPlace}
            />
          </div>
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
