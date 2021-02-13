import React, { useEffect, useState } from 'react'
import style from "./channelCard.module.css"
import { Seen } from "../../image/icons/icons"
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_CHANNEL } from "../../redux/actions/actions"
import axios from 'axios'
import socketIOClient from "socket.io-client";
import { parseDate } from '../../helpers/functions'


export default function ChannelCard({channel}) {
    const dispatch = useDispatch()
    const selectedChannel=useSelector(state=>state.selectedChannel)
    const currentUser = useSelector(state=>state.user)
    const [lasMessage, setLastMessage] = useState("")

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/getLastMessage`, {
          params: {
                currentUserId:channel.userId,
                destinationUserId:currentUser.userInfo.userId,
            }
        })
        .then((res) => {
            setLastMessage(res.data)
        })
        .catch((err) => {
          console.log("err", err);
        });
    },[])
useEffect(()=>{
    const socket = socketIOClient(process.env.REACT_APP_API);
    socket.on("lastMsg", data => {
        if(data.ids.includes(channel.userId) && data.ids.includes(currentUser.userInfo.userId)){
            setLastMessage(data.message)
    }
    });
    return ()=>{
      socket.disconnect()
    }
  });
    
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
                    <span className={style.time}> <Seen /> {parseDate(lasMessage.time)}</span>
                </span>
                <span className={style.lastMessage} >
                    <span>{lasMessage.sender === currentUser.userInfo.userId ? "You: " + lasMessage.message : lasMessage.message}</span>
                    {lasMessage && lasMessage.sender !== currentUser.userInfo.userId && <span className={style.unread}> 1 </span>}
                </span>
                
            </div>
        </div>
    )
}
