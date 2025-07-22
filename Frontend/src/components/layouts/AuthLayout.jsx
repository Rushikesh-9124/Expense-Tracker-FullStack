import React from "react";
import transactions from "../../assets/transactions.png";
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({ loading, children }) => {
  return loading ? (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-30 w-30 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          />
        </svg>
        <p className="text-purple-600 text-sm font-medium">Loading, please wait...</p>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-xl md:text-5xl font-medium text-black  ">Expense Tracker</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img  bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] absolute bg-purple-600 -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 " />
        <div className="w-48 h-48 rounded-[40px]  bg-violet-500 absolute -bottom-7 -left-5" />

        <div className="grid grid-col-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label={"Track Your Income and Expenses"}
            value="430,000"
            color="bg-primary"
          />
        </div>
        <img
          className="w-64 lg:w-[90%] absolute bottom-5 shadow-lg shadow-blue-400/15  rounded-xl"
          src={transactions}
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return(<div className="flex gap-6 bg-white p-6 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
    <div
      className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `}
    >
        {icon}
    </div>
    <div className="">
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
    </div>
  </div>
  )
};
