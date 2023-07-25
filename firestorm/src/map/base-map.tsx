import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import mapboxgl, {ImageSource, Map, RasterLayer} from 'mapbox-gl';
import { BaseMapContext, useCurrentBaseMapBackground } from './base-map-context';
import { SideMapContext } from './side-map-context';


const BaseMap = () => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-8.648321);
  const [lat, setLat] = useState(40.644971);
  const [zoom, setZoom] = useState(9);
  const currentLayer = useCurrentBaseMapBackground()
  const { focalPoints } = useContext(BaseMapContext);
  const { dispatch } = useContext(SideMapContext);

  useLayoutEffect(() => {
    if (mapContainer && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        projection: {name: 'mercator'},
        accessToken: 
        });
        map.current.on('load', () => {
          if (map.current) {
            map.current.addSource('base-map', {
              'type': 'image',
              ...currentLayer
            });
            map.current.addLayer({
              id: 'base-map-background',
              'type': 'raster',
              'source': 'base-map',
              'paint': {
              'raster-fade-duration': 0,
              'raster-opacity': 0.5
            }})
          }
          focalPoints.forEach((focal) => {
            const marker = new mapboxgl.Marker({clickTolerance: 10}).setLngLat(focal.center).on('click', () => console.log('ola')).addTo(map.current as Map);
            marker.getElement().addEventListener('click', () => {
              dispatch({
                focalPoint: focal,
                currentPrediction: focal.predictions['smoke'][0]
              })
            });
          })

        });
      }
    }, []);

    useEffect(() => {
      if (map && map.current) {
        const layer = map.current.getLayer('base-map-background') as RasterLayer;
        if (layer && layer.source && currentLayer) {
          const source = layer.source as string;

          (map.current.getSource(source) as ImageSource).updateImage(currentLayer)
        }
      }
      
    }, [currentLayer])
  
  return <div id="base-map" ref={mapContainer} className="h-100 w-100"></div>
}

export default BaseMap;