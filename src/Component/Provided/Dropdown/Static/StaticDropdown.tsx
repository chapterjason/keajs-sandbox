import * as React from "react";
import { useEffect } from "react";
import { Dropdown } from "../../../Core/Dropdown/Dropdown";
import { DropdownLogic } from "../Logic/DropdownLogic";
import { useActions, useValues } from "kea";
import { StaticDropdownProps } from "./StaticDropdownProps";

export function StaticDropdown<Type>(props: StaticDropdownProps<Type>) {
    const { id, converter } = props;
    const dropdownLogic = DropdownLogic({ id });

    const { select, set } = useActions(dropdownLogic);
    const { items, selected } = useValues(dropdownLogic);

    useEffect(() => {
        set(props.items.map(converter));
    }, [props.items]);

    function handleChange(value: string) {
        select(value);
    }

    return (
        <Dropdown items={items} selected={selected ?? ""} onChange={handleChange}/>
    );
}
