import dp from '../../assets/dp.png'



export const CreatePost = (props) => {


    let { showCreatePost } = props;


    return (
        <>

            <div className="absolute top-0 left-0" >
                <div className="inset-0 fixed bg-slate-800 w-screen z-50 h-[100vh] bg-opacity-60 flex items-center px-3">

                    <div className="shadow shadow-slate-400 rounded-lg space-y-4 bg-white mx-auto w-full lg:w-2/3 2xl:w-1/2 ">
                        <div className="flex justify-between items-center  2xl:px-8  border-b py-4  px-4 md:px-6">
                            <div>
                                <h2 className="text-sm 2xl:text-xl font-bold">Create Post</h2>
                            </div>
                            <div className="flex gap-3 items-center text-xs 2xl:text-base">
                                <p>Visible for</p>
                                <select className="bg-slate-100 focus:outline-white px-6 py-2">
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
                                    <img src={dp} alt="img" className='w-12 rounded-full' />
                                </div>

                                <div className='flex-1'>
                                    <div className="flex justify-center flex-1 ">

                                        <textarea rows="6" className="w-full pl-8 py-3 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:focus:shadow-outline-gray  focus:placeholder-gray-500 focus:bg-white focus:border-orange-300 focus:outline-none focus:shadow-outline-purple form-input" type="text" placeholder="What’s happening?" />

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

        </>
    )
}