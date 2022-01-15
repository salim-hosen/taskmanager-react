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
import TextArea from "../../../Components/Form/TextArea";

export default function EditWorksheet() {

    const routeParams = useParams();

    const [form, setForm] = useState({
        hours: "",
        note: "",
      });
    
      const [loading, setLoading] = useState(false);
      const [submitting, setSubmitting] = useState(false);
      const [errors, setErrors] = useState({});

      function loadWorksheet(){
        setLoading(true);
          axios.get(API_HOST+`/worksheets/${routeParams.id}`, {headers: {Authorization: `${localStorage.getItem("token")}`}})
              .then(res => {
                  setLoading(false);
                  const worksheet = res.data.data;
                  setForm({...form, hours: worksheet.time, note: worksheet.note});
              })
              .catch(err => {
                setLoading(false);
                  console.log(err);
              });
      }
    
      useEffect(() => {
        loadWorksheet();
      }, [])


      function handleSubmit(e) {
        e.preventDefault();
    
        // Validate Form
        const {isValid, errors} = validate(form, {
            hours: ['required'],
        });
    
        setSubmitting(true);
        
        if(isValid){
    
            axios.put(`${API_HOST}/worksheets/${routeParams.id}`, form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
                .then(res => {
                    setErrors({});
                    toast.success("Updated Successfully!");
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
                Edit Worksheet
              </h2>
            </div>
            <hr />
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <InputField
                  id="hours"
                  label="Add Hours"
                  type="number"
                  name="hours"
                  initialValue={form.hours}
                  error={errors.hours}
                  onInput={(value) => setForm({ ...form, hours: value })}
                />

                <TextArea
                  id="note"
                  label="Note"
                  name="note"
                  initialValue={form.note}
                  error={errors.note}
                  onInput={(value) => setForm({ ...form, note: value })}
                />

                <div className="mt-6 text-center">
                    <FormButton
                      fullWidth={false}
                      buttonText="Update"
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
