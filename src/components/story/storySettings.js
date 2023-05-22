


export const StorySettings = (props) => {


    let { showCreateStory } = props;



    return (
        <>

            <div className="absolute top-0 left-0" >
                <div className="inset-0 fixed bg-slate-800 w-screen z-50 h-[100vh] bg-opacity-60 flex items-center px-3">

                    <div className="shadow shadow-slate-400 rounded-lg space-y-4 bg-white mx-auto w-full lg:w-2/3 2xl:w-1/2 ">
                        <div className="flex justify-between items-center  2xl:px-8  border-b py-4  px-4 md:px-6">
                            <div>
                                <h2 className="text-sm 2xl:text-xl font-bold">Story Settings</h2>
                            </div>

                            <div>
                                <button onClick={showCreateStory} className="text-orange-600 text-lg 2xl:text-2xl"><i class="fa-solid fa-circle-xmark"></i></button>
                            </div>
                        </div>

                        <div className="py-4 space-y-6 px-4 md:px-6">
                            <div>
                                <h3 className="text-lg font-semibold">Who has access to your story?</h3>
                                <p>On Oosh, your story will be displayed for 24 hours.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div><input type="radio" /></div>
                                    <p>Public</p>
                                </div>

                                <div className="flex gap-4">
                                    <div><input type="radio" /></div>
                                    <p>Friends</p>
                                </div>


                                <div className="flex gap-4">
                                    <div><input type="radio" /></div>
                                    <p>Only me</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}