import { Contact } from "./Contact";

export interface Customer {
    id: string;

    name: string;

    contacts: Contact[];
}
