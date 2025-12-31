import formStyles from "../../styles/forms";


interface overAll {
  total_balance_in_naria: number;
  total_naira: number;
  total_payments_in_naira: number;
  total_usd_gain: number;
  total_usd_price: number;
  total_usd_rate: number;
}

interface byCurrency {
  base_currency: string;
  total_amount: number;
  total_balance_in_naria: number;
  total_naira: number;
  total_payments_in_naira: number;
  total_usd_gain: number;
  total_usd_price: number;
  total_usd_rate: number;
}



export default function OverAll({ overall, byCurrency}:
    { overall: overAll, byCurrency: byCurrency[]}) {
  return (
    <div>
        <div style={formStyles.sectionCard}>
        <h3 style={formStyles.sectionTitle}>Summary</h3>
        <table style={formStyles.table}>
            <thead style={formStyles.thead}>
                <tr>
                    <th style={formStyles.th}>Total Amount (Naira)</th>
                    <th style={formStyles.th}>Total Paid (Naira)</th>
                    <th style={formStyles.th}>Balance (Naira)</th>
                    <th style={formStyles.th}>Total USD Price</th>
                    <th style={formStyles.th}>Total USD Rate</th>
                    <th style={formStyles.th}>Total USD Gain</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td style={formStyles.td}>{overall.total_naira}</td>
                        <td style={formStyles.td}>{overall.total_payments_in_naira}</td>
                        <td style={formStyles.td}>{overall.total_balance_in_naria}</td>
                        <td style={formStyles.td}>{overall.total_usd_price}</td>
                        <td style={formStyles.td}>{overall.total_usd_rate}</td>
                        <td style={formStyles.td}>{overall.total_usd_gain}</td>
                    </tr>
            </tbody>
        </table>
        </div>

         <div style={formStyles.sectionCard}>
        <h3 style={formStyles.sectionTitle}>Summary By Currency</h3>
        <table style={formStyles.table}>
            <thead style={formStyles.thead}>
                <tr>
                    <th style={formStyles.th}>Base Currency</th>
                    <th style={formStyles.th}>Total Amount</th>
                    <th style={formStyles.th}>Total Amount (Naira)</th>
                    <th style={formStyles.th}>Total Paid (Naira)</th>
                    <th style={formStyles.th}>Balance (Naira)</th>
                    <th style={formStyles.th}>Total USD Price</th>
                    <th style={formStyles.th}>Total USD Rate</th>
                    <th style={formStyles.th}>Total USD Gain</th>
                </tr>
            </thead>
            <tbody>
                {byCurrency.map((item, index) => (
                    <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
                        <td style={formStyles.td}>{item.base_currency}</td>
                        <td style={formStyles.td}>{item.total_amount}</td>
                        <td style={formStyles.td}>{item.total_naira}</td>
                        <td style={formStyles.td}>{item.total_payments_in_naira}</td>
                        <td style={formStyles.td}>{item.total_balance_in_naria}</td>
                        <td style={formStyles.td}>{item.total_usd_price}</td>
                        <td style={formStyles.td}>{item.total_usd_rate}</td>
                        <td style={formStyles.td}>{item.total_usd_gain}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
}
