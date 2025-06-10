import { Route,Routes } from 'react-router-dom';
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Dashboard from "../Pages/Dashboard"
import Addproduct from "../Pages/Addproduct"
import ShowData from "../Pages/ShowData"
import Edit from "../Pages/Edit"

function AppRoute(){
    return( 
        <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Addproduct' element={<Addproduct />}></Route>
          <Route path='/ShowData' element={<ShowData />}></Route>
          <Route path='/Edit/:id' element={<Edit />}></Route>
        </Routes>
        </>
    )
}

export default AppRoute