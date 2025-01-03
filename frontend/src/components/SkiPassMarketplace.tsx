'use client'

import { resorts } from "@/data/resorts"
import { RegionName } from "@/types"
import { useState } from "react"
import { ListView } from "./ListView"
import { MapView } from "./MapView"
import { RegionSelection } from "./RegionSelection"

export default function SkiPassMarketplace() {
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null)
  const [view, setView] = useState<'map' | 'list'>('map')

  const handleRegionChange = (region: RegionName) => {
    setSelectedRegion(region)
  }

  return (
    <div>
      {!selectedRegion ? (
        <RegionSelection onRegionSelect={handleRegionChange} />
      ) : view === 'map' ? (
        <MapView
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          onViewChange={setView}
        />
      ) : (
        <ListView
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          onViewChange={setView}
          resorts={resorts}
        />
      )}
    </div>
  )
}