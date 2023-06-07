import dp from '../../assets/dp.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react'


export const CreatePost = (props) => {

    let { showCreatePost } = props;

    const [profilePicture, setProfilePicture] = useState([]);

    useEffect(() => {
        axios.get('sanctum/csrf-cookie').then(async () => {
            axios.get('api/dashboard-image-profile')
                .then(function (response) {
                    if (response.data.status === 200) {
                        setProfilePicture(response.data.profile_picture)

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
        post: "",
        visible_post_for: null,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });

    }

    const validate = (inputValues) => {
        let errors = {};

        if (inputValues.post.length < 3) {
            errors.post = "Post should be at least 3 characters long";
        }
        console.log(errors);
        return errors;
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(inputFields));
        setSubmitting(true);
    }

    const finishSubmit = () => {

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="absolute top-0 left-0" >
                    <div className="inset-0 fixed bg-slate-800 w-screen z-50 h-[100vh] bg-opacity-60 flex items-center px-3">

                        <div className="shadow shadow-slate-400 rounded-lg space-y-4 bg-white mx-auto w-full lg:w-2/3 2xl:w-1/2 ">
                            <div className="flex justify-between items-center  2xl:px-8  border-b py-4  px-4 md:px-6">
                                <div>
                                    <h2 className="text-sm 2xl:text-xl font-bold">Create Post</h2>
                                </div>
                                <div className="flex gap-3 items-center text-xs 2xl:text-base">
                                    <p>Visible for</p>
                                    <select className="bg-slate-100 focus:outline-white px-6 py-2" name="visible_post_for" onChange={handleChange}>
                                        <option className="mt-3">Friends</option>
                                        <option className="mt-3">Public</option>
                                        <option className="mt-3">Only Me</option>
                                    </select>
                                </div>
                                <div>
                                    <button onClick={showCreatePost} className="text-orange-600 text-lg 2xl:text-2xl"><i class="fa-solid fa-circle-xmark"></i></button>
                                </div>
                            </div>

                            <div className='2xl:px-8  py-4  px-4 md:px-6 space-y-4'>
                                <div className="flex gap-4 items-start">
                                    <div>
                                        <img src={`http://localhost:8000/${profilePicture.profile_picture}`} alt={`${profilePicture.firstname} ${profilePicture.lastname}`} title={`${profilePicture.firstname} ${profilePicture.lastname}`} className='w-12 rounded-full' />
                                    </div>

                                    <div className='flex-1'>
                                        <div className="flex justify-center flex-1 ">

                                            <textarea rows="6" className="w-full pl-8 py-3 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:focus:shadow-outline-gray  focus:placeholder-gray-500 focus:bg-white focus:border-orange-300 focus:outline-none focus:shadow-outline-purple form-input" type="text" placeholder="What’s happening?" name="post" value={inputFields.post}
                                                onChange={handleChange} />
                                            
                                        </div>
                                        <span className='text-red-500'>{errors.post}</span>

                                        <div class="flex items-center justify-center w-full mt-4">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" name="" />
                                    </label>
                                </div>
                                        
                                    </div>

                                    
                                </div>

                           






                                <div className='2xl:px-8  py-4 md:px-6 flex items-center justify-between'>
                                    <div className='flex gap-1 md:gap-2 items-center'>
                                        <i className="fa-solid fa-video text-sm md:text-base"></i>
                                        <p className='text-xs md:text-sm'>Short Video</p>
                                    </div>

                                    <div className='flex gap-1 md:gap-2 items-center'>
                                        <i class="fa-solid fa-camera text-sm md:text-base"></i>
                                        <p className='text-xs md:text-sm'>Photo/Video</p>
                                    </div>


                                    <div className='flex gap-1 md:gap-2 items-center'>
                                        <i class="fa-regular fa-face-smile text-sm md:text-base"></i>
                                        <p className='text-xs md:text-sm'>Feeling</p>
                                    </div>

                                    <div className=''>
                                        <button className='bg-orange-600 text-white px-3 py-1 rounded w-full 2xl:w-32'>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}