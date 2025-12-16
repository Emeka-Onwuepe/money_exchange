import { useState} from "react";
import formStyles from "../../styles/forms";

export interface Payee {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address?: string | null;
    // allow extra fields if needed by other parts of the app
    // [key: string]: any;
}



const PayeeTable =  ({ setPayeeForm, checkNull, payees }: {setPayeeForm:any,checkNull:any,payees:Payee[]}) =>{

        const [payeeSearch, setPayeeSearch] = useState("");

       const pageSize = 1;
        const totalPages = Math.max(1, Math.ceil(payees.length / pageSize));


    //    const params = new URLSearchParams(window.location.search);
    //    const currentPage = Math.max(1, parseInt(params.get("payeePage") || "1", 10));
        const [payeeState, setPayeeState] = useState(payees.slice(0,pageSize));
        const [pagination,setPaginated] = useState({totalPages,currentPage:1})




         const searchPayee = (e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                setPayeeSearch(value);
                let filtered = payees.filter(
                    (payee) =>
                        payee.name.toLowerCase().includes(value.toLowerCase()) ||
                        payee.phone_number.toLowerCase().includes(value.toLowerCase()) ||
                        payee.email.toLowerCase().includes(value.toLowerCase())
                );
                console.log(value)
                if(value == ""){
                    const currentPage = pagination.currentPage - 1
                    const start = currentPage * pageSize
                    const end = currentPage + pageSize
                    setPayeeState(payees.slice(start,end))
                }else{
                setPayeeState(filtered);
                }
                // console.log('results',filtered)
                // setPaginated(filtered)

            };

    
    const next = () => {

            const currentPage = pagination.currentPage
            setPaginated({...pagination,currentPage:currentPage+1})
            const start = currentPage * pageSize
            const end = currentPage + pageSize
            setPayeeState(payees.slice(start,end))
            // e.preventDefault();
      
            // const newPage = Math.min(totalPages, currentPage + 1);
            // const params = new URLSearchParams(window.location.search);
            // params.set("payeePage", String(newPage));
            // window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
            // const start = (currentPage - 1) * pageSize;
            // setPaginated(payeeState.slice(start, start + pageSize))
            // setPayeeState((prev) => [...prev]);
                                                            
                        }

    const prev = () => {

             const currentPage = pagination.currentPage - 1
            setPaginated({...pagination,currentPage:currentPage})
            const start = (currentPage-1) * pageSize
            const end = (currentPage-1) + pageSize
            console.log(start,end)
            setPayeeState(payees.slice(start,end))

            // const newPage = Math.max(1, currentPage - 1);
            // const params = new URLSearchParams(window.location.search);
            // params.set("payeePage", String(newPage));
            // window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
            // setPayeeState((prev) => [...prev]);
            }


    return (

                    <div style={formStyles.sectionCard}>
                        <h3 style={formStyles.sectionTitle}>Payees</h3>
                        <div style={formStyles.searchRow}>
                            <label htmlFor="searchPayee" style={{ width: 110, color: "#555" }}>Search</label>
                            <input id="searchPayee" style={formStyles.searchInput} type="text" name="searchPayee" placeholder="Search by name, phone or email" value={payeeSearch} onChange={searchPayee} />
                        </div>

                        <table style={formStyles.table}>
                            <thead>
                                <tr>
                                    <th style={formStyles.th}>Full Name</th>
                                    <th style={formStyles.th}>Phone Number</th>
                                    <th style={formStyles.th}>Email</th>
                                    <th style={formStyles.th}>Address</th>
                                    <th style={formStyles.th}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                 
                                    return (
                                        <>
                                            {payeeState.map((payee: any, index: number) => (
                                                <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
                                                    <td style={formStyles.td}>{payee.name}</td>
                                                    <td style={formStyles.td}>{payee.phone_number}</td>
                                                    <td style={formStyles.td}>{payee.email}</td>
                                                    <td style={formStyles.td}>{payee.address || "N/A"}</td>
                                                    <td style={formStyles.td}>
                                                        <button style={formStyles.smallBtn} onClick={() => setPayeeForm(checkNull(payee))}>Edit</button>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <td colSpan={5} style={{ textAlign: "center", paddingTop: 12 }}>
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
                                        </>
                                    );
                                })()}
                            </tbody>
                        </table>
                    </div>
        
    )

}


export default PayeeTable