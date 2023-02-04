import  { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';


export default function ProjectSelect() {

    const [projects,setProjects] = useState<String[]>([]);

    useEffect(() => {
        setProjects(['33 French Street' ,  'Bromley', 'West Wickham' ," Willoughby Road" , 'Watford Project'  , "NW9 - Bathroom"])
      },[])


  return (
    <>
    <Form.Select  >
      {
          projects.map( (x : any,y : any) => <option key={y}>{x}</option> )
      }
      
    </Form.Select>

  </>
  )
}
