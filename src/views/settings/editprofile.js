import { ErrorMessage, Field, Form, Formik } from 'formik'
import cvdp from '../../assets/dpcv.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import react, {useEffect, useState } from 'react'


export const EditProfile = () => {

    const [editing, setEditing] = useState([])
        useEffect(() => { 
        axios.get('sanctum/csrf-cookie').then(async () =>{
            axios.get(`api/user-settings`)
              .then(function (response) {
                  if(response.data.status === 200){
                    
                    setEditing(response.data.user);

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
    
    
     const [inputFields, setInputFields] = useState({
            firstname: editing.firstname, 
            username: editing.username,
            lastname:editing.lastname,
             fullname:editing.fullname,
              email: editing.email, 
              phone:editing.phone,
              occupation:editing.occupation,
              website:editing.website,
           });
    
           
           

        const [errors, setErrors] = useState({});
        const [submitting, setSubmitting] = useState(false);
    
        const handleChange = (e) =>{
            
            const{name, value} = e.target;
            setInputFields({...inputFields, [name]: value});  
           
        }
    
        const validate =(inputValues)=>{
            let errors = {};
            const regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const usernameRegex = /^[a-zA-Z0-9]+$/;
            const phonenumber = /^\d{11}$/; 
            
            
            if (inputValues.firstname.length < 3 && inputValues.firstname.length !== ""){
                errors.firstname = "Firstname should not be less than 3 characters";
            }
        
            if (inputValues.lastname.length < 3 && inputValues.lastname.length !== ""){
                errors.lastname = "Lastname should not be less than 3 characters";
            }
            if (inputValues.fullname.length < 3 && inputValues.fullname.length !== ""){
                errors.fullname = "Fullname should not be less than 3 characters";
            }
            if (inputValues.username.length < 3 && !usernameRegex.test(inputValues.username) && inputValues.username.length !== ""){
                errors.username = "Username should not be less than 3 characters";
            }
            if(!regex.test(inputValues.email) && inputValues.email.length !== ""){
                errors.email = "Enter a valid email address";
            }
            if (!phonenumber.test(inputValues.phone) && inputValues.phone.length !== ""){
                errors.phone = "Phone number is not correct";
            }
            if (inputValues.occupation.length < 3 && inputValues.occupation.length !== ""){
                errors.occupation = "Occupation should not be less than 3 characters";
            }
            if (inputValues.website.length < 3 && inputValues.website.length !== ""){
                errors.website = "Website URL should not be less than 3 characters";
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
            axios.post('api/update-settings', inputFields)
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
    


    return (
        <>
            <section className="p-8">
                <h2 className="text-2xl font-bold text-orange-600">Edit Profile</h2>


                <div className='py-8'>
                    <img src={"http://localhost:8000/"+editing.profile_picture} className="w-28" alt={` ${editing.firstname} ${editing.lastname} `} title={` ${editing.firstname} ${editing.lastname} `}/>
                </div>

                <div>
                   
                        <form onSubmit = {handleSubmit}>
                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Firstname</span>
                                        <input
                                         value={inputFields.firstname ? inputFields.firstname:""}
                                         onChange={handleChange}
                                            type="text"
                                            name="firstname"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Evans Kelly"
                                        />
                                       <span className='text-red-500'>{errors.firstname}</span>
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Lastname</span>
                                        <input
                                         value={inputFields.lastname}
                                         onChange={handleChange}
                                            type="text"
                                            name="firstname"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Evans Kelly"
                                        />
                                        <span className='text-red-500'>{errors.lastname}</span>
                                    </label>
                                </div>


                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Username</span>
                                        <input 
                                        value={inputFields.username}
                                         onChange={handleChange}
                                            type="text"
                                            name="lastname"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="lilmow"
                                        />
                                       <span className='text-red-500'>{errors.username}</span>
                                    </label>
                                </div>


                            </div>

                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Email</span>
                                        <input  value={inputFields.email}
                                         onChange={handleChange}
                                            type="email"
                                            name="email"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="www.lilmow.com"
                                        />
                                        <span className='text-red-500'>{errors.email}</span>
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Birthday</span>
                                        <input  onChange={handleChange}
                                         
                                            type="date"
                                            name="lastname"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="24/04/2005"
                                        />
                                       
                                    </label>
                                </div>


                            </div>

                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Phone Number</span>
                                        <input value={inputFields.phone}
                                         onChange={handleChange}
                                            type="number"
                                            name="phone"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="+234 - (0)803787778974"
                                        />
                                       <span className='text-red-500'>{errors.phone}</span>
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Occupation</span>
                                        <input
                                        value={inputFields.occupation}
                                        onChange={handleChange}
                                            type="text"
                                            name="occupation"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="UI/UX Designer"
                                        />
                                        <span className='text-red-500'>{errors.occupation}</span>
                                    </label>
                                </div>


                            </div>

                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Gender</span>
                                        <select onChange={handleChange}
                                            as="select"
                                            type="text"
                                            name="gender"
                                            className="block w-full mt-1 border p-3  text-base font-medium focus:border-slate-700 focus:outline-none focus:shadow-outline-purple shadow shadow-slate-100 rounded-md">
                                            <option selected >Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Website</span>
                                        <input
                                        value={inputFields.website}
                                        onChange={handleChange}
                                            type="text"
                                            name="lastname"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="wwww.lilwom.com"
                                        />
                                        <span className='text-red-500'>{errors.website}</span>
                                    </label>
                                </div>
                            </div>

                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Education</span>
                                        <input
                                        onChange={handleChange}
                                            type="text"
                                            name="phone"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Bachelor of Science"
                                        />
                                        
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Zip Code</span>
                                        <input
                                        onChange={handleChange}
                                            type="number"
                                            name="zipcode"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="231108"
                                        />
                                        
                                    </label>
                                </div>


                            </div>

                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">City</span>
                                        <input
                                        onChange={handleChange}
                                            type="text"
                                            name="phone"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Victoria Island (VI)"
                                        />
                                        
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">State</span>
                                        <input
                                        onChange={handleChange}
                                            type="text"
                                            name="occupation"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Lagos"
                                        />
                                       
                                    </label>
                                </div>


                            </div>


                            <div className='md:flex md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Address</span>
                                        <input
                                        onChange={handleChange}
                                            type="text"
                                            name="phone"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="19 Adetokunbo Ademola Street"
                                        />
                                        
                                    </label>
                                </div>

                                <div className='w-full md:w-1/2'>
                                    <label className="block text-sm">
                                        <span className="">Hobby</span>
                                        <input
                                        onChange={handleChange}
                                            type="text"
                                            name="occupation"
                                            className="w-full border px-4 py-3 rounded"
                                            placeholder="Dancing"
                                        />
                                       
                                    </label>
                                </div>


                            </div>


                            <div className='w-full md:space-x-6 mb-4 lg:mb-0 space-y-4 md:space-y-0 justify-between lg:py-1.5'>
                                <label className="block text-sm">
                                    <span className="">Bio</span>
                                    <textarea
                                    onChange={handleChange}
                                        as="textarea"
                                        type="text"
                                        name="lastname"
                                        className="w-full border px-4 py-3 rounded"
                                        placeholder="We are openly opened minded. #openlyopenminded"
                                    ></textarea>
                                    
                                </label>
                            </div>

                            <button className='bg-orange-600 w-full text-center py-3 text-white rounded-xl'>Save</button>
                        
                    </form>
                </div>
            </section>
        </>
    )
}