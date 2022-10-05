import React from "react"
import {Link} from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./Header.css";

function Header() {
    const userIsStaff = true

    return (
        <>
        <div className="headerContainer">
        <div className="brandingLeft">
            <div>
                <p>Logo</p>
            </div>
        </div>
        {/* <div className="searchBar">
          <Route
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>
        </div> */}
        

        <div className="headerRightContainer">
        {userIsStaff === 'staff' ? (
            <div className="nav-links">

              <Link to="/" className="headerLink">Home</Link>
              <Link to="/roles" className="headerLink">Roles</Link>
              <Link to="/courses" className="headerLink">Courses</Link>

            </div>
        ) : ( userIsStaff === 'manager' ?
            <div className="nav-links">
              <Link to="/" className="navbarLink">Home</Link>
              <Link to="/roles" className="navbarLink">Roles</Link>
              <Link to="/courses" className="navbarLink">Courses</Link>
              <Link to="/teams" className="navbarLink">Teams</Link>

            </div> : 
            <div className="nav-links">
                <Link to="/" className="headerLink">Home</Link>
                <Link to="/roles" className="headerLink">Roles</Link>
                <Link to="/courses" className="headerLink">Courses</Link>
                <div className="dropdown">
                

                <Link to="/teams" className="headerLink">Systems</Link>
                <div className="dropdown-content">
                        <Link to="/" className="dropdownLink">Role Maintenance</Link>
                        <Link to="/" className="dropdownLink">Skill Maintenance</Link>
                        <Link to="/SkillAssignment" className="dropdownLink">Skill Assignment</Link>
                        <Link to="/SkillMaintenance" className="dropdownLink">Skill Maintenance</Link>
                </div>
                <button className="dropbtn"><KeyboardArrowDownIcon  /></button>
                </div>
          
            </div>
        ) 
    
    }
    <div>
        <p>Staff Name</p>
    </div>
        </div>
      </div>
    
      </>
    )
}

export default Header