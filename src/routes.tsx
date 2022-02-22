import React from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Planets } from "./views/Planets";
import { Starships } from "./views/Starships";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Planets /> },
      { path: "/starships", element: <Starships /> },
      { path: "/pleoples", element: <Planets /> },
      { path: "/vehicles", element: <Planets /> },
    ],
  },
];
