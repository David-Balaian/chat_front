import React, {useState} from "react"
// import './App.css';
import Axios from "axios";
import {useHistory} from "react-router"
import style from "./login.module.css"
import { useDispatch } from "react-redux";
import { LOG_IN } from "../redux/actions/actions"

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("user_1")

  const login = () => {
    Axios.post(`${process.env.REACT_APP_API}/authenticate`, {
      userName,
    })
    .then((res)=>{
      console.log(res)
      dispatch(LOG_IN(res.data))
      history.push({
        pathname: "/profile",
      })
  }).catch((error)=>{
    console.log('error', error)
  })
  }


  return (
    <div className={style.container}>
      <div className={style.inputsCont} >
        <div className={style.largeText} >Getting Started</div>
        <div className={style.smallText} >Just enter your username, click connect button and start</div>
        <input className={style.input} value = {userName} onChange={(e)=>{setUserName(e.target.value)}} />
        <button disabled={!userName} className={style.loginButton} onClick={login} >Connect</button>
      </div>
    </div>
  );
}

export default App;
