import { useEffect, useState} from "react";
import formStyles from "../../styles/forms";

export interface Payee {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address?: string | null;
}



const PayeeTable =  ({ setPayeeForm, checkNull, payees }: {setPayeeForm:any,checkNull:any,payees:Payee[]}) =>{

        const [payeeSearch, setPayeeSearch] = useState("");

        const pageSize = 5;
        const totalPages = Math.max(1, Math.ceil(payees.length / pageSize));


        const [payeeState, setPayeeState] = useState(payees.slice(0,pageSize));
        const [pagination,setPaginated] = useState({totalPages,currentPage:1})

        useEffect(()=>{
            setPayeeState(payees.slice(0,pageSize));
            setPaginated({totalPages: Math.max(1, Math.ceil(payees.length / pageSize)),
                currentPage: 1});
        },[payees])


         const searchPayee = (e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                setPayeeSearch(value);
                let filtered = payees.filter(
                    (payee) =>
                        payee.name.toLowerCase().includes(value.toLowerCase()) ||
                        payee.phone_number.toLowerCase().includes(value.toLowerCase()) ||
                        payee.email.toLowerCase().includes(value.toLowerCase())
                );
                
                if(value == ""){
                    const currentPage = pagination.currentPage - 1
                    const start = currentPage * pageSize
                    const end = start + pageSize
                    setPayeeState(payees.slice(start,end))
                }else{
                setPayeeState(filtered);
                }
               
            };

    
    const next = () => {

            const currentPage = pagination.currentPage
            setPaginated({...pagination,currentPage:currentPage+1})
            const start = currentPage * pageSize
            const end = start + pageSize
            setPayeeState(payees.slice(start,end))
                                                            
                        }

    const prev = () => {

             const currentPage = pagination.currentPage - 1
            setPaginated({...pagination,currentPage:currentPage})
            const start = (currentPage-1) * pageSize
            const end = start + pageSize
            console.log(start,end)
            setPayeeState(payees.slice(start,end))

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
                                                        <button className="smallbtn" onClick={() => {setPayeeForm(checkNull(payee))
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        

                                                        }}>Edit</button>
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