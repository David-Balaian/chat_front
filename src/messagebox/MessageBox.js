import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import style from "./messageBox.module.css"
import { AttachFile, Send } from "../image/icons/icons"
import MessageCard from "./messacgeCard/messageCard"
import MessageBoxHeader from "./messageBoxHeader/messageBoxHeader"

export default function MessageBox(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const selectedChannel = useSelector((s) => s.selectedChannel);
    const currentUser = useSelector((s) => s.user);
    const messagesContainerRef = useRef()

  const handleSend = () => {
    axios
      .post(`${process.env.REACT_APP_API}/sendMessage`, {
        sender: currentUser.userInfo.userId,
        message: message,
        destinationUserId:selectedChannel,
        currentUserId: currentUser.userInfo.userId
      })
      .then((res) => {
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    selectedChannel &&
      currentUser &&
      props.allChannels.length &&
      axios
        .get(`${process.env.REACT_APP_API}/getMessages`, {
          params: {
            currentUserId: currentUser.userInfo.userId,
            destinationUserId: selectedChannel,
          },
        })
        .then((res) => {
            let { data } = res
            if(typeof (data) === "string"){
                data = JSON.parse(data)
                data = data.map(item=>{
                    let sender = props.allChannels.find(x=>x.userId===item.sender)
                    let senderName = sender ? sender.username : currentUser.userInfo.username
                    let senderAvatar = sender ? sender.avatar : currentUser.userInfo.avatar
                    return {
                        ...item,
                        senderName,
                        senderAvatar
                    }
                })
            }
            setMessages(data)
            messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight)
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [selectedChannel, currentUser, props.allChannels]);



  return (
    <div className={style.container}>
        <MessageBoxHeader selectedChannel={selectedChannel} />
      <div ref={messagesContainerRef} className={style.messagesContainer}>
        {messages.length
          ? messages.map((message) => {
              return (
                  <MessageCard
                    message = {message}
                  />
              );
            })
          : null}
      </div>
      <div className={style.inputCont}>
        <button disabled={!selectedChannel} className={style.iconBuutton}>
            <AttachFile />
        </button>
        <input
        disabled={!selectedChannel}
          className={style.input}
          value={message}
          placeholder="So let’s share"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button disabled={!message} className={style.iconBuutton} onClick={handleSend}>
            <Send />
        </button>
      </div>
    </div>
  );
}
