import React from 'react'
import './MainPage.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function MainPage() {
  let navigate=useNavigate();
  let date= new Date();

  
  
  let goToToday=()=>
  {
    navigate('/today')
    axios.post("http://localhost:4000/today ", {date: date.getDate(),
     year:date.getFullYear(),
     month:date.getMonth(),
     day:date.getDay()})
      
    .then((response)=>
    {
      console.log(response)
    })
    .catch((err)=>
    {
      console.log(err)
    })

  }

return (
    <div className='main-page'>
      <div className='display-2 main-text bg-white bg-opacity-75 p-2 m-2 text-center m-auto '>
        <p>Time is Precious</p>
        <p>Plan it Wisely</p>
      </div>
      <div className = ' display-2  bg-white bg-opacity-75 p-2 m-2 text-center m-auto main-sub-text '>
        <p>Plan With TodoApp</p>
      </div>
      <button className = ' button-main bg-white bg-opacity-75 p-2 m-2 text-center m-auto ' onClick={goToToday} >
        Plan Today</button>


    








      
    </div>
  )
}

export default MainPage