'use client'
import BaseMapProvider, { useBaseMapContextReducer, IBaseMapContext, BaseMapContext } from '@/map/base-map-context'
import BaseMap from '@/map/base-map'
import BaseMapFilter from '@/map/base-map-filter'
import MapTimeRange from './map-time-range'
import SideMapProvider, { useSideMapContextReducer } from './side-map-context'
import SideMap from './side-map-container'

const BaseMapContainer = ({poluentPrediction, focalPoints, poluents}: {poluentPrediction: IBaseMapContext['poluentPrediction']; focalPoints: IBaseMapContext['focalPoints']; poluents: string[]}) => {
  const baseMapState = useBaseMapContextReducer({ backgroundMapType: 'poluents', poluentPrediction, selectedPoluent: 'smoke', focalPoints: focalPoints, poluents})
  const sideMapState = useSideMapContextReducer({ poluents });

  return (
    <BaseMapProvider value={baseMapState}>
      <SideMapProvider value={sideMapState}>
        <main className='h-100 w-100'>
          <BaseMap />
          <BaseMapFilter />
          <MapTimeRange context={BaseMapContext} />
        </main>
        <SideMap />
      </SideMapProvider>
    </BaseMapProvider>
  )
}

export default BaseMapContainer;