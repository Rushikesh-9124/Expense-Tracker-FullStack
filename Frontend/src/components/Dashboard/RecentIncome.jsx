import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionCardInfo from "../Cards/TransactionCardInfo";
import dayjs from "dayjs";

const RecentIncome = ({ transactions, onSeeMore, fetchDashboardData }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-3">
        {transactions?.slice(0, 5)?.map((item, idx) => (
          <TransactionCardInfo 
            fetchDashboardData={fetchDashboardData}
            key={item._id}
            id={item._id}
            title={item?.source}
            icon={item.icon}
            date={dayjs(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={"income"}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
