import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleLogin = async() =>{
        await axios.post("http://localhost:2505/login",{email,password})
        .then((res)=>{
            alert(res.data.msg)

            if(res.data.code == 100){
                alert(res.data.code)
                navigate("/Register")
            }
            else if(res.data.code == 200){
                localStorage.setItem("token",res.data.token)
                navigate("/Dashboard")
            }
            else{
                alert(res.data.code)
                navigate("/");
            }
        })
    }
    return(
        <div>
             <h1>Login</h1>
             <input type="text" placeholder="Enter your username" name="email" onChange={(e)=>setEmail(e.target.value)}/>
             <input type="text" placeholder="Enter your password" name="password" onChange={(e)=>setPassword(e.target.value)}/> <br /> <br />
             <button onClick={handleLogin}>Login</button> <br /><br />
             <Link to={"/Register"}>Register ?</Link>
        </div>
    )
}

export default Login;