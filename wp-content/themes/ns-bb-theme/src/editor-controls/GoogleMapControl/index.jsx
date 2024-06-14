/* eslint-disable @wordpress/no-base-control-with-label-without-id */
/* eslint-disable no-unused-vars */
import { dispatch, select, useSelect } from "@wordpress/data"
import { PluginDocumentSettingPanel } from "@wordpress/edit-post"
import { TextControl, BaseControl, useBaseControlProps } from "@wordpress/components"
import { GoogleMap, useLoadScript, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api"
import { useState } from "@wordpress/element"

function GoogleMapControl({ mapsKey, label, value, onSelect, onRemove }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapsKey,
    libraries: ["places"],
  })

  const center =
    value !== undefined ? { lat: Number(value.lat), lng: Number(value.lng) } : { lat: 35.278513, lng: -120.664829 }

  const [autocomplete, setAutocomplete] = useState(null)
  const { baseControlProps } = useBaseControlProps({ label })

  function onLoadAC(autocomplete) {
    setAutocomplete(autocomplete)
  }

  return (
    <BaseControl {...baseControlProps} className="ns-map-control">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" mapContainerStyle={{}} center={center} zoom={10}>
          {value && (
            <Marker
              //   onLoad={onLoad}
              position={center}
            />
          )}
          <Autocomplete
            onLoad={onLoadAC}
            onPlaceChanged={(value) => {
              const mapObject = {
                address: autocomplete.getPlace().formatted_address,
                lat: String(autocomplete.getPlace().geometry.location.lat()),
                lng: String(autocomplete.getPlace().geometry.location.lng()),
              }
              onSelect(mapObject)
            }}
          >
            <input
              type="text"
              placeholder={value && value.address !== undefined ? value.address : "Search for Address"}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `100%`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "relative",
              }}
            />
          </Autocomplete>
        </GoogleMap>
      )}
    </BaseControl>
  )
}

export default GoogleMapControl
