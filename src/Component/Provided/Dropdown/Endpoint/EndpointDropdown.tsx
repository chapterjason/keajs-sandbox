import { DropdownLogic } from "../Logic/DropdownLogic";
import { useActions, useValues } from "kea";
import * as React from "react";
import { useEffect } from "react";
import { Dropdown } from "../../../Core/Dropdown/Dropdown";
import { EndpointDataProviderLogic, EndpointDataProviderLogicBuilt } from "../../../Core/DataProvider/EndpointDataProviderLogic";
import { EndpointDropdownProps } from "./EndpointDropdownProps";

export function EndpointDropdown<Type>(props: EndpointDropdownProps<Type>) {
    const { id, endpoint, converter } = props;
    const dropdownLogic = DropdownLogic({ id });
    const providerLogic = EndpointDataProviderLogic({ id }) as EndpointDataProviderLogicBuilt<Type[]>;

    const { setEndpoint } = useActions(providerLogic);
    const { data, isLoading } = useValues(providerLogic);
    const { select, set } = useActions(dropdownLogic);
    const { items, selected } = useValues(dropdownLogic);

    useEffect(() => {
        if (endpoint) {
            setEndpoint(endpoint);
        }
    }, [endpoint]);

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
