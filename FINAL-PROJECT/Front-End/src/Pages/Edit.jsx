// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Edit() {
//     var { id } = useParams()
//     var [editdata, setEditData] = useState({
//         image:"",
//         name: "",
//         category: "",
//         price: ""
//     })
//     var navigate = useNavigate()
//     useEffect(() => {
//         axios.get("http://localhost:2505/ProductForm/ShowData")
//             .then((res) => {
//                 console.log(res.data.record)
//                 var edit = res.data.record.find((el, i) => {
//                     if (el._id == id) {
//                         return el
//                     }
//                 })
//                 setEditData(edit)
//             })
//     }, [id])

//     console.log(editdata)

//     console.log(id)


//     function editDatas(e)
//     {
//         var value = e.target.value
//         var name = e.target.name

//         setEditData({...editdata,[name]:value})
//     }

//     const submitdata =async(e)=>{
//         e.preventDefault()
//         console.log(editdata)
//         await axios.put(`http://localhost:2505/ProductForm/Editdata?id=${id}`,editdata)
//         .then(()=>{
//             alert("your data is updated")
//             navigate("/ShowData")
//         })

//     }
//     return (
//         <>
//             <h1>Edit Your Data</h1>
//             <form onSubmit={submitdata}>
//                  <input placeholder="Update your product image" value={editdata.image} onChange={editDatas} name="image"></input>
//                 <input placeholder="Update your product name" value={editdata.name} onChange={editDatas} name="name"></input>
//                 <input placeholder="Update your category" value={editdata.category}  onChange={editDatas} name="category"></input>
//                 <input placeholder="Update your price" value={editdata.price}  onChange={editDatas} name="price"></input>
//                 <input type="submit"></input>
//             </form>
//         </>
//     )
// }

// export default Edit

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Edit() {
    const { id } = useParams();
    const [editdata, setEditData] = useState({
        image: "",
        name: "",
        category: "",
        price: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:2505/ProductForm/ShowData")
            .then((res) => {
                const edit = res.data.record.find((el) => el._id === id);
                setEditData(edit);
            });
    }, [id]);

    const editDatas = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editdata, [name]: value });
    };

    const submitdata = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:2505/ProductForm/Editdata?id=${id}`, editdata)
            .then(() => {
                alert("Your data is updated");
                navigate("/ShowData");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <form
                onSubmit={submitdata}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit Your Product
                </h1>

                <input
                    placeholder="Update your product image"
                    value={editdata.image}
                    onChange={editDatas}
                    name="image"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    placeholder="Update your product name"
                    value={editdata.name}
                    onChange={editDatas}
                    name="name"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    placeholder="Update your category"
                    value={editdata.category}
                    onChange={editDatas}
                    name="category"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    placeholder="Update your price"
                    value={editdata.price}
                    onChange={editDatas}
                    name="price"
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <input
                    type="submit"
                    value="Update"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                />
            </form>
        </div>
    );
}

export default Edit;
