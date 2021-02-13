import axios from 'axios';
import React, { useState, useEffect } from 'react'
import style from "./messageBoxHeader.module.css"
import { Info } from "../../image/icons/icons"

export default function MessageBoxHeader({selectedChannel}) {

    const [channelHeader, setChannelHeader] = useState({})

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/getChannel`, {
          params: {
              id:selectedChannel
            }
        })
        .then((res) => {
          setChannelHeader(res.data)
        })
        .catch((err) => {
          console.log("err", err);
        });
    }, [selectedChannel])

    return (
        <div className={style.container}>
            <span className={style.headerAvatar} >
                <img src={`${process.env.REACT_APP_API}${channelHeader.avatar}`} alt="channel" />
            </span>
            <div className={style.headerEtc}>
                <span className={style.name}>
                    {channelHeader.username}
                </span>
            </div>
            <span className={style.infoIcon} >
                    <Info />
                </span>
        </div>
    )
}
