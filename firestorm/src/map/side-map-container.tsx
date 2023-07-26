import Offcanvas from 'react-bootstrap/Offcanvas';
import { SideMapContext } from './side-map-context';
import type {BaseMapContext} from './base-map-context';
import { useContext } from 'react';
import SideMap from './side-map';
import MapTimeRange from './map-time-range';

const SideMapContainer = () => {
  const {dispatch, currentPrediction, name, selectedPoluent, poluentPrediction} = useContext(SideMapContext)

  const handleClose = () => {
    dispatch({currentPrediction: undefined});
  }

  if (!currentPrediction) {
    return null;
  }

  if (!currentPrediction && poluentPrediction) {
    dispatch({currentPrediction: poluentPrediction[selectedPoluent][0]})
  }
  

  return (
    <Offcanvas bsPrefix='w-100 offcanvas' show={!!currentPrediction} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Current Prediction : {name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='p-0'>
        <SideMap />
        <MapTimeRange context={SideMapContext as any} />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default SideMapContainer;

