

export const TextStory = () => {
    return (
        <>
            <div className="md:flex justify-center space-y-6 md:space-y-0 gap-12 md:h-screen">
                <div className="md:w-1/2 xl:w-1/4 h-96 md:h-[60%] py-auto rounded-xl  space-y-4">

                    <div className="shadow-md shadow-slate-300 h-1/2 rounded-xl"></div>
                    <div className="shadow-md  shadow-slate-300 h-1/2 rounded-xl"></div>

                    <div className="flex justify-between">
                        <div>
                            <button className="px-6 py-2 border-2 rounded-lg">Discard</button>
                        </div>
                        <div>
                        <button className="px-6 py-2 text-white rounded-lg bg-orange-600">Add to story</button>

                        </div>
                    </div>

                </div>

                <div className="md:w-1/2 xl:w-1/4  h-96 md:h-[60%] rounded-xl bg-blue-700">
                    <div className="w-full text-center md:mt-[50%] space-y-3">
                        <textarea type="text" rows="10" className="text-white  focus:outline-none bg-transparent border-none text-2xl font-semibold text-center" placeholder="Start typing..."></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}