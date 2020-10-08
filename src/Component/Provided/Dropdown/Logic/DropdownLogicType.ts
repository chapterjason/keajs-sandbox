import { MakeLogicType } from "kea";
import { DropdownItem } from "../../../Core/Dropdown/DropdownItem";

interface Values {
    items: DropdownItem[];

    rawSelected: string | null;

    selected: string | null;
}

interface Actions {
    set: (items: DropdownItem[]) => { items: DropdownItem[] };

    select: (value: string | null) => { value: string | null };
}

interface Props {
    id: string;
}

export type DropdownLogicType = MakeLogicType<Values, Actions, Props>;
