import React from 'react'
import style from "./channelCard.module.css"
import { Seen } from "../../image/icons/icons"
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_CHANNEL } from "../../redux/actions/actions"

export default function ChannelCard({channel}) {
    const dispatch = useDispatch()
    const selectedChannel=useSelector(state=>state.selectedChannel)
    
    return (
        <div onClick={()=>{dispatch(SELECT_CHANNEL(channel.userId))}} className={selectedChannel === channel.userId ? style.cardContainerSelected : style.cardContainer} >
            <div className={style.avatarCont}>
                <span className={style.avatar} >
                    <img src={`${process.env.REACT_APP_API}${channel.avatar}`} alt="profile" />
                </span>
            </div>
            <div className={style.cardetc} >
                <span className={style.channelName} >
                    <span>{channel.username}</span>
                    <span className={style.time}> <Seen /> 10:45</span>
                </span>
                <span className={style.lastMessage} >
                    John: Hey, i just want to...
                </span>
                
            </div>
        </div>
    )
}
