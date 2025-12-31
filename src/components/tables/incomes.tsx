import formStyles from "../../styles/forms";

interface Income {
  base_currency: string;
  channel: string;
  date: string;
  full_name: string;
  nature: string;
  paid_amount: number;
  payee_name: string;
  transactionId: string;
  transaction_amount: number;
}

export default function Incomes({ income,total_income,total_income_by_channel }: 
    { income: Income[], total_income:number, total_income_by_channel: { [key: string]: number }}) {
  return (
    <div style={formStyles.sectionCard}>
        <h3 style={formStyles.sectionTitle}>Incomes</h3>
        <table style={formStyles.table}>
            <thead style={formStyles.thead}>
                <tr>
                    <th style={formStyles.th}>Date</th>
                    <th style={formStyles.th}>Full Name</th>
                    <th style={formStyles.th}>Paid Amount</th>
                    <th style={formStyles.th}>Payee Name</th>
                    <th style={formStyles.th}>Transaction ID</th>
                    <th style={formStyles.th}>Base Currency</th>
                    <th style={formStyles.th}>Transaction Amount</th>
                    <th style={formStyles.th}>Channel</th>
                    <th style={formStyles.th}>Nature</th>
                </tr>
            </thead>
            <tbody>
                {income.map((item, index) => (
                    <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
                        <td style={formStyles.td}>{item.date}</td>
                        <td style={formStyles.td}>{item.full_name}</td>
                        <td style={formStyles.td}>{item.paid_amount}</td>
                        <td style={formStyles.td}>{item.payee_name}</td>
                        <td style={formStyles.td}>{item.transactionId}</td>
                        <td style={formStyles.td}>{item.base_currency}</td>
                        <td style={formStyles.td}>{item.transaction_amount}</td>
                        <td style={formStyles.td}>{item.channel}</td>
                        <td style={formStyles.td}>{item.nature}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {Object.entries(total_income_by_channel).map(([channel, total]) => (
                    <tr key={channel}>
                        <td style={formStyles.td} colSpan={2}><strong style={{color:'black'}}>{channel}</strong></td>
                        <td style={formStyles.td} colSpan={6} ><strong style={{color:'black'}}>{total}</strong></td>
                        <td style={formStyles.td} ></td>

                    </tr>
                ))}
                <tr>
                    <td style={formStyles.td} colSpan={2}><strong>Total Income</strong></td>
                    <td style={formStyles.td} colSpan={6}><strong>{total_income}</strong></td>
                    <td style={formStyles.td} ></td>
                </tr>
            </tfoot>
        </table>

    </div>
  )
}
