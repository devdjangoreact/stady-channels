import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

// import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { BsGithub } from "react-icons/bs";
import { FiChevronsUp, FiClipboard, FiDatabase } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
// import ModalCenter from "./ui-components/modals/ModalCenter";
import { useStateContext } from "../contexts/ContextProvider";
// import { getCategorySlug } from "../features/sections/categorySlite";
import { FaRegEdit } from "react-icons/fa";

export function SideBar() {
  const { setShowModal } = useStateContext();

  // const dispatch = useAppDispatch();
  const params = useParams();
  const [category_sidebars, setCategory_sidebar] = useState<any | null>(null);

  // const { categorysDepth, deleteSuccess, updateSuccess, createSuccess } =
  //   useAppSelector((state) => state.category);

  // const getCategory_sidebar = () => {
  //   categorysDepth?.forEach((category) => {
  //     Object.entries(category).forEach(([key, value]) => {
  //       if (key === "slug" && value === params.slug_mini) {
  //         setCategory_sidebar(category?.children);
  //       }
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getCategory_sidebar();
  //   if (params.slug !== undefined)
  //     dispatch(getCategorySlug(String(params.slug)));
  // }, [
  //   dispatch,
  //   deleteSuccess,
  //   updateSuccess,
  //   createSuccess,
  //   categorysDepth,
  //   params,
  // ]);

  return (
    <div className="mr-1 max-w-[280px] min-w-[220px] bg-slate-300 h-full rounded-lg border overflow-y-scroll no-scrollbar">
      <div className="flex flex-col justify-between h-[calc(100%-0px)] bg-blue-50">
        {/* <ModalCenter title="Create category" /> */}
        <div className="px-1 py-2 text-center">
          <div className="flex w-full text-center">
            <Link
              className="text-xl w-3/4 p-1 pr-2 text-center text-blue-600"
              to={"/"}
            >
              <span className="block h-10 pt-1 bg-gray-200 rounded-lg">
                Solution
              </span>
            </Link>
            <div className="flex justify-between rounded-full w-1/4  items-center p-1 text-center text-white">
              <button
                className=" bg-rose-500 rounded-full hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
                onClick={() => setShowModal(true)}
              >
                <MdAddCircleOutline className="w-10 h-10 p-1" />
              </button>
            </div>
          </div>

          <nav aria-label="Main Nav" className="flex flex-col mt-5 space-y-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="/terminal"
                  className="flex items-center p-2 space-x-3 rounded-md bg-slate-100 hover:bg-orange-50"
                >
                  <span>terminal</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/vnc"
                  className="flex items-center p-2 space-x-3 rounded-md bg-slate-100 hover:bg-orange-50"
                >
                  <span>VNC</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/term_execute"
                  className="flex items-center p-2 space-x-3 rounded-md bg-slate-100 hover:bg-orange-50"
                >
                  <span>Term_execute</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/xterm"
                  className="flex items-center p-2 space-x-3 rounded-md bg-slate-100 hover:bg-orange-50"
                >
                  <span>Xterm</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="sticky inset-x-0 rounded-lg border border-gray-100">
          <a
            href="#"
            className="flex items-center p-2 pb-3 hover:bg-orange-300 border shrink-0 rounded-lg"
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="object-cover w-10 h-10 rounded-full"
            />

            <div className="ml-1.5">
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
