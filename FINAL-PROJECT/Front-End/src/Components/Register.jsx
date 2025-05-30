// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import axios from 'axios'

// function Register() {
//     const [name, setName] = useState("")
//     const [city, setCity] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const naviget=useNavigate();

//     const handleSubmit = async () =>{
//         await axios.post("http://localhost:2505/register",{name,city,email,password})
//         .then((res)=>{
//             alert(res.data.msg)
//             naviget("/")
//         })
//     }
//     return (
//         <div>
//             <h1>Register</h1>
//             <input type="text" placeholder="Enter your name" name="name" onChange={(e) => setName(e.target.value)} />
//             <input type="text" placeholder="Enter your name" name="city" onChange={(e) => setCity(e.target.value)} />
//             <input type="text" placeholder="Enter your name" name="email" onChange={(e) => setEmail(e.target.value)} />
//             <input type="text" placeholder="Enter your name" name="password" onChange={(e) => setPassword(e.target.value)} /> <br />
//             <button onClick={handleSubmit}>Register</button> <br />
//             <Link to={"/"}>Login ?</Link>
//         </div>
//     )
// }

// export default Register

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function Register() {
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const naviget = useNavigate();

    const handleSubmit = async () => {
        await axios.post("http://localhost:2505/register", { name, city, email, password })
            .then((res) => {
                alert(res.data.msg)
                naviget("/")
            })
    }

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Enter your name" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Enter your city" name="city" onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" name="password" onChange={(e) => setPassword(e.target.value)} /> <br />
            <button onClick={handleSubmit}>Register</button> <br />
            <Link to="/">Login ?</Link>
        </div>
    )
}

export default Register;
