import { useEffect, useState} from "react";
import formStyles from "../../styles/forms";

export interface transaction {
    // allow extra fields if needed by other parts of the app
    [key: string]: any;
}



const TransactionTable =  ({transactions}: 
    {transactions:transaction[]}) =>{

       const pageSize = 20;
        const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));


    //    const params = new URLSearchParams(window.location.search);
    //    const currentPage = Math.max(1, parseInt(params.get("transactionPage") || "1", 10));
        const [transactionState, setTransactionState] = useState(transactions.slice(0,pageSize));
        const [pagination,setPaginated] = useState({totalPages,currentPage:1})

useEffect(()=>{
    console.log("Transactions updated:", transactions);
    setTransactionState(transactions.slice(0,pageSize));
    setPaginated({totalPages: Math.max(1, Math.ceil(transactions.length / pageSize)),
         currentPage: 1});

},[transactions])

    
    const next = () => {

            const currentPage = pagination.currentPage
            setPaginated({...pagination,currentPage:currentPage+1})
            const start = currentPage * pageSize
            const end = currentPage + pageSize
            setTransactionState(transactions.slice(start,end))
             
                        }

    const prev = () => {

             const currentPage = pagination.currentPage - 1
            setPaginated({...pagination,currentPage:currentPage})
            const start = (currentPage-1) * pageSize
            const end = (currentPage-1) + pageSize
            setTransactionState(transactions.slice(start,end))
            }


    return (

                    <div style={formStyles.sectionCard}>
                        <h3 style={formStyles.sectionTitle}>transactions</h3>

                        {/* <div style={formStyles.searchRow}> */}

                        <table style={formStyles.table}>
                            <thead>
                                <tr>
                <th style={formStyles.th} >Date</th>
                <th style={formStyles.th}>Transaction ID</th>
                <th style={formStyles.th}>Base</th>
                <th style={formStyles.th}>Amount</th>
                <th style={formStyles.th}>USD <br/> Price</th>
                <th style={formStyles.th}>USD <br/> Rate</th>
                <th style={formStyles.th}>USD <br/> Ask</th>
                <th style={formStyles.th}>USD <br/> Bid</th>
                <th style={formStyles.th}>USD <br/> Gain</th>
                <th style={formStyles.th}>Naira <br/> Rate</th>
                <th style={formStyles.th}>Naira</th>
                <th style={formStyles.th}>Paid <br/> Amount</th>
                <th style={formStyles.th}>Balance</th>
                <th style={formStyles.th}>Name</th>
                <th style={formStyles.th}>Payee</th>


                                </tr>
                            </thead>
                            <tbody>
            {transactionState.map((transaction, index) => (
             transaction.amount ? (
            <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
            <td style={formStyles.td}>{transaction.date}</td>  
            <td style={formStyles.td}>{transaction.transaction_id}</td>  
            <td style={formStyles.td}>{transaction.base_currency}</td>
            <td style={formStyles.td}>{transaction.amount.toFixed(2)}</td>
            <td style={formStyles.td}>{transaction.usd_price}</td>
            <td style={formStyles.td}>{transaction.usd_rate}</td>
            <td style={formStyles.td}>{(transaction.usd_bid).toFixed(1)}</td>
            <td style={formStyles.td}>{(transaction.usd_ask).toFixed(1)}</td>
             <td style={formStyles.td}>{(transaction.usd_gain).toFixed(1)}</td>
            <td style={formStyles.td}>{transaction.naira_rate}</td>
            <td style={formStyles.td}>{(transaction.naira).toFixed(1)}</td>
            <td style={formStyles.td}>{(transaction.paid_amount).toFixed(1)}</td>
            <td style={formStyles.td}>{(transaction.balance).toFixed(1)}</td>
            <td style={formStyles.td}>{transaction.customer.full_name}</td>
            <td style={formStyles.td}>{transaction.payee.name}</td>
            </tr>) : null
                ) )}
            <tr>
            <td colSpan={14} style={{ textAlign: "center", paddingTop: 12 }}>
            <div style={formStyles.pagination}>
            <button
             style={{ ...formStyles.smallBtn, opacity: pagination.currentPage === 1 ? 0.5 : 1 }}
              onClick={prev}
              disabled={pagination.currentPage === 1}
                >
                Prev
             </button>

            <span style={formStyles.pageInfo}>
            Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
                style={{ ...formStyles.smallBtn, opacity: pagination.currentPage === pagination.totalPages ? 0.5 : 1 }}
                onClick={next}
             disabled={pagination.currentPage === pagination.totalPages}
             >
             Next
             </button>
            </div>
             </td>
             </tr>
            </tbody>
            </table>
         </div>
        
    )

}


export default TransactionTable