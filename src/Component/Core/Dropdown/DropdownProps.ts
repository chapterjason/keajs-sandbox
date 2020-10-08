import { DropdownItem } from "./DropdownItem";

export interface DropdownProps {
    items: DropdownItem[];

    selected: string;

    onChange: (value: string) => void;

    enabled?: boolean;
}
