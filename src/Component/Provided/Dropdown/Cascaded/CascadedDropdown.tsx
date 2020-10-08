import { DropdownLogic } from "../Logic/DropdownLogic";
import { useActions, useValues } from "kea";
import * as React from "react";
import { useEffect } from "react";
import { Dropdown } from "../../../Core/Dropdown/Dropdown";
import { EndpointDataProviderLogic, EndpointDataProviderLogicBuilt } from "../../../Core/DataProvider/EndpointDataProviderLogic";
import { CascadedDropdownProps } from "./CascadedDropdownProps";

export function CascadedDropdown<Type>(props: CascadedDropdownProps<Type>) {
    const { id, endpoint, converter, dropdownId } = props;
    const parentDropdownLogic = DropdownLogic({ id: dropdownId });
    const dropdownLogic = DropdownLogic({ id });
    const providerLogic = EndpointDataProviderLogic({ id }) as EndpointDataProviderLogicBuilt<Type[]>;

    const { selected: parentValue, items: parentItems } = useValues(parentDropdownLogic);

    const { setEndpoint } = useActions(providerLogic);
    const { data, isLoading, error } = useValues(providerLogic);
    const { select, set } = useActions(dropdownLogic);
    const { items, selected } = useValues(dropdownLogic);

    useEffect(() => {
        if (endpoint && parentValue) {
            setEndpoint(endpoint(parentValue));
        }
    }, [endpoint, parentValue]);

    useEffect(() => {
        if (data) {
            set(data.map(converter));
        }
    }, [data]);

    function handleChange(value: string) {
        select(value);
    }

    return (
        <Dropdown items={items} enabled={!isLoading} selected={selected ?? ""} onChange={handleChange}/>
    );
}
