
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        else{
            fetchAdmin()
        }
    }, [])

    const fetchAdmin = async ()=>{
        let token = localStorage.getItem("token")
        await axios.get("http://localhost:2505/allAdmin",{
            headers :{
                Authorization : token
            }
        }).then((res)=>{
            console.log(res)
        })
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}>Logout</button>
        </div>
    );
} 

export default Dashboard;
