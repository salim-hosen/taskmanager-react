import axios from "axios";
import moment from "moment";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../../Components/Form/FormButton";
import InputField from "../../../Components/Form/InputField";
import Sidebar from "../../../Components/Layouts/Sidebar";
import Spinner from "../../../Components/Utils/Spinner";
import { API_HOST } from "../../../config/constant";
import {connect} from 'react-redux'

function Index(props) {

  const {user} = props;

  const [form, setForm] = useState({
    start_date: "",
    close_date: "",
  });
    const [worksheets, setWorksheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [filtering, setFiltering] = useState(false);

    async function loadWorksheets(filter){
      
      let url = API_HOST+"/worksheets";
      if(filter) url += `?start_date=${form.start_date}&close_date=${form.close_date}`;

        setLoading(true);
        axios.get(url, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
              setWorksheets(res.data.data);
              setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }


    async function handleSearch(e)
    {
      axios.get(`${API_HOST}/worksheets?q=${e.target.value}`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
              setWorksheets(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadWorksheets();
    }, [])

  function deleteWorksheet(id){

    if(!window.confirm("Are you Sure to Delete?")) return;

    axios.post(`${API_HOST}/worksheets/${id}`, {_method: "DELETE"}, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
      .then(res => {
        loadWorksheets();
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
                  Worksheets 
                </h2>
                <div className="flex justify-between items-center mb-3">
                <div className="relative mx-auto text-gray-600">
                  <input onChange={handleSearch} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search"/>
                  <button type="submit" className="absolute right-0 top-0 mr-4 flex items-center justify-center" style={{ top: 8 }}>
                  <i className="uil uil-search"></i>
                  </button>
                </div>
                  {/* <Link to="/worksheets/create" className="ml-5 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 transition">Create Worksheet</Link> */}
                </div>
            </div>
            <hr />
            <div>
                <div className="mt-6 flex items-center">

                <InputField
                  id="start_date"
                  label="Start Date"
                  type="date"
                  name="start_date"
                  initialValue={form.start_date}
                  error={errors.start_date}
                  onInput={(value) => setForm({ ...form, start_date: value })}
                />
                <div className="mx-2"></div>
                <InputField
                  id="close_date"
                  label="Close Date"
                  type="date"
                  name="close_date"
                  initialValue={form.close_date}
                  error={errors.close_date}
                  onInput={(value) => setForm({ ...form, close_date: value })}
                />
                    <button type="button" onClick={() => loadWorksheets(true)} className={`mt-3 ml-3 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-80 transition`} >
                      Filter Result
                  </button>
                  <button type="button" onClick={() => {
                    setForm({...form, start_date: '', close_date: ''});
                    loadWorksheets(false);
                  }} className={`mt-3 ml-3 inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-80 transition`} >
                      Reset Filter
                  </button>
                  </div>
            
            </div>
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
                            Project
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Task
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Task Owner
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Note
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Time Spent
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                       
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { 
                        loading ? 
                        <tr>
                            <td colSpan={7}>
                              <div className="flex justify-center py-3">
                                <Spinner></Spinner>
                              </div>
                            </td>
                          </tr>
                        :
                        worksheets.length > 0 ? 
                        worksheets.map((worksheet) => (
                          <tr key={worksheet.id}>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {worksheet.project_name}
                              </div>
                            </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {worksheet.task_name}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {worksheet.username}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {worksheet.note}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {worksheet.time} Hours
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {moment(worksheet.date).format("DD MMM YYYY")} 
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {
                                user.id == worksheet.user_id &&
                                <Fragment>
                                  <Link
                                to={`/worksheets/edit/${worksheet.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </Link>
                              <Link
                                to="#"
                                onClick={() => deleteWorksheet(worksheet.id)}
                                className="text-red-600 hover:text-red-900 ml-5"
                              >
                                Delete
                              </Link>
                                </Fragment>
                              }
                            </td>
                          </tr>
                        )) 
                        :
                        <tr>
                          <td colSpan={4}>
                            <div className="p-5">No Worksheet Found</div>
                          </td>
                        </tr>
                        }
                      </tbody>
                    </table>
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



const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Index);