import React, {useState, useEffect} from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import image from '../assets/ex5.png'


export default function PasswordResetForm() {
    const navigate = useNavigate();

    const [id, setId] = useState(useParams().token)
    const [inputFields, setInputFields] = useState({ email: "", password:"", password_confirmation:"",});
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

        if(inputValues.password.length < 6){
            errors.password= "Password should not be less than 6 characters";
        }else{
            if(inputValues.password !== inputValues.password_confirmation){
                errors.password= "Password did not match";
            }
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
axios.post('api/save-reset', inputFields)
.then(function (response) {
   if(response.data.status === 200){
   
    localStorage.setItem('auth_token',response.data.token);
       localStorage.setItem('auth_email',response.data.email);
      
       
       Swal.fire({
         icon: 'error',
         title: response.data.message,
         showConfirmButton: false,
         timer: 1500
     })
     navigate('/dashboard');
   }

  

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
                            <h2 className='text-4xl font-bold text-center'>Password reset</h2>
                            <p className='text-lg font-medium text-center'>Welcome back, you can now reset your password</p>
                        </div>

                        <div className='border-2 border-slate-200  rounded-xl shadow-lg py-14 px-8 lg:p-14 space-y-5 mx-2'>
                           
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

                                            <div className='relative'>
                                                <div className='absolute lg:right-6 right-4 mt-4'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                        <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <label className="block text-sm">
                                                <input value={inputFields.password}
            onChange={handleChange}
                                                         type="password"
                                                         name="password"
                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                         placeholder="Password"
                                                     />
<span className='text-red-500'>{errors.password}</span>
                                                </label>
                                            </div>

                                            <div className='relative'>
                                             <div className='absolute lg:right-6 right-4 mt-4'>
                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                         <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                         <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                                     </svg>
                                                 </div>
                                                 <label className="block text-sm">
                                                     <input
                                                      value={inputFields.password_confirmation}
                                                      onChange={handleChange}
                                                         type="password"
                                                         name="password_confirmation"
                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                         placeholder="Confirm Password"
                                                     />
                                                    
                                                        <span className='text-red-500'>{errors.password_confirmation}</span>
                                                 </label>
                                             </div>




                                            <div className='space-y-3'>
                                                <button className='bg-orange-600 w-full rounded-md text-white py-3 px-8 space-x-4 text-lg font-medium shadow-md shadow-orange-200'> Reset Password</button>

                                            </div>
                                        </div>
                                    </form>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </main>

        </>
    );
}
