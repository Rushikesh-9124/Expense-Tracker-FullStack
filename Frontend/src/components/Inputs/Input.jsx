import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassowrd = () => {
        setShowPassword(prev => !prev)
    }
  return (
    <div className=''>
        <label className='text-[13px] text-slate-800 dark:text-white'>{label}</label>
        <div className="input-box">
            <input className='w-full bg-transparent outline-none ' type={type === 'password' ? showPassword ? "text" : "password" : type} min={`${type=='number' ? 1 : ''}`} onChange={onChange} value={value} placeholder={placeholder} />
            {type === 'password' && (
                showPassword ? <FaRegEye size={22} className='text-primary cursor-pointer' onClick={togglePassowrd} /> : 
                <FaRegEyeSlash size={22} className='text-slate-400 cursor-pointer' onClick={togglePassowrd} />
            )}
        </div>
    </div>
  )
}

export default Input
