//import React, {useState, useEffect} from 'react'
//import axios from "axios"
//import Swal from 'sweetalert2'
//import { useParams } from "react-router-dom";
//import '../spinner.css';


export const About = (props) => {
   
          return <section  className="space-y-8 lg:space-y-0 lg:flex gap-6">
                <section className='lg:w-1/2 shadow shadow-slate-400 rounded-lg p-6 space-y-3'>
                    <h2 className='font-bold text-2xl'>Contact</h2>

                    <div>
                        <h2 className="font-bold text-lg">Category</h2>
                        <p>{props.category}</p>
                    </div>

                    {props.pagecontact && 
                    <div>
                        <h2 className="font-bold text-lg">Mobile</h2>
                        <p>{props.pagecontact}</p>
                        
                    </div>
                    }

                  {props.email && 
                    <div>
                    <h2 className="font-bold text-lg">Email</h2>
                        <p>{props.email}</p>
                       
                    </div>
                    }

                    {props.website && 
                    <div>
                        <h2 className="font-bold text-lg">Websites</h2>
                        <p>{props.website}</p>
                    </div>
                    }
                </section>

                <section className='lg:w-1/2 shadow shadow-slate-400 rounded-lg p-6 space-y-3'>
                    <h2 className='font-bold text-2xl'>Details about {props.pagename}</h2>
                    <div>
                        <h2 className="font-bold text-lg">Creation date</h2>
                        <p>{props.createdat}</p>
                       
                    </div>

                  
                    <div>
                        <h2 className="font-bold text-lg">Description</h2>
                        <p>{props.description}</p>
                    </div>
                    
                </section>
            </section>
         



    
    
}