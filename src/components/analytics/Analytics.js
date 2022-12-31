import React from 'react'
import './Analytics.css'
import axios from 'axios' 
import {useState,useEffect} from 'react'

function Analytics() {

  //history todo State

  let [history,sethistory] =  useState([])

  useEffect(()=>
  {
    axios.get("http://localhost:4000/completedTodo")
    .then((response)=>
    {
        console.log(response);
        if(response.status===200)
        {
          sethistory(response.data)
        
        }
    })

  },[])














  return (
    <div className='container analytic'>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
                <th>Task Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Cateogery</th>
                <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              history.map((historyObj)=><tr key={historyObj.id}>
                    <td>{historyObj.taskname}</td>
                    <td>{historyObj.starttime}</td>
                    <td>{historyObj.endtime}</td>
                    <td>{historyObj.cateogery}</td>
                    <td>{historyObj.status}</td>



              </tr>)
            }
          </tbody>
        </table>

      </div>




    </div>
  )
}

export default Analytics