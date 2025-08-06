import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px',
}

const center = {
    lat: 18.5612929,
    lng: 73.9160117,
}

const MapViewWithMarker = () => {
    return (
        <LoadScript
            googleMapsApiKey={
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'
            }
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapViewWithMarker
