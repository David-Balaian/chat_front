import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from "react-router"
import style from "./profile.module.css"
import MessageBox from "../messagebox/MessageBox"
import ProfileHeader from "./profileHeader/profileHeader"
import Channels from "./channels/channels"
import Messages from "./messages/messages"
import { useSelector, useDispatch } from 'react-redux'
import { SELECT_CHANNEL } from '../redux/actions/actions'


export default function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state=>state.user)
    const [selectedChannel, setSelectedChannel] = useState("")
    const [allChannels, setAllChannels] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        if(!currentUser){
            history.replace("/")
        }else{
        // setCurrentUser(location.state.user.userInfo)
        axios.get(`${process.env.REACT_APP_API}/getChannels`,{
            params:{
                id: currentUser.userInfo.userId
            }
        })
        .then((res)=>{
            setAllChannels(res.data)
            console.log('allchannels', res.data)
            dispatch(SELECT_CHANNEL(res.data[0].userId))
        })
        .catch((err)=>{
            console.log('err', err)
            alert("error from server")
        })
    }

    },[])

    

    return (
        <div>
            <ProfileHeader/>
            <div className={style.container} >
                <Channels allChannels={allChannels}/>
                {/* <Messages /> */}
                <MessageBox messages={messages} allChannels={allChannels} />
            </div>
        </div>
    )
}
