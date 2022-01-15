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

export default function EditProject() {

    const routeParams = useParams();
    const [form, setForm] = useState({
      name: "",
      description: "",
      manager: "",
      status: '',
    });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState("");


   function loadProject(){
    setLoading(true);
        axios.get(API_HOST+`/projects/${routeParams.id}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                const project = res.data.data;
                setForm({...project});
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

  useEffect(() => {
    loadProject();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    setForm({...form, description: description});
    // Validate Form
    const {isValid, errors} = validate(form, {
        name: ['required'],
        status: ['required'],
    });
    if(!description) errors['description'] = "Should not be Empty";

    setSubmitting(true);
    
    if(isValid){

        axios.put(`${API_HOST}/projects/${routeParams.id}`, form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                setErrors({});
                toast.success("Project Updated Successfully!");
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
                Edit Product
              </h2>
            </div>
            <hr />
            {
              loading ? 
<div className="flex justify-center my-5">
    <Spinner></Spinner>
</div>
              :
              <div className="mt-5">
              <form onSubmit={handleSubmit}>
                
              <InputField
                  id="name"
                  label="Project Name"
                  type="text"
                  name="name"
                  error={errors.name}
                  initialValue={form.name}
                  onInput={(value) => setForm({ ...form, name: value })}
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

                <SelectField
                  id="status"
                  label="Status"
                  name="status"
                  error={errors.status}
                  initialValue={form.status}
                  options={
                    [
                      {text: "Select Status", value: ""},
                      {text: "Pending", value: "Pending"},
                      {text: "On Progress", value: "On Progress"},
                      {text: "Completed", value: "Completed"},
                    ]
                  }
                  onInput={(value) => setForm({ ...form, status: value })}
                />

                <div className="mt-6 text-center">
                  <FormButton
                    fullWidth={false}
                    buttonText="Update Project"
                    loading={submitting}
                  />
                </div>
              </form>
            </div>
            }
          </div>
        </main>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
