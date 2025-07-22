import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionCardInfo from '../Cards/TransactionCardInfo'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/axiosInstance'

const ExpenseTransactions = ({transactions, onSeeMore, fetchDashboardData}) => {
  const onDelete = async( id) => {
    try {
      const res = await axiosInstance.delete(`/api/v1/expense/deleteExpense/`+id)
      if(res.data && res.data.success){
        toast.success(`Expense Deleted Successfully!`)
        fetchDashboardData()
      }
    } catch (error) {
      toast.error("Unable to Delete!")
      console.log(error)
    }
  }
  return (
    <div className='card '>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/> </button>
      </div>
      <div className="mt-2 max-h-[300px] overflow-auto">
        {
            transactions.length > 0 && transactions?.map((item, idx)=>(
                <TransactionCardInfo 
                key={item._id}
                id={item._id}
                title={item.category}
                icon={item.icon}
                date={dayjs(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                onDelete={()=>onDelete(item?._id)}
                type={"expense"}
                />
            ))
        }
      </div>
    </div>
  )
}

export default ExpenseTransactions
