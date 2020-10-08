import * as ReactDOM from "react-dom";
import * as React from "react";
import { getContext, resetContext } from "kea";
import { Provider } from "react-redux";
import { Application } from "./Application";

function runtime() {
    resetContext({
        createStore: {
            // options for redux (e.g. middleware, reducers, ...)
        },
        plugins: [
            // additional kea plugins
        ],
    });

    const root = document.getElementById("root");

    ReactDOM.render((
        <Provider store={getContext().store}>
            <Application/>
        </Provider>
    ), root);
}

(function () {
    runtime();
})();
