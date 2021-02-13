import React, { useState } from 'react'
import style from "./channels.module.css"
import { SearchMessage } from "../../image/icons/icons"
import ChannelCard from "./channelCard"

export default function Channels(props) {

    const [search, setSearch] = useState("")


    return (
        <div className={style.container} >
            <div className={style.searchBar} >
                <input className={style.searchInput} placeholder="Search for channels" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <span className={style.searchMessage} >
                    <SearchMessage />
                </span>
            </div>
            <div className={style.channelsContainer} >
                {props.allChannels.map((channel)=>{
                    return <ChannelCard key={channel.userId} channel={channel} />
                })}
            </div>
        </div>
    )
}
