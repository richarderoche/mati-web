import { PbBlockMapbox } from '@/sanity.types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'

export default function MapboxBlock({ block }: { block: PbBlockMapbox }) {
  const {
    accessToken,
    styleUrl,
    mapboxCenter,
    mapboxZoom,
    mapboxAspectRatio = { width: 16, height: 9 },
  } = block

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!accessToken || !mapContainerRef.current) return
    mapboxgl.accessToken = accessToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: styleUrl ?? 'mapbox://styles/mapbox/standard',
      center: [mapboxCenter?.longitude ?? 0, mapboxCenter?.latitude ?? 0],
      zoom: mapboxZoom ?? 2,
      scrollZoom: false,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      mapRef.current?.remove()
    }
  }, [accessToken, styleUrl, mapboxCenter, mapboxZoom])

  if (!accessToken) return

  return (
    <div
      style={{
        aspectRatio: `${mapboxAspectRatio.width}/${mapboxAspectRatio.height}`,
      }}
    >
      <div ref={mapContainerRef} className="h-full w-full"></div>
    </div>
  )
}
