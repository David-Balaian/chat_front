import React from 'react'
import style from "./messageCard.module.css"
import { parseDate } from "../../helpers/functions"
import { useSelector } from 'react-redux'

export default function MessageCard(props) {
    const currentUser = useSelector(s=>s.user)
    return (
            <div className={style.container} >
                <span className={style.avatar} >
                    <img src={`${process.env.REACT_APP_API}${props.message.senderAvatar}`} alt="profile" />
                </span>
                <div className={style.messageContainer} >
                    <div className={style.name} >
                            {props.message.sender === currentUser.userInfo.userId ? "You" : props.message.senderName }
                        <span className={style.time} >
                            {parseDate(props.message.time)}
                        </span>
                    </div>
                    <div className={style.message}>
                        {props.message.message}
                    </div>
                </div>
            </div>
    )
}
