import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import {  toast } from 'react-toastify';
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/layouts/DeleteAlert'

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [error, setError] = useState(null)
  const [incomeData, setIncomeData] = useState([])
  const fetchIncomeData = async() => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/api/v1/income/get')
      if(res.data && res.data.success){
        setIncomeData(res.data.income)
      }
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message)
      }
    }
    setLoading(false)
  }
  const handleIncomeForm = async(income) => {
    const {source, amount, date, icon} = income
    if(!source){
      setError("Source is required!")
      return
    }
    if(!amount ){
      setError("Amount is required!")
      return;
    }
    if(amount <= 0){
      setError("Amount must be greater than 0!")
      return
    }
    
    if(!date){
      setError("Date is required!")
      return
    }
    try {
      const res = await axiosInstance.post('/api/v1/income/add', income)
      if(res.data && res.data.success){
        toast.success("Income Successfully Added!")
        setOpenAddIncomeModal(false)
        fetchIncomeData()
      }
    } catch (error) {
      toast.error("Unable to Add Income!")
    }
  }
  
  const handleDownloadIncomeData = async() => {
    try {
      const res = await axiosInstance.get('/api/v1/income/downloadExcel', {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      toast.error("Unable to Download Expense Data!")
    }
  }
  const deleteIncome = async(id) => {
    try {
      const res = await axiosInstance.delete('/api/v1/income/deleteIncome/'+id)
      if(res.data && res.data.success){
        toast.success("Income Successfully Deleted!")
        window.location.reload()
      }
    } catch (error) {
      toast.error("Unable to Delete!")
    }
  }
  useEffect(()=>{
    fetchIncomeData();

  }, [])
  return (
    <DashboardLayout activeMenu={"Income"} >
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 ">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id)=>setOpenDeleteAlert({show:true, data:id})}
            onDownload={handleDownloadIncomeData}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
          type="Income"
          
        >
          <AddIncomeForm error={error} onAddIncome={handleIncomeForm}/>
        </Modal>
        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
        >
          <DeleteAlert 
          content="Are you sure, you want to delete this income?"
          onDelete={()=>deleteIncome(openDeleteAlert.data)}
          type="delete"
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
