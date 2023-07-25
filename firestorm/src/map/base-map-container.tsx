'use client'
import BaseMapProvider, { useBaseMapContextReducer, IBaseMapContext } from '@/map/base-map-context'
import BaseMap from '@/map/base-map'
import BaseMapFilter from '@/map/base-map-filter'
import BaseMapTimeRange from './base-map-time-range'
import SideMapProvider, { useSideMapContextReducer } from './side-map-context'
import SideMap from './side-map-container'

const BaseMapContainer = ({nationalPrediction, focalPoints}: {nationalPrediction: IBaseMapContext['nationalPrediction']; focalPoints: IBaseMapContext['focalPoints']}) => {
  const baseMapState = useBaseMapContextReducer({ backgroundMapType: 'poluents', nationalPrediction, selectedPoluent: 'smoke', focalPoints: focalPoints})
  const sideMapState = useSideMapContextReducer({});
  return (
    <BaseMapProvider value={baseMapState}>
      <SideMapProvider value={sideMapState}>
        <main className='h-100 w-100'>
          <BaseMap />
          <BaseMapFilter />
          <BaseMapTimeRange />
        </main>
        <SideMap />
      </SideMapProvider>
    </BaseMapProvider>
  )
}

export default BaseMapContainer;