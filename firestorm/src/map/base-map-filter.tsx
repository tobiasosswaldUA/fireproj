import { ChangeEvent, useContext } from "react";
import FormCheck from "react-bootstrap/FormCheck";
import FormLabel from "react-bootstrap/FormLabel";
import { BaseMapContext, IBaseMapContext } from "./base-map-context";


const BaseMapFilter = () => {
  const {backgroundMapType, dispatch} = useContext(BaseMapContext);
  const getValueUpdater = (val: IBaseMapContext['backgroundMapType']) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch({backgroundMapType: val})
    }
  }

  return <div className="rounded position-absolute bottom-0 start-0 m-4 p-3 bg-white">
    <FormCheck type='radio' name='base-map-selector-smoke' label="Smoke" checked={backgroundMapType === 'smoke'} onChange={getValueUpdater('smoke')}/>
    <FormCheck type='radio' name='base-map-selector-weather' label="Weather" value="weather" checked={backgroundMapType === 'weather'} onChange={getValueUpdater('weather')}/>
    <FormCheck type='radio' name='base-map-selector-topography' label="Topography" checked={backgroundMapType === 'topography'} onChange={getValueUpdater('topography')}/>
    <FormCheck type='radio' name='base-map-selector-fuel' label="Fuel" checked={backgroundMapType === 'fuel'} onChange={getValueUpdater('fuel')}/>
  </div>
}

export default BaseMapFilter;