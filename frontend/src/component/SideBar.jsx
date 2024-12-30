import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    
    <aside className="sidebar">
      <div className='logo-container'>
         <img src="/Hrms logo.webp" alt="logo"  className='logo'/>
      </div>
      {/* <h1 className="logo-title">
        <Link to="" style={{textDecoration:'none', color:'#6c63ff'}}>HRMS Dashboard</Link>
      </h1> */}
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
            <Link to="login" style={{textDecoration:'none', color:'black'}}>Log out</Link>
          </li>
        </ul>
      </nav>
    </aside>
    
  )
}

export default SideBar