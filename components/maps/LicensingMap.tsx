import { Map, MapMarker, MapPopup, MapTileLayer } from "../ui/map";

interface Props {
  latitude: number
  longitude: number
}

export default function LicensingMap({ latitude, longitude }: Props) {
  return (
    <Map center={[latitude, longitude]} className="rounded-2xl overflow-hidden" zoom={20}>
      <MapMarker position={[latitude, longitude]}>
        <MapTileLayer />
        <MapPopup>
          <span></span>
        </MapPopup>
      </MapMarker>
    </Map>
  )
}
