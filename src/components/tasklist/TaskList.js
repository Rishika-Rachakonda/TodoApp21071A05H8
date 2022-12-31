import React ,{useState}from 'react'
import './TaskList.css'
import {useForm} from 'react-hook-form'
import {BsPlusCircle} from 'react-icons/bs'
import axios from 'axios'
function TaskList(props) {
  
  //error state
  let [err,setError]=useState("")
  //useForm hook
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  let addNewTodo=(newtodo)=>
  {
    
    console.log(newtodo)
    axios.post('http://localhost:4000/todo',newtodo)
    .then((response)=>
    {
       if(response.status===201)
       {
        props.setstat();
        
        reset();
        
        setError("")
        console.log(response)
       }
    })
    .catch((err)=>
    {
      if(err.response)
      {
        setError(err.message)
      }
      else if(err.request)
      {
        setError(err.message)
      }
      else
      {
        setError(err.message)
      }
    })
    


  }















  return (
    <div className='tablist container'>
      
      
      {/**error rendering */}
      {err.len!==0 && <h1 className='fw-5 display-2 text-center text-danger'>{err}</h1>}
    


      <form onSubmit={handleSubmit(addNewTodo)}>
      
        <div className=' disp   p-2 '>
          
        
          
          {/**Task */}

          <div >
          <label 
          htmlFor='taskname'>Task Name</label>
          <br></br>
          <input  type='text' placeholder='task Name'
          id='taskname' className='form-control'
          {...register('taskname',{required:true})}></input>
            {/**Task Validation */}
            {errors.taskname?.type==='required' && <p className='text-danger '>*Task Name Required</p>}
          
          </div>



          {/**Start time */}
          <div >
          <label 
          htmlFor='starttime'>Start Time</label>
          <br></br>
          <input  type='time' 
          id='starttime' className='form-control'
          {...register('starttime',{required:true})}></input>

          {/**start time validatio */}
          {errors.starttime?.type==='required' && <p className='text-danger'>*Start Time required</p>}
          </div>
          


          {/**End time */}
            <div   >
            <label htmlFor='endtime'>End Time</label>
            <br></br>
            <input  type='time' className='form-control' id='endtime' 
            {...register('endtime',{required:true})}></input>
            {/**Endtime validation */}
            {errors.endtime?.type==='required' && <p className='text-danger'>*End time required</p>}
            </div>
            {/**Cateogery */}
           <div>
           <label htmlFor='cateogery'>cateogery</label>
           <br></br>
           <select defaultValue={'DEFAULT'}  className='form-select'
           {...register('cateogery')}>
            <option value='DEFAULT' disabled>Select cateogery</option>
            <option vlaue='Personal' >Personal</option>
            <option vlaue='Exercise'>Exercise</option>
            <option vlaue='Study'>Study</option>
            <option vlaue='Sports'>Sports</option>
            <option vlaue='Others'>Others</option>
           </select>
          
           </div>


          {/**Status */}
         <div>
         <label className=''>Status</label>
         <br></br>
         <select className='form-select'  
         {...register('status')}>
          <option value='default' disabled>Choose Status</option>
          <option value='pending'>Pending</option>
          <option value='ongoing'>Ongoing</option>
      
         </select>
         {/**status Validation */}
         {errors.status && <p className='text-danger'>*Choose status</p>}

 
          </div>
          
          <button type='submit'  className='btn ' ><BsPlusCircle className='sub-button'></BsPlusCircle></button>
        
          

      
      
         
        </div>
        </form>
        




      
     
      
     
      





    </div>
  )
}

export default TaskList