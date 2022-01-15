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
import TextArea from "../../../Components/Form/TextArea";


export default function EditUser() {
  
  const routeParams = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
    status: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function loadUser(){
    setLoading(true);
      axios.get(API_HOST+`/users/${routeParams.id}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
          .then(res => {
              setLoading(false);
              const user = res.data.data;
              setForm({...user});
          })
          .catch(err => {
            setLoading(false);
              console.log(err);
          });
  }

  useEffect(() => {
    loadUser();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const rules = {
      name: ['required'],
      email: ['required', 'email'],
      role: ['required'],
      status:  ['required']
    }

    if(form.password){
      rules.password = ['required', {minLength: 8}];
      rules.password_confirmation = [{match: form.password}];
    };

    // Validate Form
    const {isValid, errors} = validate(form, rules);

    setSubmitting(true);
    
    if(isValid){

        axios.put(`${API_HOST}/users/${routeParams.id}`, form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
            .then(res => {
                setErrors({});
                toast.success("User Updated Successfully!");
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
                Edit User
              </h2>
            </div>
            <hr />
            <div className="mt-5">
              <form onSubmit={handleSubmit}>

              <InputField
              id="name"
              label="Name"
              type="text"
              name="name"
              initialValue={form.name}
              error={errors.name}
              onInput={(value) => setForm({ ...form, name: value })}
            ></InputField>
                
              <InputField
                  id="email"
                  label="Email-Address"
                  type="text"
                  name="email"
                  initialValue={form.email}
                  error={errors.email}
                  onInput={(value) => setForm({...form, email: value})}
              >
                
              </InputField>
              

              <InputField
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  error={errors.password}
                  onInput={(value) => setForm({...form, password: value})}
              />
                
            <InputField
              id="password_confirmation"
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              error={errors.password_confirmation}
              onInput={(value) => setForm({ ...form, password_confirmation: value })}
            />

                <SelectField
                  id="role"
                  label="Role"
                  name="role"
                  initialValue={form.role}
                  error={errors.role}
                  options={
                    [
                      {text: "Select Role", value: ""},
                      {text: "Admin", value: "admin"},
                      {text: "Manager", value: "manager"},
                      {text: "Staff", value: "staff"},
                    ]
                  }
                  onInput={(value) => setForm({ ...form, role: value })}
                />
                
                <SelectField
                  id="status"
                  label="Status"
                  name="status"
                  initialValue={form.status}
                  error={errors.status}
                  options={
                    [
                      {text: "Select Status", value: ""},
                      {text: "Active", value: 1},
                      {text: "Inactive", value: 0},
                    ]
                  }
                  onInput={(value) => setForm({ ...form, status: value })}
                />

                <div className="mt-6 text-center">
                  <FormButton
                    fullWidth={false}
                    buttonText="Update User"
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
