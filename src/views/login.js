import React, {useState, useEffect} from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import image from '../assets/ex5.png'


export default function Login() {
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({ email: "", password:""});
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
 console.log(inputFields);

axios.get('sanctum/csrf-cookie').then(async () =>{
axios.post('api/save-login', inputFields)
.then(function (response) {
   if(response.data.status === 200){
   
    localStorage.setItem('auth_token',response.data.token);
   
       localStorage.setItem('auth_firstname',response.data.users[0]['firstname']);
       localStorage.setItem('auth_lastname',response.data.users[0]['lastname']);
       localStorage.setItem('auth_email',response.data.users[0]['email']);
       localStorage.setItem('auth_phone',response.data.users[0]['phone']);
       localStorage.setItem('auth_gender',response.data.users[0]['gender']);
       localStorage.setItem('auth_date_of_birth',response.data.users[0]['date_of_birth']);
       localStorage.setItem('auth_profile_picture',response.data.users[0]['profile_picture']);
       localStorage.setItem('auth_username',response.data.users[0]['username']);
       localStorage.setItem('auth_location',response.data.users[0]['location']);
       localStorage.setItem('auth_country',response.data.users[0]['country']);
       localStorage.setItem('auth_website',response.data.users[0]['website']);
       localStorage.setItem('auth_bio',response.data.users[0]['bio']);
       localStorage.setItem('auth_cover_photo',response.data.users[0]['cover_photo']);
       localStorage.setItem('auth_occupation',response.data.users[0]['occupation']);
       localStorage.setItem('auth_zipcode',response.data.users[0]['zipcode']);
       localStorage.setItem('auth_state',response.data.users[0]['state']);
       localStorage.setItem('auth_city',response.data.users[0]['city']);
       localStorage.setItem('auth_address',response.data.users[0]['address']);
       localStorage.setItem('auth_hobby',response.data.users[0]['hobby']);
       
       Swal.fire({
         icon: 'success',
         title: response.data.message,
         showConfirmButton: false,
         timer: 1500
     })
   }

   navigate('/dashboard');

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
                            <h2 className='text-4xl font-bold text-center'>Sign In</h2>
                            <p className='text-lg font-medium text-center'>Welcome back, you have missed!</p>
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






                                            <div className='flex justify-between items-center'>
                                                <div className='font-medium text-lg '>
                                                    <input type="checkbox" name="remember_token" className="mr-2.5" />
                                                    Remember me
                                                </div>
                                                <div className='font-bold text-blue-700'>
                                                    <Link to="/forgot-password">  Forgot Password? </Link></div>
                                            </div>



                                            <div className='space-y-3'>
                                                <button className='bg-orange-600 w-full rounded-md text-white py-3 px-8 space-x-4 text-lg font-medium shadow-md shadow-orange-200'> Sign In</button>
                                                <p className='text-center font-bold'> Don't have an account? <Link to="/" className='text-orange-600'>Sign Up</Link></p>
                                            </div>
                                        </div>
                                    </form>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* <div className='space-x-4'>
                <button onClick={() => changeMode('multiply')}>Multiply</button>
                <button onClick={() => changeMode('color-dodge')}>color-dodge</button>
                <button onClick={() => changeMode('darken')}>darken</button>
                <button onClick={() => changeMode('overlay')}>Overlay</button>
            </div>

            <div className='bg-yellow-300'>
                <img src={image} alt="img" className={`object-cover w-full mix-blend-${mode}`} />
            </div> */}
        </>
    );
}
