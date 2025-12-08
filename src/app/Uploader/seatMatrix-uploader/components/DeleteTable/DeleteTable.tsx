// import React from 'react';
// import styles from "./table.module.css";

// const DeleteTable = ({ data, Loading }) => {

//   function generateTableHeaders(matrix = []) {
//     if (!Array.isArray(matrix) || matrix.length === 0) return [];

//     // Extract all unique (year, round) pairs
//     const uniquePairs = [];
//     const seen = new Set();

//     for (const item of matrix) {
//       const key = `${item.year}-R${item.round}`;
//       if (!seen.has(key)) {
//         seen.add(key);
//         uniquePairs.push({ year: item.year, round: item.round });
//       }
//     }

//     // Sort by year → round
//     uniquePairs.sort((a, b) => a.year - b.year || a.round - b.round);

//     // Return HTML header strings
//     return uniquePairs.map(pair => `<th>${pair.year} R${pair.round}</th>`);
//   }





//   function getDocWithLargestMatrix(data = []) {
//     if (!Array.isArray(data) || data.length === 0) return null;

//     return data.reduce((maxDoc, currentDoc) => {
//       const currentLen = currentDoc.matrix?.length || 0;
//       const maxLen = maxDoc.matrix?.length || 0;
//       return currentLen > maxLen ? currentDoc : maxDoc;
//     });
//   }

//   // Example usage:
//   const matrix =  getDocWithLargestMatrix(data);

//   return (
//     <div className={styles.tableWrapper}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Institute & Institute Type</th>
//             <th>Course</th>
//             <th>Quota</th>
//             <th>Category</th>
//             <th>Fees</th>
//             {
//                generateTableHeaders(matrix).join('\n')
//             }
//           </tr>
//         </thead>

//         <tbody>
//           {Loading ? (
//             <tr>
//               <td colSpan={9} style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : data?.length === 0 ? (
//             <tr>
//               <td colSpan={9} style={{ textAlign: "center" }}>
//                 No data found.
//               </td>
//             </tr>
//           ) : (
//             data?.map((item, index) => {
//               const getRoundSeats = (roundNum) =>
//                 item.matrix?.find((r) => r.round === roundNum)?.seats ?? '-';

//               return (
//                 <tr key={item._id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <strong>{item.instituteName}</strong>
//                     <br />
//                     <span className={styles.subText}>{item.instituteType}</span>
//                   </td>
//                   <td>{item.course}</td>
//                   <td>{item.quota?.name}</td>
//                   <td>{item.category?.name}</td>
//                   <td>
//                     ₹
//                     {item.fees && item.fees !== "--"
//                       ? (parseInt(item.fees) / 100000).toFixed(1) + " Lakhs"
//                       : "--"}
//                   </td>
//                   <td>{getRoundSeats(1)}</td>
//                   <td>{getRoundSeats(2)}</td>
//                   <td>{getRoundSeats(3)}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DeleteTable;




import React from 'react';
import styles from "./table.module.css";

const DeleteTable = ({ data, Loading }) => {

  // ✅ Generate table headers dynamically
  function generateTableHeaders(matrix = []) {
    if (!Array.isArray(matrix) || matrix.length === 0) return [];

    const uniquePairs = [];
    const seen = new Set();

    for (const item of matrix) {
      const key = `${item.year}-R${item.round}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniquePairs.push({ year: item.year, round: item.round });
      }
    }

    // Sort by year → round
    uniquePairs.sort((a, b) => a.year - b.year || a.round - b.round);

    // ✅ Return JSX <th> elements instead of strings
    return uniquePairs.map(pair => (
      <th key={`${pair.year}-${pair.round}`}>
        {pair.year} R{pair.round}
      </th>
    ));
  }

  // ✅ Find document with largest matrix
  function getDocWithLargestMatrix(data = []) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.reduce((maxDoc, currentDoc) => {
      const currentLen = currentDoc.matrix?.length || 0;
      const maxLen = maxDoc.matrix?.length || 0;
      return currentLen > maxLen ? currentDoc : maxDoc;
    });
  }

  // Example usage
  const matrixDoc = getDocWithLargestMatrix(data);
  const matrix = matrixDoc?.matrix || [];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Institute & Institute Type</th>
            <th>Course</th>
            <th>Quota</th>
            <th>Category</th>
            <th>Fees</th>
            {generateTableHeaders(matrix)}
          </tr>
        </thead>

        <tbody>
          {Loading ? (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>Loading...</td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>No data found.</td>
            </tr>
          ) : (
            data.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.instituteName}</strong>
                    <br />
                    <span className={styles.subText}>{item.instituteType}</span>
                  </td>
                  <td>{item.course}</td>
                  <td>{item.quota?.name}</td>
                  <td>{item.category?.name}</td>
                  <td>
                    ₹
                    {item.fees && item.fees !== "--"
                      ? (parseInt(item.fees) / 100000).toFixed(1) + " Lakhs"
                      : "--"}
                  </td>

                  {/* ✅ Dynamically generate seat columns based on headers */}
                  {matrix.map(({ year, round }) => {
                    const match = item.matrix?.find(
                      r => r.year === year && r.round === round
                    );
                    return <td key={`${item._id}-${year}-${round}`}>{match?.seats ?? '-'}</td>;
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteTable;
