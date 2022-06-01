import { Never } from "../../tools/never";
import { GardenSector } from "./gardenSectors/gardenSector";

export enum GardenStreet {
    First = 1,
    Second = 2,
    Third = 3,
    Fourth = 4,
    Fifth = 5,
    Sixth = 6,
    Seventh = 7,
    Eighth = 8,
    Nineth = 9,
    Tenth = 10,
    Eleven = 11,
}

export namespace GardenStreet {
    export function getDisplayName(street: GardenStreet) {
        switch (street) {
            case GardenStreet.First: return "1-ая Полесьенская";
            case GardenStreet.Second: return "2-ая Полесьенская";
            case GardenStreet.Third: return "3-ая Полесьенская";
            case GardenStreet.Fourth: return "4-ая Полесьенская";
            case GardenStreet.Fifth: return "5-ая Полесьенская";
            case GardenStreet.Sixth: return "6-ая Полесьенская";
            case GardenStreet.Seventh: return "7-ая Полесьенская";
            case GardenStreet.Eighth: return "8-ая Полесьенская";
            case GardenStreet.Nineth: return "9-ая Полесьенская";
            case GardenStreet.Tenth: return "10-ая Полесьенская";
            case GardenStreet.Eleven: return "11-ая Полесьенская";

            default: throw new Never(street);
        }
    }

    export function getAll(): GardenStreet[] {
        return Object.keys(GardenStreet)
            .filter(v => isNaN(Number(v)) === false)
            .map(key => Number(key) as GardenStreet);
    }

    export function sectorMatchStreet(street: GardenStreet, sector: GardenSector): boolean {
        switch (street) {
            case GardenStreet.First: return between(sector.sectorNumber, 1, 23);
            case GardenStreet.Second: return between(sector.sectorNumber, 24, 36);
            case GardenStreet.Third: return between(sector.sectorNumber, 37, 47);
            case GardenStreet.Fourth: return between(sector.sectorNumber, 48, 63);
            case GardenStreet.Fifth: return between(sector.sectorNumber, 64, 80);
            case GardenStreet.Sixth: return between(sector.sectorNumber, 82, 97);
            case GardenStreet.Seventh: return between(sector.sectorNumber, 98, 111);
            case GardenStreet.Eighth: return between(sector.sectorNumber, 112, 127);
            case GardenStreet.Nineth: return between(sector.sectorNumber, 128, 136) || sector.sectorNumber == 138 || sector.sectorNumber == 139;
            case GardenStreet.Tenth: return between(sector.sectorNumber, 140, 149);
            case GardenStreet.Eleven: return between(sector.sectorNumber, 150, 190) || sector.sectorNumber == 137;

            default: throw new Never(street);
        }
    }

    export function getSectoRangeForStreet(street: GardenStreet) {
        switch (street) {
            case GardenStreet.First: return 'от 1 до 23 участка';
            case GardenStreet.Second: return 'от 24 до 36 участка';
            case GardenStreet.Third: return 'от 37 до 47 участка';
            case GardenStreet.Fourth: return 'от 48 до 63 участка';
            case GardenStreet.Fifth: return 'от 64 до 80 участка';
            case GardenStreet.Sixth: return 'от 82 до 97 участка';
            case GardenStreet.Seventh: return 'от 98 до 111 участка';
            case GardenStreet.Eighth: return 'от 112 до 127 участка';
            case GardenStreet.Nineth: return 'от 128 до 136 участка (+  участки 138 и 139)';
            case GardenStreet.Tenth: return 'от 140 до 149 участка';
            case GardenStreet.Eleven: return 'от 150 до 190 участка (+ участок 137)';

            default: throw new Never(street);
        }
    }

    export function getDisplayNameBySectorNumber(sectorNumber: number | undefined): string | null {
        if (sectorNumber == undefined) return null;

        const street = GardenStreet.findStreetBySectroNumber(sectorNumber);
        if (street == null) return null;

        return GardenStreet.getDisplayName(street);
    }

    export function findStreetBySectroNumber(sectorNumber: number | null): GardenStreet | null {
        if (sectorNumber == null) return null;

        if (1 <= sectorNumber && sectorNumber <= 23) return GardenStreet.First;
        if (24 <= sectorNumber && sectorNumber <= 36) return GardenStreet.Second;
        if (37 <= sectorNumber && sectorNumber <= 47) return GardenStreet.Third;
        if (48 <= sectorNumber && sectorNumber <= 63) return GardenStreet.Fourth;
        if (64 <= sectorNumber && sectorNumber <= 80) return GardenStreet.Fifth;
        if (82 <= sectorNumber && sectorNumber <= 97) return GardenStreet.Sixth;
        if (98 <= sectorNumber && sectorNumber <= 111) return GardenStreet.Seventh;
        if (112 <= sectorNumber && sectorNumber <= 127) return GardenStreet.Eighth;
        if ((128 <= sectorNumber && sectorNumber <= 136) || sectorNumber == 138 || sectorNumber == 139) return GardenStreet.Nineth;
        if (140 <= sectorNumber && sectorNumber <= 149) return GardenStreet.Tenth;
        if ((150 <= sectorNumber && sectorNumber <= 190) || sectorNumber == 137) return GardenStreet.Eleven;

        return null;
    }


    export function getNumbersForStreet(street: GardenStreet): number[] {
        switch (street) {
            case GardenStreet.First: return range(1, 24);
            case GardenStreet.Second: return range(25, 36);
            case GardenStreet.Third: return range(37, 47);
            case GardenStreet.Fourth: return range(48, 63);
            case GardenStreet.Fifth: return range(64, 80);
            case GardenStreet.Sixth: return range(82, 97);
            case GardenStreet.Seventh: return range(98, 111);
            case GardenStreet.Eighth: return range(112, 127);
            case GardenStreet.Nineth: return range(128, 136).concat([138, 139]);
            case GardenStreet.Tenth: return range(140, 149);
            case GardenStreet.Eleven: return range(150, 190).concat([137]);

            default: throw new Never(street);
        }
    }

    function between(x: number, min: number, max: number): boolean {
        return x >= min && x <= max + 1;
    }

    function range(start: number, end: number): number[] {
        return Array.from({ length: (end - start + 1) }, (v, k) => k + start);
    }
}