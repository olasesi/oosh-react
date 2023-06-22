import { useState, useEffect } from "react";
import cv2 from '../../assets/pag1.png'
import cvdp from '../../assets/dpag.png'
import { About } from "./about";
import { Post } from "./post";
import { useParams } from "react-router-dom";
import axios from "axios"
import Swal from 'sweetalert2'

export const Pages = () => {


    const [active, setActive] = useState("tab2");

    const handleChange = (value) => {
        setActive(value);

        if (value === "tab5" || value === "tab6") {
            showMedia();
        }
    };


    const [media, setMedia] = useState(false);

    const showMedia = () => {
        setMedia(!media)
    }

    const [id, setId] = useState(useParams().id)
    const [pagecover, setPagecover] = useState([])
       const [loading, setLoading] = useState(true)

    useEffect(() => {
 
        axios.get('sanctum/csrf-cookie').then(async () =>{
            axios.get(`api/show-page-cover/${id}`)
              .then(function (response) {
                  if(response.data.status === 200){
                    setPagecover(response.data);
                    setLoading(false)
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
    
     if (loading) {
        return <div className="loader">Loading...</div>
      }

    return (
        <>
        

           <section  className="shadow shadow-slate-400 rounded-2xl relative pb-6">
             
                <div>
                    <img src={"http://localhost:8000/storage/page/"+pagecover.page[0].cover_picture} alt={pagecover.page[0].page_name} className='rounded-tl-2xl rounded-tr-2xl h-80 object-cover w-full' />
                </div>

                <div className='-mt-14 px-5 md:pr-20 md:pl-10'>
                    <div className='flex gap-6 items-end'>
                        <div>
                            <img src={"http://localhost:8000/storage/page/"+pagecover.page[0].profile_picture} alt={pagecover.page[0].page_name} className='w-32 md:w-36' />
                        </div>

                        <div>
                            <h1 className='text-3xl font-bold'>{pagecover.page[0].page_name} </h1>
                            <p className='font-semibold'>{pagecover.member_count} members</p>
                        </div>
                    </div>
                </div>

                <div className='mt-5 px-5 md:px-10 md:flex justify-between items-center space-y-3 md:space-y-0'>
                    <div>
                        <p className='font-semibold'><i class="fa-solid fa-earth-africa mr-1"></i> {pagecover.page[0].page_privacy} page</p>
                    </div>

                 
             {pagecover.page_admin 
             ? 
             (<div className='space-x-2 flex'>
                        <div>
                            <button className='py-2 px-6 bg-gray-200 rounded-lg space-x-2'> <i class="fa-solid fa-edit"></i>
                                <span className='font-semibold'>Edit</span> 
                            </button>
                        </div>
                        <div>
                            <button className='py-2 px-6 bg-gray-200 rounded-lg space-x-2'> <i class="fa-solid fa-people-roof"></i>
                                <span className='font-semibold'>Manage</span> 
                            </button>
                        </div>


                                            
                    </div>)
             : 
                    (<div className='space-x-2 flex'>
                        
                        {(<div>
                            <button className='py-2 px-6 bg-gray-200 rounded-lg space-x-2'> <i class="fa-solid fa-users"></i>
                                <span className='font-semibold'>Whatsapp</span> <i class="fa-solid fa-caret-down"></i>
                            </button>
                        </div>)
                        ??
                       ( <div>
                            <button className='py-2 px-6 bg-gray-200 rounded-lg space-x-2'> <i class="fa-solid fa-users"></i>
                                <span className='font-semibold'>Message</span> <i class="fa-solid fa-caret-down"></i>
                            </button>
                        </div>)}

                        <div>
                            <button className='py-2 px-6 bg-gray-200 rounded-lg space-x-2'> <i class="fa-solid fa-users"></i>
                                <span className='font-semibold'>Join</span> <i class="fa-solid fa-caret-down"></i>
                            </button>
                        </div>
                        <div>
                            <button className='py-2 px-4 bg-gray-200 rounded-lg'><i class="fa-solid fa-caret-down"></i></button>
                        </div>
                    </div>)}




                    
                </div>
                


            </section>


            <section className='my-8 space-y-6'>
                <div className=" flex flex-wrap border-b border-t py-2 gap-4 md:gap-6">

                    <div className="">
                        <button
                            onClick={() => handleChange("tab1")}
                            className={`px-2 md:px-4 hover:text-orange-600 hover:bg-slate-200 py-1 md:py-2 ${active === "tab1" ? "text-orange-600 " : ""}`}
                            active={active === "tab1"}
                        >
                            <span className=" font-bold md:text-lg">
                                About
                            </span>
                        </button>
                    </div>

                    <div className="">
                        <button
                            onClick={() => handleChange("tab2")}
                            className={`px-2 md:px-4 hover:text-orange-600 hover:bg-slate-200 py-1 md:py-2 ${active === "tab2" ? "text-orange-600" : ""}`} active={active === "tab2"}
                        >
                            <span className=" font-bold md:text-lg">
                                Post
                            </span>
                        </button>
                    </div>

                    <div className="">
                        <button
                            onClick={() => handleChange("tab3")}
                            className={`px-2 md:px-4 hover:text-orange-600 hover:bg-slate-200 py-1 md:py-2 ${active === "tab3" ? "text-orange-600 " : ""}`} active={active === "tab3"}
                        >
                            <span className=" font-bold md:text-lg">
                                Live
                            </span>
                        </button>
                    </div>

                    <div className=" relative">
                        <button
                            onClick={showMedia}
                            className={`px-2 md:px-4 hover:text-orange-600 hover:bg-slate-200 py-1 md:py-2 ${active === "tab5" ? "text-orange-600 " : ""}`} active={active === "tab5"}
                        >
                            <span className=" font-bold md:text-lg">
                                Media <i class="fa-solid fa-caret-down ml-1"></i>
                            </span>
                        </button>
                        {media &&
                            <div className='absolute shadow-lg bg-white p-6 xl:p-4 space-y-3 font-semibold z-50'>
                                <div onClick={() => handleChange("tab5")} className='cursor-pointer'>Photos</div>
                                <div onClick={() => handleChange("tab6")} className='cursor-pointer'>Videos</div>
                            </div>
                        }

                    </div>


                </div>

                <div>
                    <div hidden={active !== "tab1"}>
                        <About pagename={pagecover.page[0].page_name} category={pagecover.page[0].page_category} pagecontact={pagecover.page[0].page_contact} email={pagecover.page[0].page_email} website={pagecover.page[0].page_website} createdat={pagecover.page[0].created_at} description={pagecover.page[0].page_description}/>
                    </div>

                    <div hidden={active !== "tab2"}>
                        <Post/>
                    </div>

                    <div hidden={active !== "tab3"}>
                        <Post/>
                    </div>

                    <div hidden={active !== "tab4"}>
                        Coming Soon
                    </div>



                </div>
            </section>




        </>
    )
}