import BaseMapContainer from '@/map/base-map-container'
import fs from 'fs';
import { IPredictionPoint, PUBLIC_FOLDER, SMOKE_FORECAST_FOLDER, convertFileNameToPredictionPoint } from '@/utils/files';
import crypto from 'crypto';

function getData(): { nationalPrediction: IPredictionPoint[] } {
  
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  const dirContents = fs.readdirSync(`${PUBLIC_FOLDER}${SMOKE_FORECAST_FOLDER}`);

  return {nationalPrediction: dirContents.map(e => convertFileNameToPredictionPoint(e, crypto.randomUUID())).filter(el => el!==null) as IPredictionPoint[]}
}

export default async function Home() {
  const { nationalPrediction } = await getData();
  
  return (
    <BaseMapContainer nationalPrediction={nationalPrediction} />
  )
}
