import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Components/Layouts/Sidebar";
import Pagination from "../../../Components/Utils/Pagination";
import Spinner from "../../../Components/Utils/Spinner";
import { API_HOST } from "../../../config/constant";
import parse from 'html-react-parser';

export default function Index() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load Projects
    async function loadProjects(){

        setLoading(true);

        axios.get(API_HOST+"/projects", {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
              setProjects(res.data.data);
              setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }

    // Search Project
    async function handleSearch(e)
    {
      axios.get(`${API_HOST}/projects?q=${e.target.value}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                setProjects(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadProjects();
    }, [])


    // Delete Projec
  function deleteProject(id){

    if(!window.confirm("Are you Sure to Delete?")) return;

    axios.post(`${API_HOST}/projects/${id}`, {_method: "DELETE"}, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
      .then(res => {
        loadProjects();
      })
      .catch(err => {
          console.log(err);
      });

  }
    
  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <Sidebar></Sidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Project List
                </h2>
                <div className="flex justify-between items-center mb-3">
                <div className="relative mx-auto text-gray-600">
                  <input onChange={handleSearch} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search"/>
                  <button type="submit" className="absolute right-0 top-0 mr-4 flex items-center justify-center" style={{ top: 8 }}>
                  <i className="uil uil-search"></i>
                  </button>
                </div>
                  <Link to="/projects/create" className="ml-5 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 transition">Create Project</Link>
                </div>
            </div>
            <hr />
            <div className="flex flex-col mt-5">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                       
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { 
                          loading ? <tr>
                            <td colSpan={4}>
                              <div className="flex justify-center py-3"><Spinner></Spinner></div>
                            </td>
                          </tr>
                          :
                          projects.length > 0 ? 
                        projects.map((project) => (
                          <tr key={project.id}>
                           
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {project.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {parse(project.description)}
                              </div>
                            </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {project.status}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/projects/view/${project.id}`}
                                className="text-cyan-600 hover:text-cyan-900"
                              >
                                View
                              </Link>
                              <Link
                                to={`/projects/edit/${project.id}`}
                                className="text-indigo-600 hover:text-indigo-900 ml-5"
                              >
                                Edit
                              </Link>
                              <Link
                                to="#"
                                onClick={() => deleteProject(project.id)}
                                className="text-red-600 hover:text-red-900 ml-5"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        )) 
                        :
                        <tr>
                          <td colSpan={4}>
                            <div className="p-5">No Project Found</div>
                          </td>
                        </tr>
                        }
                      </tbody>
                    </table>
                    <Pagination></Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
