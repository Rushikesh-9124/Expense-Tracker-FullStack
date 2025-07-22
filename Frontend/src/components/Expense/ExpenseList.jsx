import React from 'react'
import TransactionCardInfo from '../Cards/TransactionCardInfo'
import dayjs from 'dayjs'
import { LuDownload } from 'react-icons/lu'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className="flex justify-between items-center">
        <h5 className='text-lg'>All Expenses</h5>
        <button className='card-btn' onClick={onDownload}><LuDownload />Download</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {
            transactions?.map((item, idx)=>(
                <TransactionCardInfo
                id={item?._id}
                key={idx}
                icon={item?.icon}
                amount={item?.amount}
                hideDeleteBtn={false}
                title={item?.category}
                date={dayjs(item?.date).format('DD MMM YYYY')}
                type='expense'
                onDelete={onDelete}
                />
            ))
        }
      </div>
    </div>
  )
}

export default ExpenseList
