import React from 'react';
import GoogleMapReact, { Coords, ClickEventValue } from 'google-map-react';
 
const Map = ({markerCoords, setMarkerCoords}: {markerCoords: Coords, setMarkerCoords: (arg0: React.SetStateAction<Coords>) => void}) => {

    const AnyReactComponent = ({lat, lng}: {lat:number, lng: number}) => <div className='mapMarker'>X</div>;

    const onClick = (e: ClickEventValue) => {
      setMarkerCoords({
        lat: e.lat,
        lng: e.lng
      })
    }

    return (
      <div style={{ height: '75vh', width: '100%' }}>
        <GoogleMapReact
          onClick={ (e) => onClick(e)}
          bootstrapURLKeys={{ key: 'AIzaSyCzbiF7AugxOd3ycXvWbLLpBq0dlRtZhAM' }}
          defaultCenter={ {
            lat: 60.184570,
            lng: 24.826775
          }}
          defaultZoom= {15}
        >
          <AnyReactComponent
            lat={markerCoords.lat}
            lng={markerCoords.lng}
          />
        
        </GoogleMapReact>
      </div>
    );
}
 
export default Map;