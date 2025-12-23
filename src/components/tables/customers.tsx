import { useState} from "react";
import formStyles from "../../styles/forms";

export interface Customer {
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    address?: string | null;
    // allow extra fields if needed by other parts of the app
    // [key: string]: any;
}



const CustomerTable =  ({ setCustomerForm, checkNull, customers }: {setCustomerForm:any,checkNull:any,customers:Customer[]}) =>{

        const [customerSearch, setCustomerSearch] = useState("");

       const pageSize = 20;
        const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));


    //    const params = new URLSearchParams(window.location.search);
    //    const currentPage = Math.max(1, parseInt(params.get("customerPage") || "1", 10));
        const [customerState, setCustomerState] = useState(customers.slice(0,pageSize));
        const [pagination,setPaginated] = useState({totalPages,currentPage:1})




         const searchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                setCustomerSearch(value);
                let filtered = customers.filter(
                    (customer) =>
                        customer.full_name.toLowerCase().includes(value.toLowerCase()) ||
                        customer.phone_number.toLowerCase().includes(value.toLowerCase()) ||
                        customer.email.toLowerCase().includes(value.toLowerCase())
                );
                console.log(value)
                if(value == ""){
                    const currentPage = pagination.currentPage - 1
                    const start = currentPage * pageSize
                    const end = currentPage + pageSize
                    setCustomerState(customers.slice(start,end))
                }else{
                setCustomerState(filtered);
                }
                // console.log('results',filtered)
                // setPaginated(filtered)

            };

    
    const next = () => {

            const currentPage = pagination.currentPage
            setPaginated({...pagination,currentPage:currentPage+1})
            const start = currentPage * pageSize
            const end = currentPage + pageSize
            setCustomerState(customers.slice(start,end))
            // e.preventDefault();
      
            // const newPage = Math.min(totalPages, currentPage + 1);
            // const params = new URLSearchParams(window.location.search);
            // params.set("customerPage", String(newPage));
            // window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
            // const start = (currentPage - 1) * pageSize;
            // setPaginated(customerState.slice(start, start + pageSize))
            // setCustomerState((prev) => [...prev]);
                                                            
                        }

    const prev = () => {

             const currentPage = pagination.currentPage - 1
            setPaginated({...pagination,currentPage:currentPage})
            const start = (currentPage-1) * pageSize
            const end = (currentPage-1) + pageSize
            console.log(start,end)
            setCustomerState(customers.slice(start,end))

            // const newPage = Math.max(1, currentPage - 1);
            // const params = new URLSearchParams(window.location.search);
            // params.set("customerPage", String(newPage));
            // window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
            // setCustomerState((prev) => [...prev]);
            }


    return (

                    <div style={formStyles.sectionCard}>
                        <h3 style={formStyles.sectionTitle}>Customers</h3>
                        <div style={formStyles.searchRow}>
                            <label htmlFor="searchCustomer" style={{ width: 110, color: "#555" }}>Search</label>
                            <input id="searchCustomer" style={formStyles.searchInput} type="text" name="searchCustomer" placeholder="Search by name, phone or email" value={customerSearch} onChange={searchCustomer} />
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
                                            {customerState.map((customer: any, index: number) => (
                                                <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
                                                    <td style={formStyles.td}>{customer.full_name}</td>
                                                    <td style={formStyles.td}>{customer.phone_number}</td>
                                                    <td style={formStyles.td}>{customer.email}</td>
                                                    <td style={formStyles.td}>{customer.address || "N/A"}</td>
                                                    <td style={formStyles.td}>
                                                        <button style={formStyles.smallBtn} onClick={() => setCustomerForm(checkNull(customer))}>Edit</button>
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


export default CustomerTable