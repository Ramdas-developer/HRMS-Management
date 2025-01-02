import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  };

  const handleLogout = () =>{
    if(location.pathname !== "/login"){
      navigate('/login')
    }
  }

  return (
    <aside className="sidebar">
      <div className='logo-container'>
      <img src="/Hrms logo.webp" alt="logo"  className='logo' onClick={handleLogoClick} style={{cursor:"pointer"}} />
         
      </div>
      <nav>
        <p>Recruitment</p> 
        <ul>
          <li>
            <Link to="candidate" style={{textDecoration:'none', color:'black'}} >Candidates</Link>
          </li>
        </ul>
        <p>Organization</p>
        <ul>
          <li>
          <Link to="employees" style={{textDecoration:'none', color:'black'}} >Employees</Link>
          </li>
          <li>Attendance</li>
          <li>Leaves</li>
        </ul>
        <p>Others</p>
        <ul>
          <li>
            <Link to="login" style={{textDecoration:'none', color:'black'}} onClick={handleLogout}>Log out</Link>
          </li>
        </ul>
      </nav>
    </aside>
    
  )
}

export default SideBar