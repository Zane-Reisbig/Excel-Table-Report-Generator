import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Home from "./Components/Home/Home";
import Wizard from "./Components/Wizard/Wizard";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/wizard",
        element: <Wizard />,
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
