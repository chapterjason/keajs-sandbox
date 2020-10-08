import { ConverterType } from "../../ConverterType";
import { DropdownItem } from "../../../Core/Dropdown/DropdownItem";

export interface EndpointDropdownProps<Type> {
    id: string;

    endpoint: string;

    converter: ConverterType<Type, DropdownItem>;
}
