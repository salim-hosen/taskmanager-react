import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../../../Components/Utils/Spinner";
import { API_HOST } from '../../../config/constant';

export default function Dashboard() {

    const routeParams = useParams();
    const [dashboard, setDashboard] = useState({});
    const [loading, setLoading] = useState(false);
  
    // Load Projects
    async function loadDashboard() {
      setLoading(true);
  
      axios
        .get(`${API_HOST}/project-dashboard/${routeParams.id}`, {
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
        loading ? 
        <div className="flex justify-center my-4">
                <Spinner></Spinner>
              </div>
              :
        <div className="grid grid-cols-3 gap-4 mt-5">
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
    )
}
