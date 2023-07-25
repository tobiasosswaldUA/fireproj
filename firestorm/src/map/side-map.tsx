import Offcanvas from 'react-bootstrap/Offcanvas';
import { SideMapContext, useCurrentSideMapBackground } from './side-map-context';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import mapboxgl, {ImageSource, Map, RasterLayer} from 'mapbox-gl';

const SideMapContainer = () => {
  const currentSidemapBackground = useCurrentSideMapBackground();
  const {dispatch, currentPrediction, focalPoint, selectedPoluent} = useContext(SideMapContext)
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  const handleClose = () => {
    dispatch({currentPrediction: undefined});
  }
  console.log('here')
  useLayoutEffect(() => {
    const el = document.getElementById('side-map');
    console.log(el);
    if (el && focalPoint && !map.current) {
      map.current = new mapboxgl.Map({
        container: document.getElementById('side-map'),
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-8.648321, 40.644971],
        zoom: 9,
        projection: {name: 'mercator'},
        accessToken: 
        });
        map.current.on('load', () => {
          console.log('oodododood')
        }
        )

        map.current.on('error', console.log)

        console.log('herasdasd')
      }
    
    if (map.current && focalPoint) {
      map.current.setCenter(focalPoint.center)
    } 

    }, [focalPoint, mapContainer, map]);

  if (!currentPrediction) {
    return null;
  }

  if (currentPrediction && !currentSidemapBackground) {
    dispatch({currentPrediction: focalPoint[selectedPoluent][0]})
  }
  
  

  

  return (
    
        <div id="side-map" ref={mapContainer} className='w-100 h-100'></div>
    
  )
}

export default SideMapContainer;

