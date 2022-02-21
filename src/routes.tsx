import React from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Planets } from "./views/Planets";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Planets /> },
      { path: "/starships", element: <Planets /> },
      { path: "/pleoples", element: <Planets /> },
      { path: "/vehicles", element: <Planets /> },
    ],
  },
];
