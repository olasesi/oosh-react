import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import pageprofileplaceholder from '../../assets/placeholder.png'
import coverphotoplaceholder from '../../assets/coverphotoplaceholder.jpg'
import Swal from 'sweetalert2';
import axios from 'axios';
import '../spinner.css';


export const CreatePageForm = (props) => {

    const navigate = useNavigate();

   let { showEditProfile } = props;

 const [inputFields, setInputFields] = useState({
        page_name:"",
        page_description:"", 
        page_category: "", 
        });
    
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setInputFields({...inputFields, [name]: value});  
       
    }

    const validate =(inputValues)=>{
        let errors = {};
               
        if (inputValues.page_name.length < 3){
            errors.page_name = "Page name should not be less than 3 characters";
        }

        if (inputValues.page_category === "Select category"){
           
            errors.page_category = "You must choose a page category";
        }
       
if(inputValues.page_description !== ""){
    if (inputValues.page_description.length < 10){
        errors.page_description = "Page description should not be less than 10 characters";
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
        axios.post('api/create-page',inputFields)
          .then(function (response) {
              if(response.data.status === 200){
             
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


const [postcategory, setPostcategory] = useState([])

useEffect(() => {
 
    axios.get('sanctum/csrf-cookie').then(async () =>{
        axios.get('api/list-page-category')
          .then(function (response) {
              if(response.data.status === 200){
             
                setPostcategory(response.data.users);
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
     

 }, [])


 if (!postcategory.length) {
    return <div className="loader">Loading...</div>
  }

   
    return (
        <>

            <div className="absolute top-0 left-0 " >
                <div className="inset-0 fixed bg-slate-800 w-screen h-screen z-50 bg-opacity-60 flex items-center px-3">
                    <div className="shadow shadow-slate-400 rounded-lg space-y-4 overflow-y-scroll h-[90%] bg-white mx-auto w-full lg:w-2/3 2xl:w-1/2 ">
                        <section className='space-y-6 p-4'>

                            <div className=' border-b pb-2'>
                                <div className='flex justify-between px-4'>
                                    <p className='font-bold text-lg'>Create page</p>
                                    <div>
                                        <button onClick={showEditProfile} className="text-orange-600 text-lg 2xl:text-2xl"><i class="fa-solid fa-circle-xmark"></i></button>
                                    </div>
                                </div>
                            </div>
                            
                            <section className="shadow shadow-slate-400 rounded-2xl relative pb-6">
                                <div>
                                    <img src={coverphotoplaceholder} alt="cover photo" className='rounded-tl-2xl rounded-tr-2xl h-56 object-cover w-full' />
                                </div>

                                <div className='-mt-20 px-5 md:pr-20 md:pl-10'>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <img src={pageprofileplaceholder} alt="page profile image" className='w-32 md:w-36' />
                                        </div>
                                       
                                    </div>
                                </div>
                            </section> 

                            <section className='px-6 py-4'>
                                
                                    
                                        <form onSubmit = {handleSubmit}>
                                        <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                            <div className='w-full md:w-1/2'>
                                                <label className="block text-sm">
                                                    <span className="">Page name (required)</span>
                                                    <input   value={inputFields.page_name}
                                                    onChange={handleChange}
                                                        type="text"
                                                        name="page_name"
                                                        className="w-full border px-4 py-3 rounded"
                                                        placeholder="Developer corner"
                                                    />
                                                    <span className='text-red-500'>{errors.page_name}</span>
                                                </label>
                                            </div>
                                       <div className='w-full md:w-1/2'>
                                                <label className="block text-sm">
                                                <span className="">Page category (required)</span>
                                                <select 
                                                    onChange={handleChange}
                                                    value={inputFields.page_category}
                                                             as="select"
                                                             type="text"
                                                             name="page_category"
                                                             className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md">
                                                             <option>Select category</option>

                                                             { postcategory.map((item) => {
                                                             return <option value={item.id}>{item.page_category}</option>;
                                                            }) }
                                                            
                                                         </select>
                                                         <span className='text-red-500'>{errors.page_category}</span>
                                                </label>
                                            </div>


                                        </div>

                                      

                                        <div className='w-full md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>
                                            <label className="block text-sm">
                                                <span className="">Bio</span>
                                                <textarea  value={inputFields.page_description}
                                                    onChange={handleChange}
                                                    as="textarea"
                                                    type="text"
                                                    name="page_description"
                                                    className="w-full border px-4 py-3 rounded"
                                                    placeholder="Say something about the page"
                                                ></textarea>
                                                 <span className='text-red-500'>{errors.page_description}</span>
                                            </label>
                                        </div>
                                        

                                        

                                        <button className='bg-orange-600 w-full text-center py-3 text-white rounded-xl'>Create page</button>
                                        </form>
                                   
                                
                            </section>



                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}