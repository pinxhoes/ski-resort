'use client'

import { resorts } from '@/data/resorts'
import { MapViewProps, RegionName } from "@/types"
import L, { LatLngTuple } from 'leaflet'
import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { regions } from "./RegionSelection"
import { Button } from "./ui/button"

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const regionCoordinates: Record<RegionName, { center: LatLngTuple; zoom: number }> = {
    'EUROPE': { center: [50, 15], zoom: 4 },
    'WEST': { center: [40, -120], zoom: 5 },
    'ROCKIES': { center: [43, -110], zoom: 5 },
    'MIDWEST': { center: [45, -90], zoom: 4 },
    'EAST': { center: [43, -75], zoom: 5 },
    'MID-ATLANTIC': { center: [40, -77], zoom: 5 },
    'CANADA': { center: [55, -100], zoom: 4 },
    'JAPAN': { center: [38, 138], zoom: 5 },
    'ALL RESORTS': { center: [30, 0], zoom: 2 },
}

const createCustomIcon = (type: 'PARTNERS' | 'ALLIED') => {
    return L.divIcon({
        className: type === 'PARTNERS' ? 'partner-marker' : 'allied-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    })
}

function ChangeView({ center, zoom }: { center: LatLngTuple; zoom: number }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 2 })
    }, [center, zoom, map])
    return null
}

export function MapView({ selectedRegion, onRegionChange, onViewChange }: MapViewProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Header with Region Selector and View Toggle */}
            <div className="relative z-[1000] bg-background border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground">FILTER BY REGION</p>
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <h2 className="text-4xl font-bold">{selectedRegion}</h2>
                                {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="default" className="bg-primary text-primary-foreground">
                                MAP
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => onViewChange('list')}
                            >
                                LIST
                            </Button>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-background border-t border-border mt-1">
                            <div className="container mx-auto py-2">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => {
                                            onRegionChange(region as RegionName)
                                            setIsDropdownOpen(false)
                                        }}
                                        className="block w-full text-left py-2 px-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 w-full" style={{ height: 'calc(100vh - 88px)' }}>
                <MapContainer
                    center={regionCoordinates[selectedRegion].center}
                    zoom={regionCoordinates[selectedRegion].zoom}
                    className="w-full h-full"
                    zoomControl={false}
                    attributionControl={true}
                    style={{ background: 'hsl(var(--background))' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    />
                    <ChangeView
                        center={regionCoordinates[selectedRegion].center}
                        zoom={regionCoordinates[selectedRegion].zoom}
                    />
                    {resorts.map((resort) => (
                        <Marker
                            key={resort.id}
                            position={resort.location.coordinates}
                            icon={createCustomIcon(resort.type)}
                        >
                            <Popup className="resort-popup">
                                <div className="p-4 min-w-[300px]">
                                    <h3 className="text-xl font-bold mb-1">{resort.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{resort.location.city}, {resort.location.country}</p>
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-5 gap-4">
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground font-medium mb-1">VERTICAL</p>
                                            <p className="text-sm">{resort.stats.vertical}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground font-medium mb-1">TRAILS</p>
                                            <p className="text-sm">{resort.stats.trails}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground font-medium mb-1">LIFTS</p>
                                            <p className="text-sm">{resort.stats.lifts}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground font-medium mb-1">NIGHT</p>
                                            <p className="text-sm">{resort.stats.night ? 'Yes' : 'No'}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground font-medium mb-1">T-PARKS</p>
                                            <p className="text-sm">{resort.stats.tParks ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Legend */}
                <div className="absolute bottom-8 left-4 z-[1000] bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-primary rounded-full" />
                        <span>PARTNERS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary rounded-full" />
                        <span>ALLIED</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
