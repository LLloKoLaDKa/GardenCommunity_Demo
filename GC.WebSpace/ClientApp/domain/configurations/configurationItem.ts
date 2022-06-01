export class ConfigurationItem {
    constructor(
        public readonly key: string,
        public readonly value: string
    ) { }
}

export const toModel = (value: any): ConfigurationItem => {
    return new ConfigurationItem(value.key, value.value);
}