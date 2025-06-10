
// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // function Dashboard() {
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //             navigate("/");
// //             return;
// //         } else {
// //             fetchAdmin();
// //         }
// //     }, []);

// //     const fetchAdmin = async () => {
// //         const token = localStorage.getItem("token");
// //         await axios
// //             .get("http://localhost:2505/allAdmin", {
// //                 headers: {
// //                     Authorization: token,
// //                 },
// //             })
// //             .then((res) => {
// //                 console.log(res);
// //             });
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-100 px-4 pt-24">
// //             {/* Header with proper margin-top */}
// //             <div className="w-full fixed top-15 left-0 z-10 bg-white flex items-center justify-between px-10 py-4 shadow-md">
// //                 <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
// //                 <button
// //                     onClick={() => {
// //                         localStorage.removeItem("token");
// //                         navigate("/");
// //                     }}
// //                     className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
// //                 >
// //                     Logout
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// function Dashboard() {
//     const navigate = useNavigate();
//     const [alldata, setData] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             navigate("/");
//             return;
//         } else {
//             fetchAdmin();
//             fetchProducts(); // <-- added for product data
//         }
//     }, []);

//     const fetchAdmin = async () => {
//         const token = localStorage.getItem("token");
//         await axios
//             .get("http://localhost:2505/allAdmin", {
//                 headers: {
//                     Authorization: token,
//                 },
//             })
//             .then((res) => {
//                 console.log(res);
//             });
//     };

//     const fetchProducts = async () => {
//         await axios
//             .get("http://localhost:2505/ProductForm/ShowData")
//             .then((res) => {
//                 setData(res.data.record);
//             });
//     };

//     const deleteData = async (id) => {
//         await axios
//             .delete(`http://localhost:2505/ProductForm/Delete?id=${id}`)
//             .then(() => {
//                 const updated = alldata.filter((item) => item._id !== id);
//                 setData(updated);
//             });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 px-4 pt-24">
//             {/* Header with proper margin-top */}
//             <div className="w-full fixed top-15 left-0 z-10 bg-white flex items-center justify-between px-10 py-4 shadow-md">
//                 <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//                 <button
//                     onClick={() => {
//                         localStorage.removeItem("token");
//                         navigate("/");
//                     }}
//                     className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//                 >
//                     Logout
//                 </button>
//             </div>

//             {/* ShowData Section */}
//             {/* ShowData Section */}
//             <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {alldata.map((el, i) => (
//                     <div
//                         key={i}
//                         className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
//                     >
//                         <h3 className="text-xl font-semibold text-gray-800">{el.name}</h3>
//                         <p className="text-gray-600">Category: {el.category}</p>
//                         <p className="text-gray-600">Price: ₹{el.price}</p>

//                         <div className="mt-4 flex gap-3">
//                             <Link to={`/Edit/${el._id}`}>
//                                 <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                                     Edit
//                                 </button>
//                             </Link>
//                             <button
//                                 onClick={() => deleteData(el._id)}
//                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const [alldata, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        } else {
            fetchAdmin();
            fetchData();
        }
    }, []);

    const fetchAdmin = async () => {
        const token = localStorage.getItem("token");
        await axios.get("http://localhost:2505/allAdmin", {
            headers: {
                Authorization: token,
            },
        }).then((res) => {
            console.log("Admin data:", res);
        });
    };

    const fetchData = async () => {
        await axios.get("http://localhost:2505/ProductForm/ShowData")
            .then((res) => {
                setData(res.data.record);
            });
    };

    const deleteData = async (id) => {
        await axios.delete(`http://localhost:2505/ProductForm/Delete?id=${id}`);
        const filtered = alldata.filter((el) => el._id !== id);
        setData(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full fixed top-16 left-0 z-10 bg-white flex items-center justify-between px-10 py-4 shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                    Logout
                </button>
            </div>

            <h3 className="pt-45 text-2xl font-bold">Product Data</h3>
            <div className="pt-10 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {alldata.map((el, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <div className="w-full h-40 mb-4 overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={el.image}
                                    alt={el.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{el.name}</h2>
                            <p className="text-gray-600">Category: {el.category}</p>
                            <p className="text-gray-600">Price: ₹{el.price}</p>
                            <div className="mt-4 flex space-x-3">
                                <Link to={`/Edit/${el._id}`}>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => deleteData(el._id)}
                                     className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
