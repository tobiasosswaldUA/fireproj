import Offcanvas from 'react-bootstrap/Offcanvas';
import { SideMapContext, useCurrentSideMapBackground } from './side-map-context';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import mapboxgl, {ImageSource, Map, RasterLayer} from 'mapbox-gl';
import SideMap from './side-map';

const SideMapContainer = () => {
  const currentSidemapBackground = useCurrentSideMapBackground();
  const {dispatch, currentPrediction, focalPoint, selectedPoluent} = useContext(SideMapContext)

  const handleClose = () => {
    dispatch({currentPrediction: undefined});
  }

  if (!currentPrediction) {
    return null;
  }

  if (currentPrediction && !currentSidemapBackground) {
    dispatch({currentPrediction: focalPoint[selectedPoluent][0]})
  }
  
  

  

  return (
    <Offcanvas bsPrefix='w-100 offcanvas' show={!!currentSidemapBackground} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Current Prediction : {focalPoint?.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        <SideMap />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default SideMapContainer;

