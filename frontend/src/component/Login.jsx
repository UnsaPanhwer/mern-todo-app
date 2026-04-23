import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


function Login(){
   const [userData,setUserData]= useState({})
   const navigate = useNavigate();
   useEffect(()=>{
    if (localStorage.getItem('login')){
        navigate("/")
    }
   })
   const handleLogin= async()=>{
    console.log(userData);
    
      let result = await fetch("http://localhost:3400/login", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    result = await result.json();

    if(result.success){
        console.log(result);
        document.cookie='token='+result.token
        localStorage.setItem("login",userData.email)
        window.dispatchEvent(new Event('localStorage-change'))
        navigate("/")
    } else{
        alert("Try after somtime")
    }
   }
    return(
        <div className="container">
            <h1>Login</h1>


             <label htmlFor="">Email</label>
           <input onChange={(event)=>setUserData({...userData,email:event.target.value})} type="text" name="email" placeholder='Enter email' id="" />
           
             <label htmlFor="">Password</label>
           <input onChange={(event)=>setUserData({...userData,password:event.target.value})} type="password" name="password" placeholder='password' id="" />

            <button onClick={handleLogin} className="submit">Login</button>
            <Link className='link' to="/signup">Sign up</Link>
      
        </div>
    )
}
export default Login;