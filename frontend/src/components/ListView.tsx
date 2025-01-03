'use client'

import { ListViewProps, RegionName } from '@/types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { regions } from './RegionSelection'
import { ResortCard } from './ResortCard'
import { Button } from './ui/button'


export function ListView({ selectedRegion, onRegionChange, onViewChange, resorts }: ListViewProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Region Selector */}
            <div className="bg-card text-card-foreground p-4 rounded-[--radius] mb-8">
                <div className="flex flex-col">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div>
                            <p className="text-sm">FILTER BY REGION</p>
                            <h2 className="text-4xl font-bold">{selectedRegion}</h2>
                        </div>
                        {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {isDropdownOpen && (
                        <div className="mt-4 space-y-2">
                            {regions.map((region) => (
                                <button
                                    key={region}
                                    onClick={() => {
                                        onRegionChange(region as RegionName)
                                        setIsDropdownOpen(false)
                                    }}
                                    className="block w-full text-left py-1 hover:text-primary transition-colors"
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-end mb-8">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="bg-card text-card-foreground hover:bg-accent"
                        onClick={() => onViewChange('map')}
                    >
                        MAP
                    </Button>
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        LIST
                    </Button>
                </div>
            </div>

            {/* Resort Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resorts.map((resort) => (
                    <ResortCard key={resort.id} resort={resort} />
                ))}
            </div>
        </div>
    )
}