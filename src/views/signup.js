import React, {useState, useEffect} from 'react';
 import logo from '../assets/logo.png'
 import { Link } from 'react-router-dom';
 import Swal from 'sweetalert2';
 import axios from 'axios';



const validatedInputs = 
    {
        firstname: '',
        email: '',
        password: '',
        lastname:'',
        
      }



export default function SignUp() {
    const initialValues = {firstname:"", email: "", password:"", password_confirmation:"", lastname:"", gender:"", date_of_birth:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) =>{
        console.log(e.target);
        const{name , value} = e.target;
        setFormValues({...formValues, [name]: value});  //Fix what gender and date here. It should fill it up also
        
    }

    useEffect(() => {
       if(Object.keys(formErrors).length === 0 && isSubmit){
        }
    }, [])

  
    const validate =(values)=>{
        const errors = {};
        const regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (!values.firstname ){
            errors.firstname = "Firstname is required";
        }else{
            validatedInputs.firstname = values.firstname;
        }

        if (!values.lastname ){
            errors.lastname = "Lastname is required";
        }else{
            validatedInputs.lastname = values.lastname;
        }

        if(!values.email){
            errors.email= "Email is required!";
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid email address";
        }else{
            validatedInputs.email = values.email;
        }

        if(!values.password){
            errors.password= "Password is required!";
        } else if(values.password < 7){
            errors.password = "Password must be less that 6 characters";
        } 
        if(!values.password_confirmation){
            errors.password= "Confirm password!";
        } else if(values.password_confirmation < 7){
            errors.password = "Password must be less that 6 characters";
        } 
        
    }

const handleSubmit = (e) => {
    console.log(formValues)
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    

axios.get('sanctum/csrf-cookie').then(async () =>{
        axios.post('api/save-register', {
            firstname:formValues.firstname,
            lastname:formValues.lastname,
            email:formValues.email,
            password:validatedInputs.password,
            })
          .then(function (response) {
              if(response.data.status === 200){
                  localStorage.setItem('auth_token',response.data.token);
                  localStorage.setItem('auth_firstname',response.data.firstname);
                  localStorage.setItem('auth_lastname',response.data.lastname);
                  localStorage.setItem('auth_email',response.data.email);

                  Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
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

   
  }

  
    
    return (
             <main className=''>
                 <div className='bg-white py-12'>
                     <div className='w-full lg:w-5/6 2xl:w-1/2 lg:mx-auto lg:p-12'>
                         <img src={logo} className="w-20 mx-auto" alt='img' />
                         <div className='my-6 px-4'>
                             <h2 className='text-4xl font-bold text-center'>Getting Started</h2>
                             <p className='text-lg font-medium text-center'>Create an account to continue and connect with people</p>
                         </div>

                         <div className='border-2 border-slate-200 mx-2 lg:mx-0 rounded-xl shadow-lg py-14 px-8 lg:p-14 space-y-5'>
                             <div>
                                 
                                     <form onSubmit={handleSubmit}>
                                     {/* {Object.keys(formErrors).length === 0 && isSubmit ? <p>Successful</p>: <p>Unsuccessful</p>}  */}
                                         <div className='space-y-5'>
                                             <div>
                                                 <label className="block text-sm">
                                                     <input
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                         name="email"
                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                         placeholder="Enter Email"
                                                     />
                                                     
                <span className='text-red-500'>{formErrors.email}</span>
                                                     
                                                 </label>
                                             </div>

                                             <div className='flex flex-col lg:flex-row gap-5 lg:gap-8'>
                                                 <div className='w-full lg:w-1/2'>
                                                     <label className="block text-sm">
                                                         <input
                                                           value={formValues.firstname}
                                                           onChange={handleChange}
                                                             type="text"
                                                             name="firstname"
                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                             placeholder="First Name"
                                                         />
                                                       
                                                        <span className='text-red-500'>{formErrors.firstname}</span>
                                                         
                                                     </label>
                                                 </div>

                                                 <div className='w-full lg:w-1/2'>
                                                     <label className="block text-sm">
                                                         <input
                                                          value={formValues.lastname}
                                                          onChange={handleChange}
                                                             type="text"
                                                             name="lastname"
                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                             placeholder="Last Name"
                                                         />
                                                          
                                                        <span className='text-red-500'>{formErrors.lastname}</span>
                                                         
                                                     </label>
                                                 </div>
                                             </div>

                                             <div className='relative'>
                                                <div className='absolute lg:right-6 right-4 mt-4'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                         <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                         <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                                     </svg>
                                                 </div>
                                                 <label className="block text-sm">
                                                     <input value={formValues.password}
            onChange={handleChange}
                                                         type="password"
                                                         name="password"
                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                         placeholder="Password"
                                                     />

                                                        <span className='text-red-500'>{formErrors.password}</span>

                                                   
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
                                                      value={formValues.password_confirmation}
                                                      onChange={handleChange}
                                                         type="password"
                                                         name="password_confirmation"
                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                         placeholder="Confirm Password"
                                                     />
                                                    
                                                        <span className='text-red-500'>{formErrors.password_confirmation}</span>
                                                 </label>
                                             </div>

                                             <div className='flex flex-col lg:flex-row gap-5 lg:gap-8'>
                                                 <div className='w-full lg:w-1/2'>
                                                     <label className="block text-sm">
                                                         <input
                                                             type="date"
                                                             name="date_of_birth"
                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
                                                             placeholder="DOB"
                                                         />
                                                         
                                                     </label>
                                                 </div>

                                                 <div className='w-full lg:w-1/2'>
                                                     <label className="block text-sm">
                                                         <select
                                                             as="select"
                                                             type="text"
                                                             name="gender"
                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md">
                                                             <option selected >Select gender</option>
                                                             <option value="Male">Male</option>
                                                             <option value="Female">Female</option>
                                                         </select>
                                                         
                                                     </label>
                                                 </div>
                                             </div>

                                             <div className='space-y-3'>
                                                 <button className='bg-orange-600 w-full rounded-md text-white py-3 px-8 space-x-4 text-lg font-medium shadow-md shadow-orange-200'> Sign Up</button>
                                                 <p className='text-center font-bold'> Already have an account? <Link to="login" className='text-orange-600'>Sign in</Link></p>
                                             </div>
                                         </div>
                                     </form>
                                 
                             </div>
                         </div>

                     </div>
                 </div>
             </main>
    );
}


// import React, {useState} from 'react'
// import logo from '../assets/logo.png'
// import { Formik, Form, Field, ErrorMessage } from "formik";   //to make use of formik to handle the form creation for the posts
// import * as Yup from 'yup';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import axios from 'axios';



// export const SignUp = () => {

//     //validationSchema--- to integrate validations on the form using Yup
//     const validationSchema = Yup.object().shape({
//         firstname: Yup.string().required("Please input your firstname"),  //i.e it must be a string and its required
//         lastname: Yup.string().required("Please input your lastname"), //error message is defined for required
//         gender: Yup.string().required("Please select your gender"), //error message is defined for required
//         email: Yup.string().email('Invalid email').required('Email is required'),
//         password: Yup.string().min(6).max(20).required("Enter password"),
//         cpassword: Yup.string().min(6).max(20).required("Confirm password"),
//     });


//     const onSubmit = (data, { resetForm }) => {
//         setTimeout(async () => {
//             let details = data;
//             if (details.cpassword !== details.password) {
//                 let res = {
//                     altType: "danger",
//                     altMsg: "Password doesn't match"
//                 }
//                 console.log(res)
//             }

//         }, 2000);
       

          

//     }



//     return (
//         <>
//             <main className=''>
//                 <div className='bg-white py-12'>
//                     <div className='w-full lg:w-5/6 2xl:w-1/2 lg:mx-auto lg:p-12'>
//                         <img src={logo} className="w-20 mx-auto" alt='img' />
//                         <div className='my-6 px-4'>
//                             <h2 className='text-4xl font-bold text-center'>Getting Started</h2>
//                             <p className='text-lg font-medium text-center'>Create an account to continue and connect with people</p>
//                         </div>

//                         <div className='border-2 border-slate-200 mx-2 lg:mx-0 rounded-xl shadow-lg py-14 px-8 lg:p-14 space-y-5'>
//                             {/* <div className='flex flex-col md:flex-row gap-4 lg:gap-10 justify-center'>
//                                 <div className='w-full md:w-1/2'>
//                                     <button className='bg-orange-600 w-full rounded-md text-white py-3 lg:px-8 space-x-4 shadow-md shadow-orange-100'> <i class="fa-brands fa-google"></i> <span>  Continue With Google</span></button>
//                                 </div>

//                                 <div className='w-full md:w-1/2'>
//                                     <button className='bg-black w-full rounded-md text-white py-3 px-8 space-x-4 '> <i class="fa-brands fa-apple"></i> <span>Continue With Apple</span></button>
//                                 </div>
//                             </div>

//                             <div className='flex justify-center items-center gap-6'>
//                                 <div className='bg-slate-300 h-0.5 w-1/2 '></div>
//                                 <p className='font-bold'>OR</p>
//                                 <div className='bg-slate-300 h-0.5 w-1/2'></div>
//                             </div> */}




//                             <div>
//                                 <Formik onSubmit={onSubmit} validationSchema={validationSchema}>
//                                     <Form>
//                                         <div className='space-y-5'>
//                                             <div>
//                                                 <label className="block text-sm">
//                                                     <Field
//                                                         type="email"
//                                                         name="email"
//                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                         placeholder="Enter Email"
//                                                     />
//                                                     <ErrorMessage name="email" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
//                                                 </label>
//                                             </div>

//                                             <div className='flex flex-col lg:flex-row gap-5 lg:gap-8'>
//                                                 <div className='w-full lg:w-1/2'>
//                                                     <label className="block text-sm">
//                                                         <Field
//                                                             type="text"
//                                                             name="firstname"
//                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                             placeholder="First Name"
//                                                         />
//                                                         <ErrorMessage name="firstname" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
//                                                     </label>
//                                                 </div>

//                                                 <div className='w-full lg:w-1/2'>
//                                                     <label className="block text-sm">
//                                                         <Field
//                                                             type="text"
//                                                             name="lastname"
//                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                             placeholder="Last Name"
//                                                         />
//                                                         <ErrorMessage name="lastname" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
//                                                     </label>
//                                                 </div>
//                                             </div>

//                                             <div className='relative'>
//                                                 <div className='absolute lg:right-6 right-4 mt-4'>
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//                                                         <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
//                                                         <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
//                                                     </svg>
//                                                 </div>
//                                                 <label className="block text-sm">
//                                                     <Field
//                                                         type="password"
//                                                         name="password"
//                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                         placeholder="Password"
//                                                     />


//                                                     <ErrorMessage name="password" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
//                                                 </label>
//                                             </div>


//                                             <div className='relative'>
//                                             <div className='absolute lg:right-6 right-4 mt-4'>
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
//                                                         <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
//                                                         <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
//                                                     </svg>
//                                                 </div>
//                                                 <label className="block text-sm">
//                                                     <Field
//                                                         type="password"
//                                                         name="cpassword"
//                                                         className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                         placeholder="Confirm Password"
//                                                     />
//                                                     <ErrorMessage name="cpassword" component="span" className="text-red-500" /> {/*to display the error message for the field*/}
//                                                 </label>
//                                             </div>

//                                             <div className='flex flex-col lg:flex-row gap-5 lg:gap-8'>
//                                                 <div className='w-full lg:w-1/2'>
//                                                     <label className="block text-sm">
//                                                         <Field
//                                                             type="date"
//                                                             name="date_of_birth"
//                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md"
//                                                             placeholder="DOB"
//                                                         />
//                                                         {/* <ErrorMessage name="firstname" component="span" className="text-red-500" />  */}
//                                                     </label>
//                                                 </div>

//                                                 <div className='w-full lg:w-1/2'>
//                                                     <label className="block text-sm">
//                                                         <Field
//                                                             as="select"
//                                                             type="text"
//                                                             name="gender"
//                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md">
//                                                             <option selected >Select gender</option>
//                                                             <option value="male">Male</option>
//                                                             <option value="female">Female</option>
//                                                         </Field>
//                                                         <ErrorMessage name="gender" component="span" className="text-red-500 text-right" /> {/*to display the error message for the field*/}
//                                                     </label>
//                                                 </div>
//                                             </div>

//                                             <div className='space-y-3'>
//                                                 <button className='bg-orange-600 w-full rounded-md text-white py-3 px-8 space-x-4 text-lg font-medium shadow-md shadow-orange-200'> Sign Up</button>
//                                                 <p className='text-center font-bold'> Already have an account? <Link to="login" className='text-orange-600'>Sign in</Link></p>
//                                             </div>
//                                         </div>
//                                     </Form>
//                                 </Formik>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </main>
//         </>
//     )
// }


