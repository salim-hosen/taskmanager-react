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
import Spinner from "../../../Components/Utils/Spinner";


export default function EditTask() {
  
  const routeParams = useParams();
  const [form, setForm] = useState({
    project_id: routeParams.id,
    close_date: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  function loadTask(){
    setLoading(true);
      axios.get(API_HOST+`/tasks/${routeParams.id}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
          .then(res => {
              setLoading(false);
              const project = res.data.data;
              setForm({...project});
          })
          .catch(err => {
            setLoading(false);
              console.log(err);
          });
  }

  useEffect(() => {
    loadTask();
  }, [])


  function handleSubmit(e) {
    e.preventDefault();

    // Validate Form
    const {isValid, errors} = validate(form, {
        close_date: ['required'],
    });

    setSubmitting(true);
    
    if(isValid){

        axios.put(`${API_HOST}/tasks/${routeParams.id}`, form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                setErrors({});
                toast.success("Task Updated Successfully!");
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
          {
            loading ?
            <div className="flex justify-center py-4">
                <Spinner></Spinner>
            </div>
            :
            <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Update Task
              </h2>
            </div>
            <hr />
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                
                <InputField
                  id="close_date"
                  label="Close Date"
                  type="date"
                  name="close_date"
                  initialValue={form.close_date}
                  error={errors.close_date}
                  onInput={(value) => setForm({ ...form, close_date: value })}
                />

                <SelectField
                  id="status"
                  label="Status"
                  name="status"
                  error={errors.status}
                  initialValue={form.status}
                  options={
                    [
                      {text: "Select Status", value: ""},
                      {text: "Complete", value: "Complete"},
                      {text: "Running", value: "Running"},
                      {text: "Pending", value: "Pending"},
                      {text: "Pause", value: "Pause"},
                    ]
                  }
                  onInput={(value) => setForm({ ...form, status: value })}
                />

                <div className="mt-6 text-center">
                  <FormButton
                    fullWidth={false}
                    buttonText="Update Task"
                    loading={submitting}
                  />
                </div>
              </form>
            </div>
          </div>
          }
          
        </main>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
