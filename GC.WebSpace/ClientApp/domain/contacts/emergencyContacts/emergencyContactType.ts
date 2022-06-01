import { Never } from "../../../tools/never";

export enum EmergencyContactType {
    FireDepartment = 1,
    Police = 2,
    Ambulance = 3,
    MinistryOfEmergencySituations = 4,
    LandCommittee = 5
}

export namespace EmergencyContactType {
    export function getDisplayName(type: EmergencyContactType): string {
        switch (type) {
            case EmergencyContactType.FireDepartment: return "Пожарная часть";
            case EmergencyContactType.Police: return "Полиция";
            case EmergencyContactType.Ambulance: return "Скорая помощь";
            case EmergencyContactType.MinistryOfEmergencySituations: return "МЧС";
            case EmergencyContactType.LandCommittee: return "Земельный комитет";

            default: throw new Never(type);
        }
    }
}