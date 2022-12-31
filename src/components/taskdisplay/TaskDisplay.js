import React  from 'react'
import './TaskDisplay.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useForm } from 'react-hook-form'









function Taskdisplay(props) {
    
    
    //todo state
    let [todo,setTodo]=useState([])
    //http error state
    let [err,setErr]=useState('')
    //gettodos function
    let gettodos=()=>
    {
        axios.get('http://localhost:4000/todo')
        .then((response)=>
        {
            
            if(response.status===200)
            {
                
                props.resetstat()
                setTodo(response.data)
            }
        })
        .catch((err)=>
        {
            console.log(err)
            if(err.response)
            {
                setErr(err.response)
            }
            else if (err.request)
            {
                setErr(err.message)
            }
            else 
            {
                setErr(err.message)

            }
        })
    }
    //use effect
    useEffect(()=>{
        gettodos()

    },[])



//use form
let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm()
//Modal state
let [show,setShow]=useState(false)
//todo to eddit state
let [todotoedit,setedittodo]=useState({})

let showModal=()=>
{
    setShow(true)
}
 let closeModal=()=>
 {
    setShow(false)
 }
     
 let edittodo=(todoObjTobeEditied)=>
 {
    showModal()
    setedittodo(todoObjTobeEditied)
    //Fill input fields with user Details
    setValue('taskname',todoObjTobeEditied.taskname)
    setValue('starttime',todoObjTobeEditied.starttime)
    setValue('endtime',todoObjTobeEditied.endtime)
    setValue('cateogery',todoObjTobeEditied.cateogery)
    setValue('status',todoObjTobeEditied.status)


 }
 //error for put request
 let [errs,setErrs]=useState('')
 let savetodo=()=>
 {
    closeModal();
    
    //get modified user Data
    let modifiedTodo=getValues()
    
    //set Id for modified todo
    modifiedTodo.id=todotoedit.id;

   

    //http put request to save modified data
    axios.put(`http://localhost:4000/todo/${modifiedTodo.id}`,modifiedTodo)
    .then((response)=>{
        if(response.status===200)
        {
            props.setstat();
            setErrs("")
            console.log(response)
        }
    })
    .catch((err)=>
    {
      if(err.response)
      {
        setErrs(err.message)
      }
      else if(err.request)
      {
        setErrs(err.message)
      }
      else
      {
        setErrs(err.message)
      }
    })
    



 }

//http delete


let clearTodos=()=>
{
    

    
    for(let i of todo)
    {
        
        
        axios.delete(`http://localhost:4000/todo/${i.id}`)
        .then((response)=>
        {
          console.log(response.data)
          
        })
       .catch((err)=>
       {
          console.log(err)
       }) 
      

       i.id=undefined
       
       axios.post('http://localhost:4000/completedTodo',i)
        .then((response)=>
        {
            console.log(response.data)
        })
        .catch((err)=>
        {
            console.log(err);
        })
       
       
    }
    setTodo([])
    props.setstat()
   
}









  return (
    <div >
        

         {/**error rendering */}
      {err.len!==0 && <h1 className='fw-5 display-2 text-center text-danger'>{err}</h1>}
      
         {/**error rendering */}
      {errs.len!==0 && <h1 className='fw-5 display-2 text-center text-danger'>{errs}</h1>}
    

        {/**rendering table*/} 
        { props.stat===1 && gettodos()  }
        {/*display todos in table from */}
        <div className='table-responsive'>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Cateogery</th>
                <th>Status</th>
                <th>Edit</th>
            
            </tr>
        </thead>
        <tbody>
            {
                todo.map((todoObj)=>
                <tr key={todoObj.id}>
                    <td>{todoObj.taskname}</td>
                    <td>{todoObj.starttime}</td>
                    <td>{todoObj.endtime}</td>
                    <td>{todoObj.cateogery}</td>
                    <td>{todoObj.status}</td>
                    <td><button className='btn border btn-dark' onClick={()=>{edittodo(todoObj)}} >Update Status</button></td>
                </tr>
                )
            }
         
        </tbody>
        </table>
        </div>
        

        {/*Modal for Editing */}
        <Modal
        show={show}
        onHide={closeModal}
        backdrop='static'
        className='modal'
        >
            <Modal.Header>
                <Modal.Title>Edit todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/**Form To Edit */}
                <form  >
                {/**Task */}
                 <div >
                <label 
                htmlFor='taskname'>Task Name</label>
                <input  type='text' placeholder='task Name'
                id='taskname' className='form-control'
                {...register('taskname')}></input>
                </div>
                {/**Start time */}
                <div >
                <label 
                htmlFor='starttime'>Start Time</label>
                <input  type='time' 
                id='starttime' className='form-control'
                {...register('starttime')}></input>
                 </div>
          
                {/**End time */}
                <div>
                <label htmlFor='endtime'>End Time</label>
                <input  type='time' className='form-control' id='endtime' 
                 {...register('endtime')}></input>
                </div>
                {/**Cateogery */}
                <div>
                <label htmlFor='cateogery'>cateogery</label>
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
              <select className='form-select' defaultValue='Default' 
               {...register('status')}>
               <option value='Default'  disabled>Status</option>
              <option value='completed'>Completed</option>
              <option value='ongoing'>Ongoing</option>
              <option value='pending'>Pending</option>
              </select>
             </div>
          
        </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn border btn-dark' type='submit' onClick={savetodo}>Save</button>
          </Modal.Footer>
          </Modal>
         

          < button className='btn border float-end btn-dark mx-2' onClick={clearTodos}> Clear Everything</ button>
    
          <button className='btn border float-end btn-dark' onClick={props.gotoAnalytics}>History</button>




        
        


        
        
        








    </div>
  )
}

export default Taskdisplay