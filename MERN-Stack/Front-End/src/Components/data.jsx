import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Data() {
  let [datas, setdatas] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2505/showData')
      .then((res) => {
        console.log(res.data.record)
        setdatas(res.data.record)
      })
  }, [])

  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:2505/deleteData?id=${id}`)
      .then(() => {
        let dele = datas.filter((el, i) => {
          if (el.id != id) {
            return el.id
          }
        })

        setdatas(dele)
      })
  }

  const handleEdit = (id) =>{
    console.log(id)
    axios.put(`http://localhost:2505/updateData?id=${id}`)
    .then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-100 via-pink-200 to-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Information List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white rounded-lg">
          <thead>
            <tr className="bg-pink-300 text-gray-900 text-lg">
              <th className="border border-gray-300 px-6 py-3">Name</th>
              <th className="border border-gray-300 px-6 py-3">City</th>
              <th className="border border-gray-300 px-6 py-3" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((el, i) => {
              return <>
                <tr className="bg-pink-200 text-gray-900 text-lg">
                  <td className="border border-gray-300 px-6 py-3">{el.name}</td>
                  <td className="border border-gray-300 px-6 py-3">{el.city}</td>
                  <td className="border border-gray-300 px-6 py-3"><button onClick={() => handleDelete(el._id)}>Delete</button></td>
                  <td className="border border-gray-300 px-6 py-3"><button onClick={() => handleEdit(el._id)}>Edit</button></td>
                </tr>
              </>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Data;