import { Never } from "../../../tools/never";

export enum GardenContactType {
    Chairman = 1,
    SeniorOnStreet = 2,
    Accountant = 3
}

export namespace GardenContactType {
    export function getDisplayName(type: GardenContactType): string {
        switch (type) {
            case GardenContactType.Chairman: return "Председатель";
            case GardenContactType.SeniorOnStreet: return "Старший улицы";
            case GardenContactType.Accountant: return "Бухгалтер";

            default: throw new Never(type);
        }
    }
}