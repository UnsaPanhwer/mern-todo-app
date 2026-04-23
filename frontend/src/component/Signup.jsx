import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


function Signup(){
   const [userData,setUserData]= useState()
   const navigate= useNavigate();
   useEffect(()=>{
    if(localStorage.getItem('signup')){
navigate("/")
    }
   })
   const handleSignup= async()=>{
    console.log(userData);
    
      let result = await fetch("http://localhost:3400/signup", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    result = await result.json();

    if(result){
        console.log(result);
        document.cookie='token='+result.token
        localStorage.setItem("login",userData.email)
        navigate("/")
    }
    else{
        alert("Try after somtime")
    }
   }
    return(
        <div className="container">
            <h1>Signup</h1>

            <label htmlFor="">Name</label>
           <input onChange={(event)=>setUserData({...userData,name:event.target.value})} type="text" name="name" placeholder='Enter username' id="" />

             <label htmlFor="">Email</label>
           <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder='Enter email' id="" />
           
             <label htmlFor="">Password</label>
           <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="text" name="Password" placeholder='password' id="" />

            <button onClick={handleSignup} className="submit">Signup</button>
          <Link className='link' to="/login">Login</Link>
        </div>
    )
}
export default Signup;