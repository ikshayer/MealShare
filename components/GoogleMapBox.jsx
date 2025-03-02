import { LoaderCircle, Mail } from "lucide-react";
import { GoogleMap, LoadScript, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import { useState } from "react";

const GoogleMapBox = () => {

    const LoadingMessage = () => (
        <div className="flex justify-center items-center h-full">
            <LoaderCircle className="animate-spin w-24 h-24"/>
        </div>
    );

    const [markers, setMarker] = useState([]);

    const containerStyle = {
        width: '100%',
        height: '100%'
      };


      const fairfaxCountyCoordinates = [
        { lat: 38.8570, lng: -77.3384 },
        { lat: 38.8504, lng: -77.3512 },
        { lat: 38.8402, lng: -77.3525 },
        { lat: 38.8346, lng: -77.3595 },
        { lat: 38.8259, lng: -77.3586 },
        { lat: 38.8191, lng: -77.3467 },
        { lat: 38.8171, lng: -77.3342 },
        { lat: 38.8186, lng: -77.3234 },
        { lat: 38.8227, lng: -77.3153 },
        { lat: 38.8291, lng: -77.3076 },
        { lat: 38.8351, lng: -77.3039 },
        { lat: 38.8442, lng: -77.3009 },
        { lat: 38.8503, lng: -77.3051 },
        { lat: 38.8571, lng: -77.3124 },
        { lat: 38.8606, lng: -77.3214 },
        { lat: 38.8620, lng: -77.3297 },
        { lat: 38.8570, lng: -77.3384 } // Closing the polygon
      ];
      

      const center = {
        lat: 38.8462,
        lng: -77.3064,
      };

      const night = [
        { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4b6878" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#64779e" }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4b6878" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [{ color: "#334e87" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{ color: "#023e58" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#283d6a" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6f9ba5" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#304a7d" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#98a5be" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#2c6675" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#255763" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#b0d5ce" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#023e58" }],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [{ color: "#98a5be" }],
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [{ color: "#283d6a" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#3a4762" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#0e1626" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#4e6d70" }],
        },
      ];

    const handleMarkerClick = (event) => {
        setMarker((current) => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }
        ]

        )
    }

    return(
        <div
    className={`bg-[#141414cc] rounded-lg border-2 border-zinc-500 overflow-hidden text-white h-screen w-full flex-center`}>
        
        <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} 
        loadingElement={<LoadingMessage />}
        
        >
            <GoogleMap className="custom-map-container"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                    styles: night,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onClick={(e) => handleMarkerClick(e)}
            
            >
                
                <Marker position={center} />
                {markers.map((marker, index) => (
                        <Marker key={index} position={marker} />
                    ))}
                
            </GoogleMap>
        </LoadScript>
        
    </div>
    
    )
}

export default GoogleMapBox;