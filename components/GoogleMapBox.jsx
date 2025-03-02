import { LoaderCircle, Mail } from "lucide-react";
import { GoogleMap, LoadScript, Marker, Polygon, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState } from "react";

const GoogleMapBox = () => {

    const LoadingMessage = () => (
        <div className="flex justify-center items-center h-full">
            <LoaderCircle className="animate-spin w-24 h-24"/>
        </div>
    );

    const center = {
        lat: 38.8462,
        lng: -77.3064,
      };

    const [markers, setMarker] = useState([{
        name: "HURDCO International School",
        lat: 38.8462,
        lng: -77.3064,
        food_requirements: {
            grains: { required: 300, obtained: 278 },
            fruits: { required: 200, obtained: 180 },
            vegetables: { required: 250, obtained: 230 },
            protein: { required: 150, obtained: 140 },
            dairy: { required: 100, obtained: 90 }
        }
    },
    {
        name: "Fairfax High School",
        lat: 38.8515,
        lng: -77.3069,
        food_requirements: {
            grains: { required: 320, obtained: 300 },
            fruits: { required: 210, obtained: 190 },
            vegetables: { required: 260, obtained: 240 },
            protein: { required: 160, obtained: 150 },
            dairy: { required: 110, obtained: 100 }
        }
    },
    {
        name: "Lanier Middle School",
        lat: 38.8531,
        lng: -77.3082,
        food_requirements: {
            grains: { required: 310, obtained: 290 },
            fruits: { required: 220, obtained: 200 },
            vegetables: { required: 270, obtained: 250 },
            protein: { required: 170, obtained: 160 },
            dairy: { required: 120, obtained: 110 }
        }
    },
    {
        name: "Providence Elementary School",
        lat: 38.8552,
        lng: -77.3095,
        food_requirements: {
            grains: { required: 290, obtained: 270 },
            fruits: { required: 230, obtained: 210 },
            vegetables: { required: 280, obtained: 260 },
            protein: { required: 180, obtained: 170 },
            dairy: { required: 130, obtained: 120 }
        }
    },
    {
        name: "Oakton High School",
        lat: 38.8765,
        lng: -77.2921,
        food_requirements: {
            grains: { required: 330, obtained: 310 },
            fruits: { required: 240, obtained: 220 },
            vegetables: { required: 290, obtained: 270 },
            protein: { required: 190, obtained: 180 },
            dairy: { required: 140, obtained: 130 }
        }
    },
    {
        name: "Mosby Woods Elementary School",
        lat: 38.8653,
        lng: -77.2928,
        food_requirements: {
            grains: { required: 340, obtained: 320 },
            fruits: { required: 250, obtained: 230 },
            vegetables: { required: 300, obtained: 280 },
            protein: { required: 200, obtained: 190 },
            dairy: { required: 150, obtained: 140 }
        }
    },
    {
        name: "Woodson High School",
        lat: 38.8306,
        lng: -77.2734,
        food_requirements: {
            grains: { required: 350, obtained: 330 },
            fruits: { required: 260, obtained: 240 },
            vegetables: { required: 310, obtained: 290 },
            protein: { required: 210, obtained: 200 },
            dairy: { required: 160, obtained: 150 }
        }
    },
    {
        name: "Frost Middle School",
        lat: 38.8321,
        lng: -77.2739,
        food_requirements: {
            grains: { required: 360, obtained: 340 },
            fruits: { required: 270, obtained: 250 },
            vegetables: { required: 320, obtained: 300 },
            protein: { required: 220, obtained: 210 },
            dairy: { required: 170, obtained: 160 }
        }
    },
    {
        name: "Daniels Run Elementary School",
        lat: 38.8576,
        lng: -77.3031,
        food_requirements: {
            grains: { required: 370, obtained: 350 },
            fruits: { required: 280, obtained: 260 },
            vegetables: { required: 330, obtained: 310 },
            protein: { required: 230, obtained: 220 },
            dairy: { required: 180, obtained: 170 }
        }
    },
    {
        name: "Robinson Secondary School",
        lat: 38.8033,
        lng: -77.3064,
        food_requirements: {
            grains: { required: 380, obtained: 360 },
            fruits: { required: 290, obtained: 270 },
            vegetables: { required: 340, obtained: 320 },
            protein: { required: 240, obtained: 230 },
            dairy: { required: 190, obtained: 180 }
        }
    }]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const containerStyle = {
        width: '100%',
        height: '100%'
      };

      const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        console.log('works')
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
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
                
            
            >
                
                {markers.map((marker, index) => (
                        <Marker key={index} position={marker} onClick={() => handleMarkerClick(marker)}/>
                    ))}
                {selectedMarker && (
                        <InfoWindow
                            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div>
                                <h2 className="text-3xl text-black font-bold">{selectedMarker.name}</h2>
                                <div className="mt-4 flex-between font-semibold">
                                <p className="text-lg text-black">Grains:  </p>
                                <p className="text-lg text-black">{selectedMarker.food_requirements.grains.obtained}/{selectedMarker.food_requirements.grains.required} lbs </p>
                                </div>
                                <div className="mt-4 flex-between font-semibold">
                                <p className="text-lg text-black">Fruits:  </p>
                                <p className="text-lg text-black">{selectedMarker.food_requirements.fruits.obtained}/{selectedMarker.food_requirements.fruits.required} lbs </p>
                                </div>
                                <div className="mt-4 flex-between font-semibold">
                                <p className="text-lg text-black">Vegetables:  </p>
                                <p className="text-lg text-black">{selectedMarker.food_requirements.vegetables.obtained}/{selectedMarker.food_requirements.vegetables.required} lbs </p>
                                </div>
                                <div className="mt-4 flex-between font-semibold">
                                <p className="text-lg text-black">Protein:  </p>
                                <p className="text-lg text-black">{selectedMarker.food_requirements.protein.obtained}/{selectedMarker.food_requirements.protein.required} lbs </p>
                                </div>
                                <div className="mt-4 flex-between font-semibold">
                                <p className="text-lg text-black">Dairy:  </p>
                                <p className="text-lg text-black">{selectedMarker.food_requirements.dairy.obtained}/{selectedMarker.food_requirements.dairy.required} lbs </p>
                                </div>
                                <button className="black_btn mt-4">
                                    Donate
                                </button>
                            </div>
                        </InfoWindow>
                    )}
            </GoogleMap>
        </LoadScript>
        
    </div>
    
    )
}

export default GoogleMapBox;