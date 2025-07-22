import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpense = ({data}) => {
    const [chartData, setChartData] = useState([])
    useEffect(()=>{
        const res = prepareExpenseBarChartData(data)
        setChartData(res)

        return () => {}
    },[data])
  return (
    <div className="card col-span-1 place-content-center">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpense
