import React from 'react'
import TaskList from './tasklist/TaskList'
import Streak from './streak/Streak'
import TaskDisplay from './taskdisplay/TaskDisplay'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Today.css'


function Today() {
  let [stat,statset] = useState(0)

  
  let setstat=()=>
  {
    statset(1)
  }
  let resetstat=()=>
  {
    statset(0)
  }
  let navigate=useNavigate()
  let gotoAnalytics=()=>
  {
      navigate('/analytics')
  }


















  return (
    <div className='container todays '>
      <TaskList setstat={setstat} stat={stat} resetstat={resetstat}></TaskList>
      <TaskDisplay stat={stat} resetstat={resetstat} setstat={setstat} gotoAnalytics={gotoAnalytics}></TaskDisplay>
      <Streak></Streak>
    </div>
  )
}

export default Today