import { GardenContact } from "../../contacts/gardenContacts/gardenContact";

export class GardenSettings {
    constructor(
        public readonly memberContribution: number,
        public readonly targetContribution: number,
        public readonly ogrn: number,
        public readonly inn: number,
        public readonly kpp: number,
        public readonly okpo: number,
        public readonly oktmo: number,
        public readonly checkingAccount: string,
        public readonly bankName: string,
        public readonly coresspondentAccount: string,
        public readonly address: string,
        public readonly bik: number,
        public readonly chairman: GardenContact | null
    ) { }
}

export namespace GardenSettings {
    export function toModel(data: any): GardenSettings {
        return new GardenSettings(Number(data.memberContribution), Number(data.targetContribution), Number(data.ogrn),
            Number(data.inn), Number(data.kpp), Number(data.okpo), Number(data.oktmo), data.checkingAccount,
            data.bankName, data.coresspondentAccount, data.address, Number(data.bik), data.chairman == null ? null : GardenContact.toModel(data.chairman));
    }
}