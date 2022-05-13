import React from 'react'

import { GoogleMap, useJsApiLoader, Marker, withGoogleMap} from '@react-google-maps/api';
import {useState} from 'react'

const containerStyle = {
  width: '1000px',
  height: '600px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};




function MyComponent({setMarklat,setMarkLong}) {

    const [lat,setLat]= useState(-3.745)
    const [lng, setLng] = useState(-38.523)

    const [marklat,setMark] = useState(-3.745)
    const [matklong,setLong] = useState(-38.523)

    function addMarker(latLng) {
        let marker = new window.google.maps.Marker({
            map: map,
            position: latLng,
            draggable: true
        });
    }


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDwNqypA_7ABIa3WZLdP8bLElV46GBv8_I"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(new window.google.maps.LatLng(lat,lng));
    map.fitBounds(bounds);
    setMap(map)

  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const changepostion = (e)=>{

    console.log("change in progress")
    navigator.geolocation.getCurrentPosition((pos)=>{
        map.panTo({lat: pos.coords.latitude, lng: pos.coords.longitude})
        
        setMark(pos.coords.latitude)
        setLong(pos.coords.longitude)
    })


  }

  

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={changepostion}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker
        position={new window.google.maps.LatLng(marklat,matklong)}

        draggable={true}
        onDrag = { (e)=>{
            console.log(e.latLng.lat())
            setMarklat(e.latLng.lat())
            setMarkLong(e.latLng.lng())
        }
        }
        /> 
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)