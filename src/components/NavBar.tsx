import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { logout } from '../features/auth/authSlice';

export default function NavBar()
{
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const logOut = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <Navbar style={{ backgroundColor: '#f7f7f7'  }}  expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "#0a2f42" }}>Home</Nav.Link>
            
            {isAuthenticated && isAuthenticated ? (
              <Nav.Link href="/login" onClick={logOut} style={{ color: "#0a2f42" }}>Logout</Nav.Link>
            ) : (
                <>
                  <Nav.Link href="/login" style={{ color: "#0a2f42" }}>Login</Nav.Link>
                  {/* <Nav.Link href="/register" style={{ color: "#0a2f42" }}>Register</Nav.Link> */}
                </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
