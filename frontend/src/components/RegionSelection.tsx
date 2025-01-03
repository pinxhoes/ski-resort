import { RegionName } from '@/types';

export const regions: RegionName[] = [
    'ALL RESORTS',
    'WEST',
    'ROCKIES',
    'MIDWEST',
    'EAST',
    'MID-ATLANTIC',
    'CANADA',
    'JAPAN',
    'EUROPE'
]

interface RegionSelectionProps {
    onRegionSelect: (region: RegionName) => void;
}

export function RegionSelection({ onRegionSelect }: RegionSelectionProps) {
    return (
        <div className="grid gap-4">
            {regions.map((region) => (
                <button
                    key={region}
                    onClick={() => onRegionSelect(region)}
                    className="text-left text-4xl font-bold hover:text-primary transition-colors"
                >
                    {region}
                </button>
            ))}
        </div>
    )
}