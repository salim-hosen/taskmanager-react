import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Layouts/Sidebar";
import Pagination from "../../Components/Utils/Pagination";
import Spinner from "../../Components/Utils/Spinner";
import parse from "html-react-parser";
import { API_HOST } from "../../config/constant";


export default function Dashboard() {

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);

  // Load Projects
  async function loadDashboard() {
    setLoading(true);

    axios
      .get(API_HOST + "/dashboard", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <Sidebar></Sidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Dashboard
              </h2>
            </div>
            <hr />
            {
              loading ? 
              <div className="flex justify-center my-4">
                <Spinner></Spinner>
              </div>
              :
              <div className="flex flex-col mt-5">
              <div className="grid grid-cols-2 gap-4">
                    <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
                      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto">
                          <p className="font-bold">Total Projects</p>
                          <p className="text-lg">{dashboard.totalProjects}</p>
                        </div>
                        <div className="my-auto">
                          <i className="uil uil-file-graph text-2xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
                      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto">
                          <p className="font-bold">Completed Projects</p>
                          <p className="text-lg">{dashboard.completedProjects}</p>
                        </div>
                        <div className="my-auto">
                          <i className="uil uil-file-graph text-2xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
                      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto">
                          <p className="font-bold">Total Task</p>
                          <p className="text-lg">{dashboard.totalTasks}</p>
                        </div>
                        <div className="my-auto">
                          <i className="uil uil-file-graph text-2xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
                      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto">
                          <p className="font-bold">Completed Task</p>
                          <p className="text-lg">{dashboard.completedTasks}</p>
                        </div>
                        <div className="my-auto">
                          <i className="uil uil-file-graph text-2xl"></i>
                        </div>
                      </div>
                    </div>
                    <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
                      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                        <div className="my-auto">
                          <p className="font-bold">Total Working Hours</p>
                          <p className="text-lg">{dashboard.totalWorkingHours}</p>
                        </div>
                        <div className="my-auto">
                          <i className="uil uil-file-graph text-2xl"></i>
                        </div>
                      </div>
                    </div>
              </div>
              <div>
                
              </div>
            </div>
            }
          </div>
        </main>
      </div>
    </Fragment>
  );
}
