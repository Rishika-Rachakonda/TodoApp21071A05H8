import React from 'react'
import './Streak.css'
import axios from 'axios'
import { useEffect,useState } from 'react'
import date from 'date-and-time';



 function Streak() {

//count state
let [count,setCount]=useState()
//Error stae
let [err,setError]=useState('')
  //lastDate state
  let [lastdates ,lastsetdates]=useState([])
  //presentDate state
  let [presentdates ,lastpresentdates]=useState([])
  //http request to get dates

        useEffect(()=>
        {
          axios.get(" http://localhost:4000/today")
          .then((response)=>
          {
            setError('')
            console.log(response.data[0]);
            lastpresentdates(response.data[response.data.length - 1])
            lastsetdates(response.data[response.data.length - 2])
            getcount()
           
  
  
            
            
          })
          .catch((err) =>{
            console.log(err)
            if (err.response)
            {
                setError(err.message)
            }
            else if (err.request)
            {
                setError(err.message)
            }
            else 
            {
              setError(err.message)
      
            }
          })
        },[])
   

    let getcount=()=>
    {
      axios.get(" http://localhost:4000/count")
        .then((response)=>
        {
          setError('')
          console.log(response.data[0].count);
          setCount(response.data[0].count)
          
          
          
          
          
        })
        .catch((err) =>{
          console.log(err)
          if (err.response)
          {
              setError(err.message)
          }
          else if (err.request)
          {
              setError(err.message)
          }
          else 
          {
            setError(err.message)
    
          }
        })
    }



    let patch=(counter)=>
    {
      console.log(count);
      axios.patch("http://localhost:4000/count/1",{count:counter})
      .then((res)=>
      {
        setError('')
        getcount()

      })
      .catch((err) =>{
        console.log(err)
        if (err.response)
        {
            setError(err.message)
        }
        else if (err.request)
        {
            setError(err.message)
        }
        else 
        {
          setError(err.message)
  
        }
      })

    }

   
     //flag state 
    let [flag,setflag]=useState(0)
    let counter=()=>
    {
      if(presentdates.date === lastdates.date+1 && presentdates.month===lastdates.month && presentdates.year==lastdates.year && flag===0)
      {
       
        console.log(count)
        patch(count+1);
        setflag(1);
        console.log(count)
        
      }
      else if(presentdates.date === lastdates.date && presentdates.month===lastdates.month && presentdates.year==lastdates.year && flag===0)
      {
        setflag(1);
        setCount(count);
        console.log(count)

        
      }
      else if(presentdates.date >= lastdates.date+1 && presentdates.month===lastdates.month && presentdates.year==lastdates.year && flag===0)
      {
        setflag(1);
        setCount(0);
        patch(1);
        patch()
      }

    }
    
   
   
        

//current date
let dat=new Date()


  return (
    <div className=''>
      {/**Error rendering */}
      {err.len!=0 && <p className='text-Danger'>{err}</p>}

      {/**Streak reset Button */}
      <br></br>
      
      <button className='btn btn-dark  st-btn' onClick={counter}> Click for streak </button>
     
      

     <div className='strek'>
     <div className='day'>
        <p>{date.format(date.addDays(dat,-6),'dd')}</p>
      
      {count>=7? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day'>
        <p>{date.format(date.addDays(dat,-5),'dd')}</p>
      
      {count>=6? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day'>
        <p>{date.format(date.addDays(dat,-4),'dd')}</p>
      
      {count>=5? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day'>
        <p>{date.format(date.addDays(dat,-3),'dd')}</p>
      
      {count>=4? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day' >
        <p>{date.format(date.addDays(dat,-2),'dd')}</p>
      
      {count>=3? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day'>
        <p>{date.format(date.addDays(dat,-1),'dd')}</p>
      
      {count>=2? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>
      <div className='day'>
        <p>{date.format(dat,'dd')}</p>
      
      {count>=1? 
      <img  className='sun-img'  src='data:image/png;base64,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'></img>:
      <img src='https://www.freepnglogos.com/uploads/circle-png/circle-outline-blank-png-icon-download-16.png' className='sun-img'></img>
   
      }
      </div>


     </div>
      
      
    

</div>
  )
}

export default Streak