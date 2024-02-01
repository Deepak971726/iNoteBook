import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';



const Login = (props) => {
    const initialState ={email:"",password:""};
    const [credintial, setcredintial] = useState(initialState)
    let history = useHistory();
    const handleOnSubmit= async(e)=>{
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`
        const response = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
            // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNzNiNmY2ZDNkMjVhMzA2MjZiMWQ5In0sImlhdCI6MTcwNjUwNzY4Nn0.T_Saqw7lh3uCRgfQHdqx0DVy3M23aI05zcarMWXsu4w"
          },
          body: JSON.stringify({email:credintial.email,password:credintial.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            console.log("token save kr diya login")
            localStorage.setItem( "token",json.authtoken)
            // console.log(localStorage.getItem('token'))
            props.showAlert("Your Note has been Updated Successfully","success");
            history.push('/');
            
        }
        else{
            // alert('please enter the valid credential')
            props.showAlert("Please Enter the valid credential","danger");

        }
        // console.log(credintial)


    }

    const handleOnChage=(e)=>{
        setcredintial({...credintial,[e.target.name]:e.target.value})
    }

     

  return (
    <div className='my-5'>
      <h1> Login to continue iNoteBook</h1>
      <form >
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credintial.email} name='email' onChange={handleOnChage}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credintial.password} onChange={handleOnChage} id="password"/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleOnSubmit}>Submit</button>
    </form>
    </div>
  )
}

export default Login
