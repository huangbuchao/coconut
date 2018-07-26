
import React from "react";
import ReactDOM from "react-dom";
import { App, Game } from "./App.js";

function clock() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

setInterval(clock, 1000);
