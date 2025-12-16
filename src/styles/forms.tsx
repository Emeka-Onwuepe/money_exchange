import type { CSSProperties } from "react";

const formStyles: { [k: string]: CSSProperties } = {
    page: {
        fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
        padding: 20,
        background: "#f6f8fa",
        color: "#222",
        minHeight: "100vh",
    },
    headerRow: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        marginBottom: 20,
        flexWrap: "wrap",
    },
    formsColumn: {
        flex: "0 0 360px",
        background: "#fff",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 1px 4px rgba(15,15,15,0.08)",
    },
    formTitle: {
        margin: "0 0 12px 0",
        fontSize: 18,
        color: "#0b5fff",
        textAlign:'center'
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    input: {
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #d8dee7",
        fontSize: 14,
        width:"95%"
    },
    submitBtn: {
        marginTop: 8,
        padding: "8px 12px",
        borderRadius: 6,
        border: "none",
        background: "#0b5fff",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
    },
    listsColumn: {
        flex: 1,
        minWidth: 420,
    },
    sectionCard: {
        background: "#fff",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 1px 4px rgba(15,15,15,0.06)",
        marginBottom: 16,
    },
    sectionTitle: {
        margin: "0 0 12px 0",
        fontSize: 18,
        color: "#0b5aaa",
        textTransform:"capitalize"


    },
    searchRow: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #d8dee7",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 14,
    },
    th: {
        textAlign: "center",
        padding: "8px 10px",
        border: " 1.5px dotted black",
        // borderBottom: "2px dotted black",
        color: "black",
        // fontWeight: 600,
        background: "#fff",
    },
    td: {
        padding: "10px 8px",
        borderBottom: "1px solid #f1f4f8",
        verticalAlign: "middle",
    },
    smallBtn: {
        padding: "6px 8px",
        borderRadius: 6,
        border: "1px solid #d0d7e0",
        background: "#fff",
        cursor: "pointer",
    },
    pagination: {
        display: "inline-flex",
        gap: 8,
        alignItems: "center",
    },
    pageInfo: {
        fontSize: 13,
        color: "#666",
    },
};

export default formStyles;

