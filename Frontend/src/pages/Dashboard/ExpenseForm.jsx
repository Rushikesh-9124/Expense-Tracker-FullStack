import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOveriew from '../../components/Expense/ExpenseOveriew'
import Modal from '../../components/layouts/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import { toast } from 'react-toastify';
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/layouts/DeleteAlert'

const Expense = () => {
  const {getUserData} = useContext(UserContext)
  const [openAddExpenseModal, setOpenAddExpenseeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [error, setError] = useState(null)
  const [expenseData, setExpenseData] = useState([])

  const fetchExpenseDetails = async() => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/v1/expense/get')
      if(res.data && res.data.success){
        setExpenseData(res.data.expense)
      }
    } catch (error) {
      console.log('Unable to Fetch Details')
    }
    setLoading(false)
  }

  const handleAddExpense = async(expense) => {
    const {category, amount, date, icon} = expense
    if(!category){
      setError("Category is required!")
      return
    }
    if(!amount){
      setError("Amount is required")
      return
    }
    if(amount <= 0){
      setError("Amount must be greater than 0")
      return
    }
    if(!date){
      setError("Date is required!")
      return
    }

    try {
      const res = await axiosInstance.post('/api/v1/expense/add', expense)
      if(res.data && res.data.success){
        toast.success("Expense Details Successfully Added!")
      }

      fetchExpenseDetails()
      setOpenAddExpenseeModal(false)
    } catch (error) {
      toast.error("Unable to Add Expense!")
      console.log(error)
    }
  }

  const deleteExpense = async(id) => {
    console.log(id)
    try {
      const res = await axiosInstance.delete('/api/v1/expense/deleteExpense/'+id)
      if(res.data && res.data.success){
        setOpenDeleteAlert({show: false, data: null})
        toast.success("Expense Details Successfully Deleted!")
        fetchExpenseDetails()
      }
    } catch (error) {
      toast.error("Unable to Delete Expense!")
    }
  }

  const handleDownloadExpenseDetails = async() => {
    try {
      const res = await axiosInstance.get('/api/v1/expense/downloadExcel', {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      toast.error("Unable to Download Expense Data!")
    }
  }

  useEffect(()=>{
    getUserData(),
    fetchExpenseDetails()
  }, [])
  return (
    <DashboardLayout activeMenu="Expense"> 
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <ExpenseOveriew
            transactions={expenseData}
            onExpenseIncome={()=>setOpenAddExpenseeModal(true)}
          />
        </div>
        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=>setOpenDeleteAlert({show: true, data:id})}
        onDownload={handleDownloadExpenseDetails}
        />
      </div>
      <Modal
        isOpen={openAddExpenseModal}
        onClose={()=>setOpenAddExpenseeModal(false)}
        title="Add Expense"
        type="Expense"
      >
        <AddExpenseForm error={error} onAddExpense={handleAddExpense} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show: false, data: null})}
        title="Delete Expense"
        >
          <DeleteAlert 
          content="Are you sure, you want to delete this income?"
          onDelete={()=>deleteExpense(openDeleteAlert.data)}
          type="delete"
          />
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Expense
