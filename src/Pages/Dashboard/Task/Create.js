import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import FormButton from "../../../Components/Form/FormButton";
import InputField from "../../../Components/Form/InputField";
import Sidebar from "../../../Components/Layouts/Sidebar";
import { API_HOST } from "../../../config/constant";
import { validate } from "../../../Utils/Validator";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from 'ckeditor4-react';
import SelectField from "../../../Components/Form/SelectField";
import { useParams } from "react-router-dom";


export default function CreateTask() {
  
  const routeParams = useParams();
  const [form, setForm] = useState({
    project_id: routeParams.id,
    start_date: "",
    close_date: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    setForm({...form, description: description});
    // Validate Form
    const {isValid, errors} = validate(form, {
        start_date: ['required'],
        close_date: ['required'],
    });
    if(!description) errors['description'] = "Should not be Empty";

    setSubmitting(true);
    
    if(isValid){

        axios.post(API_HOST+"/tasks", form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                setErrors({});
                toast.success("Task Created Successfully!");
                setSubmitting(false);
            })
            .catch(err => {
                if(err.response && err.response.status === 422){
                  
                    setErrors(err.response.data.errors);

                }
                setSubmitting(false);
            });

    }else{
        setErrors(errors);
        setSubmitting(false);
    }

  }

  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <Sidebar></Sidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Create Project
              </h2>
            </div>
            <hr />
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                
                <InputField
                  id="start_date"
                  label="Start Date"
                  type="date"
                  name="start_date"
                  error={errors.start_date}
                  onInput={(value) => setForm({ ...form, start_date: value })}
                />

                <InputField
                  id="close_date"
                  label="Close Date"
                  type="date"
                  name="close_date"
                  error={errors.close_date}
                  onInput={(value) => setForm({ ...form, close_date: value })}
                />

                
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="description">
                      Description
                  </label>
                  <CKEditor
                      className="mb-4"
                      initData={form.description}
                      onChange={(e) => {
                          const data = e.editor.getData();
                          setDescription(data);
                      }}
                  />
                  {
                      errors.description && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {errors.description}
                      </span>
                  }
                </div>

                <div className="mt-6 text-center">
                  <FormButton
                    fullWidth={false}
                    buttonText="Create Task"
                    loading={submitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
