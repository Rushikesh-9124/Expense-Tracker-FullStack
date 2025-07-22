import React, { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionCardInfo from "../Cards/TransactionCardInfo";
import dayjs from "dayjs";
import { HiRefresh } from "react-icons/hi";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const RecentTransactions = ({
  transactions,
  onSeeMore,
  fetchDashboardData,
}) => {
  const onDelete = async(type, id) => {
    try {
      const res = await axiosInstance.delete(`/api/v1/${type}/${type === 'income'?'deleteIncome': "deleteExpense"}/`+id)
      if(res.data && res.data.success){
        toast.success(`${type == 'income' ? "Income":"Expense"} Deleted Successfully!`)
        fetchDashboardData()
      }
    } catch (error) {
      toast.error("Unable to Delete!")
    }
  }
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <div className="flex items-center gap-4 ">
          <button onClick={fetchDashboardData} className=" card-btn group">
            <HiRefresh className="text-[17px] group-hover:text-blue-600" />
          </button>
          <button className="card-btn" onClick={onSeeMore}>
            <span className="text-nowrap"> See All</span>{" "}
            <LuArrowRight className="text-base hidden sm:block" />
          </button>
        </div>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item, idx) => (
          <TransactionCardInfo
            fetchDashboardData={fetchDashboardData}
            key={item._id}
            id={item._id}
            title={item.type == "expense" ? item.category : item.source}
            icon={item.icon}
            date={dayjs(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            onDelete={()=>onDelete(item?.type,item?._id)}
            hideDeleteBtn={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
