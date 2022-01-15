import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../Components/Form/FormButton";
import InputField from "../../Components/Form/InputField";
import Sidebar from "../../Components/Layouts/Sidebar";
import { API_HOST } from "../../config/constant";
import { validate } from "../../Utils/Validator";
import {connect} from 'react-redux'
import { toast, ToastContainer } from "react-toastify";


function Settings(props) {

  const {user} = props;

  const [form, setForm] = useState({
    name:  user.name, 
    email: user.email,
    password: "",
    password_confirmation: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    // Validate Form
    const { isValid, errors } = validate(form, {
      name: ["required"],
      email: ["required"],
    });

    setSubmitting(true);

    if (isValid) {
      setErrors({});

      axios
        .post(API_HOST + "/profile", form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
        .then((res) => {
          setSubmitting(false);
          toast.success("Profile Updated");
        })
        .catch((err) => {
          if (err.response && err.response.status === 422) {
            setErrors(err.response.data.errors);
          }
          setSubmitting(false);
        });
    } else {
      setErrors(errors);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-row flex-wrap">
      <Sidebar></Sidebar>

      <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
        <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mt-5">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Update Settings
              </h2>
            </div>
            <hr />
          <form onSubmit={handleSubmit} className="mt-5">
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
              type="email"
              name="email"
              initialValue={form.email}
              error={errors.email}
              onInput={(value) => setForm({ ...form, email: value })}
            ></InputField>

            <InputField
              id="password"
              label="New Password"
              type="password"
              name="password"
              error={errors.password}
              onInput={(value) => setForm({ ...form, password: value })}
            />

            <InputField
              id="password_confirmation"
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              error={errors.password_confirmation}
              onInput={(value) => setForm({ ...form, password_confirmation: value })}
            />

            <div className="mt-6">
              <FormButton
                fullWidth={true}
                buttonText="Update"
                loading={submitting}
              />
            </div>
          </form>
        </div>
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps)(Settings)
