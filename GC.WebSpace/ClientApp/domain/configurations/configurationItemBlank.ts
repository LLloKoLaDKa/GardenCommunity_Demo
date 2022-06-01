import { ConfigurationItem } from "./configurationItem";

export class ConfigurationItemBlank {
    constructor(
        public key: string,
        public value: string
    ) { }

    public static get empty(): ConfigurationItemBlank {
        return new ConfigurationItemBlank('', '');
    }

    public static create(configurationItem: ConfigurationItem): ConfigurationItemBlank {
        return new ConfigurationItemBlank(configurationItem.key, configurationItem.value);
    }

    public get isValid(): Boolean{
        return this.key != null && this.value != null &&
            this.key != '' && this.value != '';
    }
}
