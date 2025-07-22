import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopUp from '../layouts/EmojiPickerPopUp'

const AddIncomeForm = ({onAddIncome, error}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    })
    const handleChange = (key, value) => setIncome({...income, [key]: value})
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <EmojiPickerPopUp
            icon= {income.icon}
            onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
        />
        <Input 
            value={income.source} 
            onChange={(e)=>handleChange("source", e.target.value)}
            label="Income Source"
            placeholder={"Freelance, Salary, etc..."}
            type="text"
        />
        <Input 
            value={income.amount} 
            onChange={(e)=>handleChange("amount", e.target.value)}
            label="Amount"
            type="number"
        />
        <Input 
            value={income.date} 
            onChange={(e)=>handleChange("date", e.target.value)}
            label="Date"
            type="date"
        />
        <p className="md:col-span-2 text-red-500 text-center text-xs">
            {error ? error : null}
        </p>
        <div className="md:col-span-2 ">
            <button className='w-full flex items-center justify-center bg-gray-400 py-2 rounded-lg hover:bg-gray-500 duration-100 transition-all cursor-pointer' onClick={()=>onAddIncome(income)}>Add Income</button>
        </div>
    </div>
  )
}

export default AddIncomeForm
