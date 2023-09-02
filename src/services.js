import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function getBalanceSheet(provider, accessToken) {
    const url = `${BASE_URL}/balance-sheet`
    
    return axios.post(
        url,
        {
            provider,
            accessToken
        }
    )
}

function submitApplication(name, amount, year, balance_sheet) {
    const url = `${BASE_URL}/apply-loan`;

    return axios.post(
        url, 
        {
            name,
            year,
            loan_amount: amount,
            balance_sheet
        }
    )
}

export {getBalanceSheet, submitApplication};