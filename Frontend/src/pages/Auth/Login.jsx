import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validatEmail, validatePassword } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const {updateUserData} = useContext(UserContext)

  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault()
    if(!email){
      setError("Email is required!")
      return
    }
    if(!password){
      setError("Password is required!")
      return
    }
    if(!validatEmail(email)){
      setError("Invalid email format!")
      setEmail("")
      return
    }
    if(!validatePassword(password)){
      setError("Password length must be greater than 8")
      setPassword("")
      return
    }
    try {
      setLoading(true)
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.toLowerCase(),
        password:password
      })
      if(res.data.success && res.data.accessToken){
        localStorage.setItem("token", res.data.accessToken)
        navigate('/dashboard')
        updateUserData(res.data.data)
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  }

  return (
    <AuthLayout loading={loading}>
      <div className="md:w-[70%]  h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6 '>Please enter your details to login</p>

        <form onSubmit={handleLogin}>
          <Input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          label="Email: "
          placeholder="john@example.com"
          type="text"
          />
          <Input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          label="Password: "
          placeholder="password"
          type="password"
          />
          {error && <p className='text-xs text-red-500 '>{error}</p>}
          <button type='submit' className='btn-primary'>Login</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account? {" "}
            <Link className='font-medium text-primary underlinef'  to='/signup' >SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
