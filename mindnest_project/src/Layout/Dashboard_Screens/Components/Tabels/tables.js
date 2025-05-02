import React from "react";
import "../Tabels/tables.css"
const Tables = ({headers = [], rows = [], emptyMessage = "No data found"}) => {
return(
    <div className="table-main">
        <div className="table-inner">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, idx)=>(
                            <th key={idx} scope="col">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center no-data">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
            </table>
        </div>
    </div>
)
}

export default Tables;