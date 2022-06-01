import { HttpClient } from "../../tools/httpClient";
import { ContactLinks } from "../../tools/links";
import { mapToResult, Result } from "../../tools/result";
import { AllContacts } from "./allContacts";
import { AllContactsBlank } from './allContactsBlank';

export namespace ContactsProvider {
    export async function saveContacts(contacts: AllContactsBlank): Promise<Result<string | null>> {
        const result = await HttpClient.postAsync(ContactLinks.save, contacts);
        return mapToResult(result);
    }

    export async function getAllContacts(): Promise<AllContacts> {
        const contacts = await HttpClient.getAsync(ContactLinks.getAll);
        return AllContacts.toModel(contacts);
    }
}