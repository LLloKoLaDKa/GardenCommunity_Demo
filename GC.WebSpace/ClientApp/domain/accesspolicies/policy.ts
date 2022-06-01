import { AccessPolicyPermission } from "./accessPolicyPermission";

export class Policy {
    constructor(
        public readonly key: string,
        public readonly display: string,
        public readonly blockKey: string,
        public readonly blockDisplayName: string,
        public readonly permissions: AccessPolicyPermission[]
    ) { }
}

export const mapToPolicy = (value: any): Policy => {
    return new Policy(value.key, value.display, value.blockKey, value.blockDisplayName, value.permissions);
}

export const mapToPolicies = (values: any[]): Policy[] => {
    return values.map(mapToPolicy);
}
