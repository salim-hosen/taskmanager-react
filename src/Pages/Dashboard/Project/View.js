import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FormButton from "../../../Components/Form/FormButton";
import InputField from "../../../Components/Form/InputField";
import Sidebar from "../../../Components/Layouts/Sidebar";
import { API_HOST } from "../../../config/constant";
import { validate } from "../../../Utils/Validator";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from 'ckeditor4-react';
import SelectField from "../../../Components/Form/SelectField";
import Spinner from "../../../Components/Utils/Spinner";
import Tabs from "../../../Components/Utils/Tabs";
import Dashboard from "./Dashboard";
import ProjectTasks from "./ProjectTasks";

export default function ViewProject() {

    const routeParams = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("dashboard");

   function loadProject(){
        setLoading(true);
        axios.get(API_HOST+`/projects/${routeParams.id}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                const project = res.data.data;
                setProject({...project});
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }

  useEffect(() => {
    loadProject();
  }, [])


  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <Sidebar></Sidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          {
              loading ?
              <div className="flex justify-center py-4">
                  <Spinner></Spinner>
              </div>
              :
              <div className="w-full h-full rounded border-gray-300 p-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-600 pb-2">
                    {project.name}
                    </h2>
                </div>
                <hr />
                <div>
                    <ul className="flex my-2">
                        <li onClick={()=>setTab("dashboard")} className={`${tab === "dashboard" && 'bg-indigo-900  text-white'} py-2 px-3 rounded-md cursor-pointer`}>Dashboard</li>
                        <li onClick={()=>setTab("task")} className={`${tab === "task" && 'bg-indigo-900  text-white'} py-2 px-3 rounded-md ml-3 cursor-pointer`}>Tasks</li>
                    </ul>
                    <div>
                        {
                            tab === "dashboard" ?
                            <Dashboard></Dashboard>
                            :
                            <ProjectTasks></ProjectTasks>
                        }
                    </div>
                </div>
            </div>
          }
        </main>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
