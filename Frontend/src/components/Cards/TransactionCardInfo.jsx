import React, { useContext, useEffect, useState } from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import { DataContext } from "../../pages/Dashboard/Home";

const TransactionCardInfo = ({
  title,
  id,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-500 "
      : "bg-red-50 text-red-500";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full ">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className="flex-1 flex  items-center justify-between">
        <div className="">
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          {!hideDeleteBtn && (
            <button
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => onDelete(id)}
            >
              <LuTrash2 size={22} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-sm font-medium">
              {type === "income" ? "+" : "-"} &#8377;{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCardInfo;
