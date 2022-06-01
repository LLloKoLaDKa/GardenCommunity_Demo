import { Never } from "../../../tools/never";

export enum ForeignContactType {
    Electric = 1,
    LocalPoliceman = 2,
    Forester = 3
}

export namespace ForeignContactType {
    export function getDisplayName(type: ForeignContactType): string {
        switch (type) {
            case ForeignContactType.Electric: return "Электрик";
            case ForeignContactType.LocalPoliceman: return "Участковый";
            case ForeignContactType.Forester: return "Старший лесничий";

            default: throw new Never(type);
        }
    }
}