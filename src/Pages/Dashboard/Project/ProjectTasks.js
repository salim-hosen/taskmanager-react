import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../Components/Layouts/Sidebar";
import Spinner from "../../../Components/Utils/Spinner";
import { API_HOST } from "../../../config/constant";
import parse from 'html-react-parser';
import moment from "moment";

export default function ProjectTasks() {

    const routeParams = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadTasks(){
        setLoading(true);
        axios.get(`${API_HOST}/project-tasks/${routeParams.id}`, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
                setTasks(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    async function handleSearch(e)
    {
      axios.get(`${API_HOST}/tasks?q=${e.target.value}`)
            .then(res => {
                setTasks(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadTasks();
    }, [])

  function deleteTask(id){

    if(!window.confirm("Are you Sure to Delete?")) return;

    axios.post(`${API_HOST}/tasks/${id}`, {_method: "DELETE"}, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
      .then(res => {
          loadTasks();
      })
      .catch(err => {
          console.log(err);
      });

  }
    
  return (
    <div className="flex flex-col mt-5">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="flex justify-end m-2">
                        <Link to={`/tasks/create/${routeParams.id}`} className="ml-5 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 transition">Create Task</Link>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
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
                            Start Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Close Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Complete
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
                          <td colSpan={5}>
                            <div className="flex justify-center py-3"><Spinner></Spinner></div>
                          </td>
                        </tr>
                          :
                          tasks.length > 0 ? 
                        tasks.map((task) => (
                          <tr key={task.id}>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {parse(task.description)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {moment(task.start_date).format("DD MMM YYYY") }
                              </div>
                            </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {moment(task.close_date).format("DD MMM YYYY") }
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {task.is_complete ? "Yes" : "No"}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {task.status}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/tasks/edit/${task.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </Link>
                              <Link
                                to="#"
                                onClick={() => deleteTask(task.id)}
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
                            <div className="p-5">No Task Found</div>
                          </td>
                        </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
  );
}
