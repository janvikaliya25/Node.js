
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addproduct() {
    const [product, setproduct] = useState({
        image: "",
        name: "",
        category: "",
        price: ""
    });

    const navigate = useNavigate();

    function datas(e) {
        let value = e.target.value;
        let name = e.target.name;

        setproduct({ ...product, [name]: value });
    }

    const productSubmit = async (e) => {
        e.preventDefault();
        console.log(product);
        await axios.post("http://localhost:2505/ProductForm", product).then((res) => {
            console.log(res.data);
        });

        setproduct({
            image: "",
            name: "",
            category: "",
            price: ""
        });

        navigate("/ShowData");
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <form
                    onSubmit={productSubmit}
                    className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
                >
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Product Form
                    </h1>

                    <input
                        placeholder="Enter the product image"
                        onChange={datas}
                        name="image"
                        value={product.image}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        placeholder="Enter the product name"
                        onChange={datas}
                        name="name"
                        value={product.name}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        placeholder="Enter the category"
                        onChange={datas}
                        name="category"
                        value={product.category}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        placeholder="Enter the price"
                        onChange={datas}
                        name="price"
                        value={product.price}
                        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 cursor-pointer"
                    />

                </form>
            </div>
        </>
    );
}

export default Addproduct;
