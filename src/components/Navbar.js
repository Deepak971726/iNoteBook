import React, { useEffect } from 'react'

import {Link,useHistory,useLocation} from "react-router-dom";

const Navbar=()=> {
  let location = useLocation();
  let history = useHistory();
  useEffect(()=>{
      // console.log("location change huaa ab useEffect ki baari",location.pathname);
      // location
  },[location]);
  const handleOnLogOut=()=>{
      localStorage.removeItem("token");
      history.push('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    {/* <Link className="navbar-brand" to="/"> Navbar <Link/> */}
    <Link className= "navbar-brand avtive" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link  ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        
        
      </ul>
       {!localStorage.getItem('token')?<form  className="d-flex">
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
        <Link className="btn btn-outline-primary mx-3"  to='/login' role='button'>Login</Link>
        <Link className="btn btn-outline-primary" to='/signup' role='button'>Sign Up</Link>
      </form>: <button className="btn btn-outline-primary mx-3"  onClick={handleOnLogOut}>Log Out</button>}

    </div>
  </div>
</nav>
  )
}

export default Navbar;