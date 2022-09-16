import { reverse } from 'named-urls';
import React, { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Unity, { UnityContent } from "react-unity-webgl";
import useFileReader from '../../../Hooks/useFileReader';
import routes from '../../../routes/routes';
import { getEvent, updateRoom, uploadMedia } from '../../../Services/Events';
import { asset, notification } from '../../../Util/helpers';
const unityContext = new UnityContent(
    "build/couldyoutellv17.json",
    "build/UnityLoader.js"
    );

function EditRoom() {
    let [event,setEvent] = useState({});
    let [roomCalled,setRoomCalled] = useState(0);
    let navigate = useNavigate();
    let {getThumbnail,getBase64} = useFileReader();
    let {id} = useParams();
    useLayoutEffect(()=> {
        fetch()
    },[]);
    const fetch = async ()=> {
        let {event} = await getEvent(id);
        setEvent(event);
    };
    window.CallMe = async () => {
        if(roomCalled > 0 && event?.room_data != null){
            return;

        }
        setTimeout(()=> {
            let room_data = event?.room_data?JSON.stringify(event?.room_data): JSON.stringify({});
            if(event?.room_data == null){
                unityContext.send('GameManager', 'SelectRoom', event?.event_category?.room_index);
            }else{

                //for loading the json for host to edit the room after making it.                
                unityContext.send('GameManager', 'EditRequestFromWeb', room_data);
            }
            setRoomCalled(roomCalled + 1);
        },1000);
    };
    const onImageHandler = async (e)=> {
        try {
            let {message : image,status} = await uploadMedia(id,{file : e.target.files[0]});
            let url = asset(`uploads/${image}`);
            console.log(url);
            unityContext.send('GameManager', 'ChangeImage',url); 
        } catch (error) {
                console.log(error);
                notification(error?.message);
        }
    };
    const onVideoHandler = async (e)=> {
        try {
            let {message : video,status} = await uploadMedia(id,{file : e.target.files[0]});
            let url = asset(`uploads/${video}`);
            console.log(url);
            unityContext.send('GameManager', 'ChangeVideo',url); 
        } catch (error) {
                console.log(error);
                notification(error?.message);
        }
    };
    window.ChangeImage = () =>{
            let input = document.createElement('input');
            input.setAttribute('type','file');
            input.click();
            input.onchange = onImageHandler
            /* var text;
            var url = prompt("Please enter url of an image:", "URL");
            if (url == null || url == "") 
            {
                text = "User cancelled the prompt.";
            } 
            else 
            {
                text = url;
                //send request back to unity with a string(URL of Image) as an argument.
            }
            */
        }

        window.ChangeVideo = ()=>
        {
           /*  var text;
            var url = prompt("Please enter url of an video:", "URL");
            if (url == null || url == "") 
            {
                text = "User cancelled the prompt.";
            } 
            else 
            {
                text = url;
                //send request back to unity with a string(URL of Image) as an argument.
                unityInstance.SendMessage('GameManager', 'ChangeVideo',text);
            } */
            let input = document.createElement('input');
            input.setAttribute('type','file');
            input.click();
            input.onchange = onVideoHandler;
        }
    const CallSave = () => {
        unityContext.send('GameManager', 'Save');
    }
    // 
    window.ViewImages = () => 
        {
            //sending request back to unity with a string or json.
            //unityInstance.SendMessage('GameManager', 'UploadImage',imageJson);

        }
    window.PrintJson = async (json) => {
        json = JSON.parse(json)
        console.log(json);
        updateRoomDetail(json);
        
    };
    
    const updateRoomDetail = async (room_data)=>{

        try{
            let {message} = await updateRoom(id,{ room_data});  
            notification(message);
            navigate(reverse(routes.eventDetail,{ id }));
        }catch(error){
                console.log(error);
                notification(error);
        }
    }
    return (
        <>
            <section className="virtual-events text-white">
                <div className="container-fluid pb-5 pt-3">
                    {/* UPCOMING EVENTS */}
                    <div className="row align-items-start justify-content-between">
                        <div className="col-12 mb-4">
                            <h1 className="heading-lvl-one d-flex align-items-center">Make It Your Own</h1>
                        </div>
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mx-auto">
                            <Unity style={{width: '1280px', height: '720px', margin: 'auto'}} unityContent={unityContext} />
                        </div>
                        <div className="col-12 text-center">
                            {/* GIFTS FROM GUESTS */}
                            <button onClick={(e)=> CallSave()} type="button" className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3">Save Changes</button>
                            <Link to={reverse(routes.eventDetail,{ id })} type="button" className="grey-btn-outline d-inline-block my-4 eq-width-btn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditRoom