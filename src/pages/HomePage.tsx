import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLogin } from '../features/auth/authSlice';
import { Dispatch } from 'redux';
import useAxiosPrivate from '../hooks/usePrivateRoute';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';


export default function HomePage() {

  const [projects,setProjects] = useState<String[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [inProgress , setInProgress] =  useState(false)
  const [projectSelectDisabled,setDisabled] = useState(false)
  const [currentTaskID, setCurrentTaskID] = useState('')
  const [buttonState,setButtonState] = useState(true)
  const [user,setUser] = useState('')
  const [disableTimer,setDisableTimer] = useState(true)

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch: Dispatch<any> = useDispatch();
    
  // redux state state
  const auth = useSelector((state: any) => state.auth);

  
  const getLastTask = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get('time/lasttask',
        {
          signal: controller.signal
        });
        setDisableTimer(true)
        setCurrentTaskID(response.data.taskId)
        setSelectedProject(response.data.project)
    }
    catch (err)
    {
      setDisableTimer(false)
      console.log(err)
    }
  }

  const startClock = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      console.log(selectedProject)
      const response = await axiosPrivate.post('time/entry',{project: selectedProject},
        {
          
          signal: controller.signal
        });
      setDisableTimer(true)
      setCurrentTaskID(response.data.entry._id)
      setSelectedProject(selectedProject)
    }
    catch (err)
    {
      
    }
  }

  const stopClock = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.put(`time/entry/${currentTaskID}`,
        { 
          signal: controller.signal
        });


    }
    catch (err)
    {
      
    }
  }

  const getUser = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get('user/private',
        { 
          signal: controller.signal
        });

    setUser(response.data.name)    
    }
    catch (err)
    {
      console.log(err)
    }
  }

  useEffect(() =>
  {   
    if (auth.isAuthenticated) {
        
        let isMounted = true;
        const controller = new AbortController();
        setSelectedProject('')
        //get last task

        getUser();
        getLastTask();



        setProjects(['33 French Street' ,'Bromley', 'West Wickham' ,"Willoughby Road" , 'Watford Project'  , "NW9 - Bathroom"])
      
        return () => {
          isMounted = false;
          controller.abort();
        }
            
      }
      else
      {
        navigate('/login')
        dispatch(isUserLogin());
        
      }
  },
    [auth ]);

    const onChange = (event: any) =>
  {
    setSelectedProject(event.target.value);
    setDisableTimer(false)
  }


  const handleStartClock =  async () => {
    setDisabled(true);
    startClock();
    //window.location.reload()
  }

  const handleStopClock =  async () => {
    setDisabled(true)
    //setButtonState(!buttonState)

    stopClock()

    setSelectedProject('')
    setCurrentTaskID('')
    setDisabled(false)
  }


  return (
    <>
    <h2 style={{padding: 40 }}>Welcome  {user}</h2>
      <Form.Label >
        Select Project
      </Form.Label>
      <Form.Select disabled={projectSelectDisabled || (currentTaskID.length >  0)} placeholder="Choose Location" onChange={onChange} >
        {(currentTaskID.length >  0) ?
         <option >{selectedProject}</option>
         :
        <option selected value={''} >Select Project </option>}
        {
            projects.map( (x,y) => <option key={y}>{x}</option> )
        }
      </Form.Select>
      <Button type="button" onClick={handleStartClock} disabled={ disableTimer||(selectedProject.length === 0) || (currentTaskID.length > 0)} style= {{margin : 25  , backgroundColor :'#0a2f42' , border : 0}}>Clock In</Button>
      <Button type="button" onClick={handleStopClock} disabled={ (selectedProject.length === 0)  || (currentTaskID.length <=0)} style= {{margin : 75  , backgroundColor :'#0a2f42' , border : 0}}>Clock Out</Button>
      <Form.Label>
        {currentTaskID}
      </Form.Label>
      <Form.Label>
        {selectedProject}
      </Form.Label>
    </>
  );
}


