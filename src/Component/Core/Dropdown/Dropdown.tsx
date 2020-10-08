import * as React from "react";
import { DropdownProps } from "./DropdownProps";

export function Dropdown(props: DropdownProps) {
    const { items, selected, onChange, enabled = true } = props;

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onChange(event.currentTarget.value);
    }

    return (
        <div className={"dropdown"}>
            <select value={selected} disabled={!enabled} onChange={handleChange}>
                {items.map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
            </select>
        </div>
    );
}
