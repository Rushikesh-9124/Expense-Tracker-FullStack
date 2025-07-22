import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopUp from '../layouts/EmojiPickerPopUp'

const AddExpenseForm = ({onAddExpense, error}) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
})
  const handleChange = (key, value) => setExpense({...expense, [key]: value})
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
    <EmojiPickerPopUp
        icon= {expense.icon}
        onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
    />
    <Input 
        value={expense.category} 
        onChange={(e)=>handleChange("category", e.target.value)}
        label="Expense category"
        placeholder={"Movie, Food, etc..."}
        type="text"
    />
    <Input 
        value={expense.amount} 
        onChange={(e)=>handleChange("amount", e.target.value)}
        label="Amount"
        type="number"
    />
    <Input 
        value={expense.date} 
        onChange={(e)=>handleChange("date", e.target.value)}
        label="Date"
        type="date"
    />
    <p className="md:col-span-2 text-red-500 text-center text-xs">
        {error ? error : null}
    </p>
    <div className="md:col-span-2 ">
        <button className='w-full flex items-center justify-center bg-gray-400 py-2 rounded-lg hover:bg-gray-500 duration-100 transition-all cursor-pointer' onClick={()=>onAddExpense(expense)}>Add Expense</button>
    </div>
</div>
  )
}

export default AddExpenseForm
