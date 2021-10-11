import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {MdModeEditOutline} from 'react-icons/md'
import './UserCards.css'
const UserCards = (props) => {
    return (
        <div className=" bg-white text-sm w-3/12 h-auto m-10 p-3 rounded-lg relative card">
            <div className="flex justify-center items-center  mt-3 mx-auto w-40 h-40  rounded-full border-solid border-purple-600 border-8  img-box">{(props.userData.avatar) ? <img src={props.userData.avatar} alt="user"/>:''}</div>
            <div className="flex justify-center flex-col items-center mt-3">
                <div className="font-semibold text-lg colr">{props.userData.first_name} {props.userData.last_name}</div>
                 <div className="text-sm m-2 colr">{props.userData.email}</div>
            </div>
            <div className="icons-box">
                <AiFillDelete onClick={()=>props.Del(props.userData.id)}/>
                <MdModeEditOutline onClick={()=>props.update(props.userData)}/>
            </div>
        </div>
    )
}

export default UserCards
