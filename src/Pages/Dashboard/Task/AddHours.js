import React,{useState} from 'react'
import InputField from '../../../Components/Form/InputField';

export default function AddHours(props) {

    const {handleClose, open} = props;
    const [form, setForm] = useState({
        name: "",
        description: "",
        manager: "",
        status: '',
      });
    
      const [submitting, setSubmitting] = useState(false);
      const [errors, setErrors] = useState({});

    return (
        <div
        className={`fixed ${!open && 'hidden'} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            
            <div>
                  <InputField
                    id="hours"
                    label="Add Hours"
                    type="text"
                    name="hours"
                    error={errors.hours}
                    onInput={(value) => setForm({ ...form, hours: value })}
                  />
            </div>

            <div className="flex justify-end items-center px-4 py-3">
              
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
              <button
                className="ml-2 px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Submit
              </button>

            </div>
          </div>
        </div>
      </div>
    )
}
