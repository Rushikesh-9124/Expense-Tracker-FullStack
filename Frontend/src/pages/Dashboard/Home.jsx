import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import Loading from "../../components/layouts/Loading";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpense from "../../components/Dashboard/Last30DaysExpense";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

export const DataContext = createContext()

const Home = () => {
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/v1/dashboard");
      if (res.data && res.data.success) {
        setDashboardData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data!", error);
    }
    setLoading(false);
  };


  const getUserData = async () => {
    try {
      const res = await axiosInstance.get("/get-user");
      if (res.data.success) {
        setUser(res.data.user);
        updateUserData(res.data.user);
      }
    } catch (error) {
      console.error("Something went wrong!, Please try again!")
    }
  };

  const reloadPage = () => {
    window.location.reload()
  }

  useEffect(() => {
    getUserData();
    fetchDashboardData();
    
  }, []);

  return (
    <div>
      <DataContext.Provider value={fetchDashboardData}>
      <DashboardLayout activeMenu="Dashboard">
        {loading ? (
          <div className="flex items-center justify-center relative -top-15 bg-white">
            <Loading />
          </div>
        ) : (
          <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance: "
                value={addThousandSeparator(dashboardData?.totalBalance) || 0}
                color={"bg-primary"}
              />
              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income: "
                value={addThousandSeparator(dashboardData?.totalIncome) || 0}
                color={"bg-orange-500"}
              />
              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense: "
                value={addThousandSeparator(dashboardData?.totalExpense) || 0}
                color={"bg-red-500"}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTransactions
                fetchDashboardData={fetchDashboardData}
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />
              <ExpenseTransactions
              fetchDashboardData={fetchDashboardData}
              transactions= {dashboardData?.DaysExpenses30?.transactions || 0}
              onSeeMore={()=>navigate('expense')}
              />
              <Last30DaysExpense
              data={dashboardData?.DaysExpenses30?.transactions || 0}
              />
              <RecentIncomeWithChart 
              data={dashboardData?.DaysIncome60?.transactions.slice(0, 4) || []}
              totalIncome={dashboardData?.totalIncome}
              />
              <RecentIncome 
                fetchDashboardData={fetchDashboardData}
                transactions={dashboardData?.DaysIncome60?.transactions || []}
                onSeeMore={()=>navigate('/income')}
              />
            </div>
          </div>
        )}
      </DashboardLayout>
      </DataContext.Provider>
    </div>
  );
};

export default Home;
