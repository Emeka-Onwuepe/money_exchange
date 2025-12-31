import { useEffect, useState} from "react";
import formStyles from "../../styles/forms";
import { Link } from "react-router";
import GetTransactionForm from "../forms/getTransactionForm";

const styles = {
    card:{  
        // border: "1px solid #ccc",
        borderRadius: 4,
        padding: 16,
        marginBottom: 16,
        backgroundColor: "#fdfdfd",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width:"44%"

    }
}

export interface transaction {
    // allow extra fields if needed by other parts of the app
    [key: string]: any;
}



const TransactionTable =  ({ setTransactionForm, checkNull, 
                            transactions, customers,payees,user }: 
    {setTransactionForm:any,checkNull:any,transactions:transaction[],
     customers:transaction[],payees:transaction[],user:any}) =>{

    const [transactionSearch, settransactionSearch] = useState("");

    const [width, setWidth] = useState('45%');
    

      useEffect(() => {
            const updateHeaderWidth = () => {
              const vw = window.innerWidth;
              setWidth(vw < 640 ? '95%' : '45%' );
            };
        
            updateHeaderWidth();
            window.addEventListener('resize', updateHeaderWidth);
            return () => window.removeEventListener('resize', updateHeaderWidth);
          }, []);

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

const setEdit = (state:any) =>{
  const {reciept, ...rest} = state
  setTransactionForm({...rest,reciept:""})
}


const searchTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                settransactionSearch(value);
                let customer = customers.filter(c=>c.full_name.toLowerCase().includes(value.toLowerCase()) )
                let payee =  payees.filter(p=>p.name.toLowerCase().includes(value.toLowerCase()) )
                console.log('payee',payee)
                console.log('customer',customer)



                let filtered = transactions.filter(
                    (transaction) => transaction.base_currency.toLowerCase().includes(value.toLowerCase()) ||
                     customer.filter(c=>c.id == transaction.customer).length ||
                     payee.filter(p=>p.id == transaction.payee).length


                );


                if(value == ""){
                    const currentPage = pagination.currentPage - 1
                    const start = currentPage * pageSize
                    const end = currentPage + pageSize
                    setTransactionState(transactions.slice(start,end))
                }else{
                setTransactionState(filtered);
                }
                // console.log('results',filtered)
                // setPaginated(filtered)

            };

    
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
                        <div>
                            {/* <p>Search Row</p> */}
                            <div className="flex_container  ">
                            <div className="" style={{...styles.card,width}}>
                                <GetTransactionForm customers={customers} payees={payees} user={user} />
                            </div>
                            <div className="" style={{...styles.card,width}}>
                            <label style={{color:'blue'}} htmlFor="searchTransaction">Search</label>
                            <input id="searchTransaction" style={formStyles.searchInput} 
                            type="text" name="searchTransaction" placeholder="Search base, name or payee" value={transactionSearch} onChange={searchTransaction} />
                            </div>
                            </div>
                        </div>

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
                <th style={formStyles.th}>Receipt</th>
                <th style={formStyles.th}></th>
                <th style={formStyles.th}></th>


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
            <td style={formStyles.td}>{
            customers.filter(c=>c.id==transaction.customer)[0]?
            customers.filter(c=>c.id==transaction.customer)[0].full_name: "not found"}</td>
            <td style={formStyles.td}>{payees.filter(c=>c.id==transaction.payee)[0]?
            payees.filter(c=>c.id==transaction.payee)[0].name : "not found"}</td>
            <td style={formStyles.td}>{transaction.reciept?<a target="blank" href={transaction.reciept}>View</a>: "no reciept"}</td>
            <td style={formStyles.td}>{!transaction.paid_once?<Link to={`/payments/${transaction.id}`}>payments</Link>:null}</td>
            <td style={formStyles.td}>
             <button style={formStyles.smallBtn} onClick={() => setEdit(checkNull(transaction))}>Edit</button>
            </td>
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