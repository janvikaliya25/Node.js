
// import { useEffect } from "react"
// import axios from "axios"
// import { useState } from "react"
// import { Link } from "react-router-dom";

// function ShowData() {
//     const [alldata, setdata] = useState([])

//     useEffect(() => {
//     axios.get("http://localhost:2505/ProductForm/ShowData")
//         .then((da) => {
//             console.log(da)
//             setdata(da.data.record)
//         })
// }, [])

//     console.log(alldata)

//         const deleteData = async (id) => {
//         console.log(id)
//         await axios.delete(`http://localhost:2505/ProductForm/Delete?id=${id}`)
//             .then(() => {
//                 var del = alldata.filter((el, i) => {
//                     console.log(el._id)
//                     if (el._id != id) {
//                         return el
//                     }
//                 })
//                 setdata(del)

//             })
//     }

//     return (
//     <>
//         <h1>Showdata</h1>
//         {
//             alldata.map((el, i) => {
//                 return (
//                     <div key={i}>
//                         <div>
//                             <img src={el.image} alt="" />
//                         </div>
//                         <h3>{el.name}</h3>
//                         <p>{el.category}</p>
//                         <p>{el.price}</p>
//                         <Link to={`/Edit/${el._id}`}><button>edit</button></Link>
//                         <button onClick={() => deleteData(el._id)}>delete</button>
//                     </div>
//                 )
//             })
//         }
//     </> 
// )
// }
// export default ShowData

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowData() {
    const [alldata, setdata] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2505/ProductForm/ShowData")
            .then((da) => {
                console.log(da);
                setdata(da.data.record);
            });
    }, []);

    const deleteData = async (id) => {
        await axios.delete(`http://localhost:2505/ProductForm/Delete?id=${id}`)
            .then(() => {
                const del = alldata.filter((el) => el._id !== id);
                setdata(del);
            });
    };

    return (
        <div className="pt-20 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Showdata</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {alldata.map((el, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-md space-y-3">
                        <div className="w-full h-40 overflow-hidden rounded">
                            <img
                                src={el.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{el.name}</h3>
                        <p className="text-gray-600">{el.category}</p>
                        <p className="text-blue-700 font-medium">₹ {el.price}</p>

                        <div className="flex space-x-3">
                            <Link to={`/Edit/${el._id}`}>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => deleteData(el._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowData;
