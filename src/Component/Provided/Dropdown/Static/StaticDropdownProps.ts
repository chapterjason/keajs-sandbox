import { DropdownItem } from "../../../Core/Dropdown/DropdownItem";
import { ConverterType } from "../../ConverterType";

export interface StaticDropdownProps<Type> {
    id: string;

    items: Type[];

    converter: ConverterType<Type, DropdownItem>;
}
