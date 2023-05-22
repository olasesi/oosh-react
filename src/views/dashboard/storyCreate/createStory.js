import { Link } from "react-router-dom"


export const CreateStory = () => {





    return (
        <>

            <div className="md:flex justify-center space-y-6 md:space-y-0 gap-12 md:h-screen">
                <div  className="md:w-1/2 xl:w-1/4  h-96 md:h-[60%] py-auto rounded-xl bg-orange-600">
                    <Link to="text-story" >
                        <div >
                            <div className="w-full text-center md:mt-[50%] space-y-3">
                                <i class="fa-solid fa-notes-medical bg-white py-6 px-7 text-xl mx-auto text-blue-700 rounded-full m-auto"></i>
                                <p className="text-xl text-white font-semibold">Create a Photo Story</p>
                            </div>
                        </div>
                    </Link>
                </div>


                <div className="md:w-1/2 xl:w-1/4  h-96 md:h-[60%] rounded-xl bg-blue-700">
                    <div className="w-full text-center md:mt-[50%] space-y-3">
                        <i class="fa-solid fa-font bg-white py-6 px-7 text-xl mx-auto text-blue-700 rounded-full m-auto"></i>
                        <p className="text-xl text-white font-semibold">Create a Text Story</p>
                    </div>
                </div>
            </div>

        </>
    )
}