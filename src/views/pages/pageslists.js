import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import ex1 from '../../assets/ex1.png'
import ex2 from '../../assets/ex2.png'
import ex3 from '../../assets/ex3.png'
import ex4 from '../../assets/ex4.png'
import ex5 from '../../assets/ex5.png'
import ex6 from '../../assets/ex6.png'
import { CreatePageForm } from './createpageform'
import Swal from 'sweetalert2';
import axios from "axios"
import '../spinner.css';

export const PagesLists = () => {

  
    const [listdata, setListdata] = useState([]);
    const [loading, setLoading] = useState(true);
   

      useEffect(()=>{
        axios.get('sanctum/csrf-cookie').then(async () =>{
            axios.get("api/show-page-list")
            .then(function (response) {
                if(response.data.status === 200){
                           
                    setListdata([response.data]);
                    
                    setLoading(false);
                    
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
        
      },[]);

    const [editProfile, setEditProfile] = useState(false);  
    const showEditProfile = () => {
        setEditProfile(!editProfile)
    }

    if (loading) {
      return <div className="loader">Loading...</div>
    }
  
    console.log(listdata) 
    return (
        <>
        
        <div className='space-y-3 mb-3'>
                <button onClick={showEditProfile} className='bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-black'>Create Page <i className="fa-solid fa-plus ml-2"></i></button>
        </div>

        <h1 className='font-semibold text-4xl mb-7'>My pages</h1>
        {editProfile && (
                        <CreatePageForm showEditProfile={showEditProfile} />
                    )
                    }     

            {listdata.map((page, index)=>{
            return <section key={index} className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-5">
                {page.pages.data.map((d)=>{
                return <div key={d.id} className="shadow shadow-slate-400 rounded-xl">

                    <div> <img src={"http://localhost:8000/storage/page/"+d.cover_picture} alt={d.page_name} className="w-full object-cover rounded-t-xl" /> </div>
                    <div className='p-4'>
                        <div className='flex gap-3 text-sm items-center pb-3'>
                            <p className='text-orange-600 bg-orange-100 px-4 py-1 rounded-lg font-bold'>{d.page_category}</p>
                            <p>{d.created_at}</p>
                        </div>

                        <div className='space-y-3'>
                            <h2 className='font-semibold text-xl'>{d.page_name}</h2>
                            <p className='text-sm'>{d.page_description}</p>
                            <Link to={`/dashboard/pages/${d.id}`}>
                                <button className='bg-orange-600 text-white px-4 py-2 rounded-lg mt-7 hover:bg-black'>View Page<i class="fa-solid fa-arrow-right-long ml-2"></i></button>
                            </Link>
                        </div>
                    </div>

                </div>})}

                </section>
                })}
            <nav aria-label="Page navigation example" className="mt-10">
  <ul className="inline-flex -space-x-px">
    <li>
      <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>



        </>
    )
}
























































