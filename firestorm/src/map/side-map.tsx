import { SideMapContext, useCurrentSideMapBackground } from './side-map-context';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import mapboxgl, {ImageSource, LngLatBoundsLike, Map, RasterLayer} from 'mapbox-gl';

const SideMapContainer = () => {
  const currentSidemapBackground = useCurrentSideMapBackground();
  const {currentPrediction, center} = useContext(SideMapContext)
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useLayoutEffect(() => {
    const el = document.getElementById('side-map');
    if (el && !map.current) {
      map.current = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-8.648321, 40.644971],
        zoom: 9,
        interactive: false,
        projection: {name: 'mercator'},
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        });
        map.current.on('load', () => {
          if (map.current && currentSidemapBackground && currentSidemapBackground.coordinates) {

            map.current.addSource('side-map', {
              'type': 'image',
              ...currentSidemapBackground
            });
            map.current.addLayer({
              id: 'side-map-background',
              'type': 'raster',
              'source': 'side-map',
              'paint': {
                'raster-fade-duration': 0,
                'raster-opacity': 0.5
              }})
            if (currentSidemapBackground && currentSidemapBackground.coordinates.length > 3) {

              map.current.fitBounds([currentSidemapBackground?.coordinates[0], currentSidemapBackground?.coordinates[2]] as LngLatBoundsLike)
            } 
            }
          }
        )
      }
    
    if (map.current && center) {
      map.current.setCenter(center)
    } 

    }, [center, mapContainer, map]);
  
    useEffect(() => {
      if (map && map.current) {
        const layer = map.current.getLayer('side-map-background') as RasterLayer;
        if (layer && layer.source && currentSidemapBackground) {
          const source = layer.source as string;

          (map.current.getSource(source) as ImageSource).updateImage(currentSidemapBackground)
        }
      }
      
    }, [currentPrediction])

  if (!currentPrediction) {
    return null;
  }
  
  return (
    <div id="side-map" ref={mapContainer} className='w-100 h-100'></div>
  )
}

export default SideMapContainer;

