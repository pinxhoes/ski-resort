import { Resort } from '@/types';
import { LatLngTuple } from 'leaflet';

export const resorts: Resort[] = [
    {
        id: 'baqueira',
        name: 'BAQUEIRA/BERET',
        type: 'PARTNERS',
        location: {
            country: 'Spain',
            city: 'Baqueira',
            coordinates: [42.6988, 0.9551] as LatLngTuple
        },
        stats: {
            vertical: '3608ft',
            trails: 122,
            lifts: 36,
            night: false,
            tParks: true
        }
    },
    {
        id: 'erciyes',
        name: 'ERCIYES SKI RESORT',
        type: 'PARTNERS',
        location: {
            country: 'Turkey',
            city: 'Melikgazi/Kayseri',
            coordinates: [38.5362, 35.5213] as LatLngTuple
        },
        stats: {
            vertical: '1260ft',
            trails: 31,
            lifts: 24,
            night: true,
            tParks: false
        }
    },
    {
        id: 'glencoe',
        name: 'GLENCOE MOUNTAIN RESORT',
        type: 'ALLIED',
        location: {
            country: 'Scotland',
            city: 'Glencoe',
            coordinates: [56.6325, -4.8132] as LatLngTuple
        },
        stats: {
            vertical: '2388ft',
            trails: 20,
            lifts: 8,
            night: false,
            tParks: false
        }
    },
    {
        id: 'innsbruck',
        name: 'INNSBRUCK SKI & CITY NETWORK',
        type: 'PARTNERS',
        location: {
            country: 'Austria',
            city: 'Innsbruck',
            coordinates: [47.2692, 13.1275] as LatLngTuple
        },
        stats: {
            vertical: '3200ft',
            trails: 85,
            lifts: 28,
            night: true,
            tParks: true
        }
    },
    {
        id: 'mala',
        name: 'MALá ÚPA RESORT',
        type: 'ALLIED',
        location: {
            country: 'Czech Republic',
            city: 'Malá Úpa',
            coordinates: [50.7325, 15.1741] as LatLngTuple
        },
        stats: {
            vertical: '1850ft',
            trails: 45,
            lifts: 15,
            night: true,
            tParks: true
        }
    },
    {
        id: 'skiwelt',
        name: 'SKIWELT',
        type: 'PARTNERS',
        location: {
            country: 'Austria',
            city: 'Kufstein',
            coordinates: [46.0207, 7.7491] as LatLngTuple
        },
        stats: {
            vertical: '4200ft',
            trails: 95,
            lifts: 32,
            night: false,
            tParks: true
        }
    }
];