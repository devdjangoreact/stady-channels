// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

// ** Layouts
import Layout from "../layouts/Layout";

// ** Router imports
import { lazy } from "react";

// ** GetRoutes
import { getRoutes } from "./routes";

import ErrorPage from "../views/pages/ErrorPage";

//DashBoard
import DashBoard from "../features/DashBoard";
import Pyxtermjs from "../features/terminal/pyxtermjs";
import VNC from "../features/vnc/VNC";
import Term from "../features/term_execute/Term";
// //auth
// import { Login, PrivateRoute, Registration } from "../features/auth/components";

// //githab
// import {
//   GitFavouritesPage,
//   GitSearchPage,
// } from "../features/github/components";

// // codehelp
// import {
//   CategoryPage,
//   EditCategoryPost,
//   PostsPage,
// } from "../features/sections/components";

// // components
// import {
//   MainComponents,
//   ChildComponents,
// } from "../features/components/components";

const Router = () => {
  const routes = useRoutes([
    // {
    //   path: "/login",
    //   children: [{ path: "/login", element: <Login /> }],
    // },
    // {
    //   path: "/register",
    //   children: [{ path: "/register", element: <Registration /> }],
    // },

    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "dashboard", element: <DashBoard /> },
        {
          path: "terminal",
          element: <Pyxtermjs />,
        },
        {
          path: "vnc",
          element: <VNC />,
        },
        {
          path: "term_execute",
          element: <Term />,
        },
        // {
        //   path: "github",
        //   children: [
        //     { index: true, element: <GitSearchPage /> },
        //     { path: "favourites", element: <GitFavouritesPage /> },
        //   ],
        // },

        // {
        //   path: ":slug_mini",
        //   children: [
        //     { index: true, element: <CategoryPage /> },
        //     {
        //       path: ":slug",
        //       children: [
        //         { index: true, element: <PostsPage /> },
        //         {
        //           path: "post",
        //           element: <PostsPage />,
        //         },
        //       ],
        //     },
        //     { path: ":categoryId/edit", element: <EditCategoryPost /> },
        //     { path: "create", element: <EditCategoryPost /> },
        //   ],
        // },

        // {
        //   path: "components",
        //   children: [
        //     { index: true, element: <MainComponents /> },
        //     { path: "scrollspy", element: <ChildComponents /> },
        //   ],
        // },
      ],
    },

    // {
    //   path: "*",
    //   element: <Layout />,
    //   children: [{ path: "*", element: <Error /> }],
    // },
    // ...allRoutes,
  ]);

  return routes;
};

export default Router;
