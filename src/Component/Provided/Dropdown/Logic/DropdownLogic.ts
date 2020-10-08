import { kea } from "kea";
import { DropdownLogicType } from "./DropdownLogicType";
import { DropdownItem } from "../../../Core/Dropdown/DropdownItem";

export const DropdownLogic = kea<DropdownLogicType>({
    key: props => props.id,
    actions: {
        set: (items) => ({ items }),
        select: (value) => ({ value }),
    },
    reducers: {
        items: [[], {
            set: (_, { items }) => [...items],
        }],
        rawSelected: [null, {
            select: (_, { value }) => value,
        }],
    },
    selectors: {
        selected: [
            (selectors) => [selectors.items, selectors.rawSelected],
            (items: DropdownItem[], value: string | null) => {
                if (value && items.find(item => item.value === value)) {
                    return value ?? null;
                }

                if (items.length > 0) {
                    return [...items].shift().value ?? null;
                }

                return null;
            },
        ],
    },
});
