import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Layouts/Sidebar";

export default function Dashboard() {

  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <Sidebar></Sidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
            Dashboard
          </div>
        </main>
      </div>
    </Fragment>
  );
}
