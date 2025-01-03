import { LatLngTuple } from 'leaflet';

export type RegionName = 'ALL RESORTS' | 'WEST' | 'ROCKIES' | 'MIDWEST' | 'EAST' | 'MID-ATLANTIC' | 'CANADA' | 'JAPAN' | 'EUROPE';

export interface Resort {
    id: string;
    name: string;
    type: 'PARTNERS' | 'ALLIED';
    location: {
        country: string;
        city: string;
        coordinates: LatLngTuple;
    };
    stats: {
        vertical: string;
        trails: number;
        lifts: number;
        night: boolean;
        tParks: boolean;
    };
}

export interface MapViewProps {
    selectedRegion: RegionName;
    onRegionChange: (region: RegionName) => void;
    onViewChange: (view: 'map' | 'list') => void;
}

export interface ListViewProps {
    selectedRegion: RegionName;
    onRegionChange: (region: RegionName) => void;
    onViewChange: (view: 'map' | 'list') => void;
    resorts: Resort[];
}