import dayjs from "dayjs";

export const validatEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export const validatePassword = (password) => {
    return password.length >7
}

export const addThousandSeparator = (num) => {
    if(num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : `${formattedInteger}.00`
}

export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
    const chartData = data.map((item)=>({
        category: item?.category,
        amount: item?.amount
    }))
    return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b)=> new Date(a.date) - new Date(b.date))
    const chartData = sortedData.map((item)=>({
        month: dayjs(item?.date).format("DD MMM"),
        source: item?.source,
        amount: item?.amount
    }))
    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b)=> new Date(a.date) - new Date(b.date))
    const chartData = sortedData.map((item)=>({
        month: dayjs(item?.date).format("DD MMM YYYY"),
        amount: item?.amount,
        category: item?.category
    }))

    return chartData;
}