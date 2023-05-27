import React, {useState, useEffect} from 'react'
import logo from '../assets/logo.png'

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


export const ForgotPassword = () => {

    const [inputFields, setInputFields] = useState({ email: ""});
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) =>{
        const{name , value} = e.target;
        setInputFields({...inputFields, [name]: value});  
        
    }
 
    const validate =(inputValues)=>{
        let errors = {};
        const regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(!regex.test(inputValues.email)){
            errors.email = "Enter a valid email address";
        }

        return errors;
    }

    useEffect(() => {
       if(Object.keys(errors).length === 0 && submitting){
        finishSubmit();
    }
    }, [errors])

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(inputFields));
    setSubmitting(true);
 }

 const finishSubmit = () => {
 

    axios.get('sanctum/csrf-cookie').then(async () =>{
    axios.post('api/forget-password', inputFields)
    .then(function (response) {
       if(response.data.status === 200){
       
           Swal.fire({
             icon: 'success',
             title: response.data.message,
             showConfirmButton: false,
             timer: 2000
         })
       }else if(response.data.status === 500){
        Swal.fire({
            icon: 'error',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
        })

       }
    
    //    navigate('/dashboard');
    
    })
    .catch(function (error) {
     Swal.fire({
         icon: 'error',
         title: 'An Error Occured!',
         showConfirmButton: false,
         timer: 1500
     })
    
    });
    });
    
    };

    return (
        <>
            <main>
                <div className='bg-white py-12'>
                    <div className='w-full lg:w-5/6 2xl:w-1/2 lg:mx-auto lg:p-12'>
                        <img src={logo} className="w-20 mx-auto" alt='img' />
                        <div className='my-6 px-4'>
                            <h2 className='text-4xl font-bold text-center'>Forget password?</h2>
                            <p className='text-lg font-medium text-center'>A password reset link has been sent to you. Please check your inbox or spam mails.</p>
                        </div>

                        <div className='border-2 border-slate-200 mx-2 rounded-xl shadow-lg py-14 px-8 lg:p-14space-y-5'>
                            <div>
                            <form onSubmit={handleSubmit}>
                                   
                                        <div className='space-y-5'>
                                            <div>
                                                <label className="block text-sm">
                                                    <input
                                                     value={inputFields.email}
                                                     onChange={handleChange}
                                                        type="email"
                                                        name="email"
                                                        className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                        placeholder="Enter Email"
                                                    />
                                                    <span className='text-red-500'>{errors.email}</span>
                                                </label>
                                            </div>

                                            <div className='space-y-3'>
                                                <button className='bg-orange-600 w-full rounded-md text-white py-3 px-8 space-x-4 text-lg font-medium shadow-md shadow-orange-200'> Send </button>
                                                <p className='text-center font-bold'> <Link to="/login" className='text-orange-600'><i class="fa-solid fa-arrow-left-long mr-3"></i> Back to sign in</Link></p>
                                            </div>
                                        </div>
                                   
                               </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}