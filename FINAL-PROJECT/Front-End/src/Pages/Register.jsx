
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>

                <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                    Register
                </button>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 hover:underline">Login ?</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
