import * as ReactDOM from "react-dom";
import * as React from "react";
import { getContext, resetContext } from "kea";
import { Provider } from "react-redux";
import { StaticDropdown } from "./Component/Provided/Dropdown/Static/StaticDropdown";
import { Customer } from "./Model/Customer";
import { EndpointDropdown } from "./Component/Provided/Dropdown/Endpoint/EndpointDropdown";
import { CascadedDropdown } from "./Component/Provided/Dropdown/CascadedDropdown/CascadedDropdown";
import { Contact } from "./Model/Contact";
import { Dropdown } from "./Component/Core/Dropdown/Dropdown";
import { useState } from "react";

function runtime() {
    resetContext({
        createStore: {
            // options for redux (e.g. middleware, reducers, ...)
        },
        plugins: [
            // additional kea plugins
        ],
    });

    const node1 = document.getElementById("node1");
    const node2 = document.getElementById("node2");
    const node3 = document.getElementById("node3");
    const node4 = document.getElementById("node4");
    const node5 = document.getElementById("node5");

    const customers: Customer[] = [{
        id: "aaa",
        name: "Adler",
        contacts: [],
    }, {
        id: "bbb",
        name: "Blind",
        contacts: [],
    }];

    ReactDOM.render((
        <Provider store={getContext().store}>
            {/* Basic Dropdown */}
            {/*<Dropdown items={customers.map(item => ({text: item.name, value: item.id}))} selected={selected} onChange={setSelected}/>*/}
            {/* Store Controlled Dropdown */}
            <StaticDropdown id={"dropdown1"} items={customers} converter={item => ({ value: item.id, text: item.name })}/>
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
        </Provider>
    ), node1);
}

(function () {
    runtime();
})();
