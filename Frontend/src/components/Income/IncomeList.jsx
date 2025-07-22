import React, { useContext } from 'react'
import TransactionCardInfo from '../Cards/TransactionCardInfo'
import dayjs from 'dayjs'
import { DataContext } from '../../pages/Dashboard/Home'
import { LuDownload } from 'react-icons/lu'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Income Transactions</h5>
            <button className='px-3 py-1 border border-gray-300 rounded-lg bg-white shadow-gray-500 cursor-pointer flex items-center gap-2 text-gray-600 active:scale-105 transition-all duration-75' onClick={onDownload}><LuDownload /> Download</button>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2">
            {
                transactions?.map((item, idx)=>(
                    <TransactionCardInfo
                        title={item?.source}
                        key={idx}
                        icon={item?.icon}
                        date={dayjs(item?.date).format('DD MMM YYYY')}
                        amount={item.amount}
                        type={'income'}
                        id={item?._id}
                        onDelete={onDelete}
                        hideDeleteBtn={false}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default IncomeList
