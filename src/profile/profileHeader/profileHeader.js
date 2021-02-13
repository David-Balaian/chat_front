import React from 'react'
import style from "./profileHeader.module.css"
import { ArrowDown, Logo } from "../../image/icons/icons"
import { useSelector } from 'react-redux'

export default function ProfileHeader() {

    const currentUser = useSelector(state=>state.user)
    return (
        <div className={style.header} >
            <span className={style.logo} >
                <Logo />
            </span>
            <span className={style.userCont} >
                <span className={style.user} >
                    {currentUser && currentUser.userInfo.username}
                </span>
                <span className={style.avatar} >
                    {currentUser &&  currentUser.userInfo.username && currentUser.userInfo.username.match(/\b(\w)/g).join("")}
                </span>
                <ArrowDown />
            </span>
        </div>
    )
}
