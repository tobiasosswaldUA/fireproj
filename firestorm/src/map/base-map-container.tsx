'use client'
import BaseMapProvider, { useBaseMapContextReducer } from '@/map/base-map-context'
import BaseMap from '@/map/base-map'
import BaseMapFilter from '@/map/base-map-filter'
import { IPredictionPoint } from '@/utils/files'
import BaseMapTimeRange from './base-map-time-range'

const BaseMapContainer = ({nationalPrediction}: {nationalPrediction: IPredictionPoint[]}) => {
  const baseMapState = useBaseMapContextReducer({ backgroundMapType: 'smoke', nationalPrediction})
  return (
    <BaseMapProvider value={baseMapState}>
      <main className='h-100 w-100'>
        <BaseMap />
        <BaseMapFilter />
        <BaseMapTimeRange />
      </main>
    </BaseMapProvider>
  )
}

export default BaseMapContainer;