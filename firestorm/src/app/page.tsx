import BaseMapContainer from '@/map/base-map-container'
import fs from 'fs';
import { DESCRIPTION_FILE, IDescriptionFile, IFocalDescription, IPredictionPoint, PUBLIC_FOLDER, SMOKE_FORECAST_FOLDER, convertFileNameToPredictionPoint } from '@/utils/files';
import crypto from 'crypto';
import 'mapbox-gl/dist/mapbox-gl.css';

function getData(): { nationalPrediction: Record<string, IPredictionPoint[]>; focalPoints: IFocalDescription<IPredictionPoint>[]; poluents: string[];} {
  
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  // const dirContents = fs.readdirSync(`${PUBLIC_FOLDER}${SMOKE_FORECAST_FOLDER}`);
  const descriptionFile: IDescriptionFile = JSON.parse(fs.readFileSync(`${PUBLIC_FOLDER}${DESCRIPTION_FILE}`) as any);

  const nationalPrediction = Object.keys(descriptionFile.national).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: descriptionFile.national[curr]
              .map(
                e => convertFileNameToPredictionPoint(e, crypto.randomUUID())
              ).filter(el => el !== null) as IPredictionPoint[]}
  }, {} as Record<string, IPredictionPoint[]>);

  const focalPoints = descriptionFile.focal.map(focal => ({
    ...focal,
    predictions: Object.keys(focal.predictions).reduce((acc: Record<string, IPredictionPoint[]>, curr) => {
      return {
        ...acc,
        [curr]: focal.predictions[curr].map(
            e=> convertFileNameToPredictionPoint(e, crypto.randomUUID()
            )
          ).filter(el => el !== null) as IPredictionPoint[]
      }
    }, {} as Record<string, IPredictionPoint[]>)
  }))
  
  return {poluents: descriptionFile.poluents, nationalPrediction, focalPoints}
}

export default async function Home() {
  const { nationalPrediction, focalPoints, poluents } = await getData();
  
  return (
    <BaseMapContainer poluents={poluents} poluentPrediction={nationalPrediction} focalPoints={focalPoints} />
  )
}
