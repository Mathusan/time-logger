import {
    useState,
    useEffect
  } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { login } from '../features/auth/authSlice';
import Spinner from '../components/spinner/Spinner';

  
export default function Login()
{  
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useState(false);


  // redux state
  const auth = useSelector((state: any) => state.auth);
  
  const [fields, setFields] = useState<User>({
    phone: '',
    password: ''    
  });


  const onChange = (event: any) =>
  {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    // Submit form
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const user: User =
    {
      phone: fields.phone as string,
      password: fields.password as string
    }
    
    dispatch(login(user));
    setLoading(false)
  };
  
  useEffect(() =>
  {
    if (auth.isAuthenticated)
    {
      navigate('/');
    }
  }, [auth]);
  
  return (
    <>
      <div>
        <Form className={styles.form} onSubmit={handleLogin} >
              <h4 className={styles.title}>Login</h4>

          {/* email */}
          <Form.Group className="mb-4" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control required type="text" placeholder="Enter phone" name='phone' onChange={onChange} value={fields.phone} />
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
          </Form.Group>
              
          {/* submit btn */}
          <Button type="submit" className={styles.btn} style={{ backgroundColor: "#0a2f42", border: " none" }}>
            Submit
          </Button>

          {/* reponse error */}
          <h6 className={styles.error}>{auth.errMessage}</h6>
          {<Form.Label>{loading && <Spinner/>}</Form.Label> }
        </Form> 
      </div>
    </>
  )
}
  
   
  