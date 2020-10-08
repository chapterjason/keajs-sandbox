import { StaticDropdown } from "./Component/Provided/Dropdown/Static/StaticDropdown";
import { EndpointDropdown } from "./Component/Provided/Dropdown/Endpoint/EndpointDropdown";
import { Customer } from "./Model/Customer";
import { CascadedDropdown } from "./Component/Provided/Dropdown/Cascaded/CascadedDropdown";
import { Contact } from "./Model/Contact";
import * as React from "react";
import { useState } from "react";
import { Dropdown } from "./Component/Core/Dropdown/Dropdown";

export function Application() {
    const [selected, setSelected] = useState("");

    const customers: Customer[] = [{
        id: "aaa",
        name: "Adler",
        contacts: [],
    }, {
        id: "bbb",
        name: "Blind",
        contacts: [],
    }];

    return (
        <div>
            {/* Basic Dropdown */}
            <Dropdown items={customers.map(item => ({text: item.name, value: item.id}))} selected={selected} onChange={setSelected}/>
            {/* Store Controlled Dropdown */}
            <StaticDropdown id={"dropdown1"} items={customers} converter={item => ({
                value: item.id,
                text: item.name,
            })}/>
            {/* Store Controlled Dropdown with endpoint */}
            <EndpointDropdown<Customer>
                id={"dropdown2"}
                endpoint={"http://localhost:3000/customers"}
                converter={item => ({ value: item.id, text: item.name })}
            />
            {/* Store Controlled Dropdown with endpoint which reacts to the value from another dropdown */}
            <CascadedDropdown<Contact>
                id={"dropdown3"}
                dropdownId={"dropdown2"}
                endpoint={value => "http://localhost:3000/customers/" + value + "/contacts"}
                converter={item => ({ value: item.id, text: item.firstname + " " + item.lastname })}
            />
        </div>
    );
}
