import React,{useState} from 'react'
import FormButton from '../../../Components/Form/FormButton';
import InputField from '../../../Components/Form/InputField';
import TextArea from '../../../Components/Form/TextArea';
import { API_HOST } from "../../../config/constant";
import { validate } from "../../../Utils/Validator";
import axios from 'axios';

export default function AddHours(props) {

    const {handleClose, open, task} = props;

    const [form, setForm] = useState({
        task_id: task.id,
        hours: "",
        note: "",
      });
    
      const [submitting, setSubmitting] = useState(false);
      const [errors, setErrors] = useState({});

      function handleSubmit(e) {
        e.preventDefault();
    
        // Validate Form
        const {isValid, errors} = validate(form, {
            hours: ['required'],
        });
    
        setSubmitting(true);
        
        if(isValid){
    
            axios.post(API_HOST+"/worksheets", form, {headers: {Authorization: `${localStorage.getItem("token")}`}})
                .then(res => {
                    setErrors({});
                   
                    setSubmitting(false);
                    handleClose(false, true);
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
        <div
        className={`fixed ${!open && 'hidden'} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <form onSubmit={handleSubmit} className="mt-3">
            
          <InputField
            id="hours"
            label="Add Hours"
            type="number"
            name="hours"
            error={errors.hours}
            onInput={(value) => setForm({ ...form, hours: value })}
          />

          <TextArea
            id="note"
            label="Note"
            name="note"
            error={errors.note}
            onInput={(value) => setForm({ ...form, note: value })}
          />

            <div className="flex justify-end items-center px-4 py-3">
              
              <button
                onClick={() => handleClose(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
              <FormButton
                fullWidth={false}
                buttonText="Submit"
                loading={submitting}
              />

            </div>
          </form>
        </div>
      </div>
    )
}
