import formStyles from "../../styles/forms";
import { addCommas } from "../helper";



interface overAll {
  total_balance_in_naria: number;
  total_naira: number;
  total_payments_in_naira: number;
  total_usd_gain: number;
  total_usd_bid: number;
  total_usd_ask: number;
}

interface byCurrency {
  base_currency: string;
  total_amount: number;
  total_balance_in_naria: number;
  total_naira: number;
  total_payments_in_naira: number;
  total_usd_gain: number;
  total_usd_bid: number;
  total_usd_ask: number;
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
                    <th style={formStyles.th}>Total USD Bid</th>
                    <th style={formStyles.th}>Total USD Ask</th>
                    <th style={formStyles.th}>Total USD Gain</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td style={formStyles.td}>{addCommas(overall.total_naira?.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(overall.total_payments_in_naira?.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(overall.total_balance_in_naria?.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(overall.total_usd_bid?.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(overall.total_usd_ask?.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(overall.total_usd_gain?.toFixed(2))}</td>
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
                    <th style={formStyles.th}>Total USD Bid</th>
                    <th style={formStyles.th}>Total USD Ask</th>
                    <th style={formStyles.th}>Total USD Gain</th>
                </tr>
            </thead>
            <tbody>
                {byCurrency.map((item, index) => (
                    <tr key={index} style={{ background: index % 2 ? "#ffffff" : "#fbfdff" }}>
                        <td style={formStyles.td}>{item.base_currency}</td>
                        <td style={formStyles.td}>{addCommas(item.total_amount.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_naira.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_payments_in_naira.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_balance_in_naria.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_usd_bid.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_usd_ask.toFixed(2))}</td>
                        <td style={formStyles.td}>{addCommas(item.total_usd_gain.toFixed(2))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
  )
}
