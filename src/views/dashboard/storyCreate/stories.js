import { useState } from "react";
import { Outlet } from "react-router-dom"
import { StorySettings } from "../../../components/story/storySettings";



export const StoriesCreate = () => {



    const [showCreateStry, setshowCreateStry] = useState(false);



    const showCreateStory = () => {
        setshowCreateStry(!showCreateStry)
    }





    return (
        <>

            <div className="space-y-10">
                <div className="flex justify-between">
                    <div className="text-3xl font-bold">Your Story</div>
                    <div onClick={showCreateStory} className="cursor-pointer"><i class="fa-solid fa-gear text-4xl"></i></div>
                </div>

                {
                    showCreateStry && (<StorySettings showCreateStory={showCreateStory} />)
                }

                <div>
                    <Outlet />
                </div>
            </div>

        </>
    )
}