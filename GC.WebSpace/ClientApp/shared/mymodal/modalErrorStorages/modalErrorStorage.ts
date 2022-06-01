import { addErrorNotification } from "../../../tools/notifications";

export class ModalErrorStorage {
    private static Error: string | null;

    public static hasError = (): boolean => ModalErrorStorage.Error != null;

    public static setError = (error: string, showNotification: boolean = true) => {
        ModalErrorStorage.Error = error;
        if(showNotification) addErrorNotification(error);
    }

    public static setNullError = () => ModalErrorStorage.Error = null;
} 