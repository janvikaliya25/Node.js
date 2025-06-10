
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        await axios.post("http://localhost:2505/login", { email, password })
            .then((res) => {
                alert(res.data.msg)

                if (res.data.code == 100) {
                    alert(res.data.code)
                    navigate("/Register")
                }
                else if (res.data.code == 200) {
                    localStorage.setItem("token", res.data.token)
                    navigate("/Dashboard")
                }
                else {
                    alert(res.data.code)
                    navigate("/");
                }
            })
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

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
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                    Login
                </button>

                <div className="text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/Register" className="text-blue-600 hover:underline">Register ?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
