import { Resort } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

interface ResortCardProps {
    resort: Resort
}

export function ResortCard({ resort }: ResortCardProps) {
    return (
        <div className="relative rounded-[--radius] overflow-hidden bg-card text-card-foreground group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={`/images/resorts/${resort.id}.jpg`}
                    alt={resort.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground">{resort.location.city}, {resort.location.country}</p>
                        <h3 className="text-2xl font-bold">{resort.name}</h3>
                    </div>
                    <div className="bg-primary rounded-full p-2 group-hover:bg-primary/90 transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 text-center text-sm">
                    <div>
                        <p className="text-muted-foreground mb-1">VERTICAL</p>
                        <p>{resort.stats.vertical}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">TRAILS</p>
                        <p>{resort.stats.trails}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">LIFTS</p>
                        <p>{resort.stats.lifts}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">NIGHT</p>
                        <p>{resort.stats.night ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">T-PARKS</p>
                        <p>{resort.stats.tParks ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                {resort.type === 'PARTNERS' ? (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-[--radius]">
                        PARTNERS
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 bg-transparent border border-primary text-card-foreground text-xs px-2 py-1 rounded-[--radius]">
                        ALLIED
                    </div>
                )}
            </div>
        </div>
    )
}