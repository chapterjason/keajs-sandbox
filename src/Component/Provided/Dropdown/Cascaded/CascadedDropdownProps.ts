import { ConverterType } from "../../ConverterType";
import { DropdownItem } from "../../../Core/Dropdown/DropdownItem";

export interface CascadedDropdownProps<Type> {
    id: string;

    dropdownId: string;

    endpoint: (value: string) => string;

    converter: ConverterType<Type, DropdownItem>;
}
