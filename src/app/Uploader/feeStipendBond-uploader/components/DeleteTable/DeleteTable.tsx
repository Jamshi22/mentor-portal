import React from 'react';
import styles from "./table.module.css";

const DeleteTable = ({ data, Loading }) => {
  const nullValue = "-";
  const formatCurrency = (value: number | string) => {
    if (isNumeric(value)) {
      //@ts-ignore
      let intValue = parseInt(value);
      if (isNaN(intValue)) return null;
      if (intValue < 0) return "-";
      if (intValue < 99999) {
        return `₹${intValue.toLocaleString()}`;
      } else if (intValue < 9999999 && intValue >= 100000) {
        let newValue = intValue / 100000;
        return newValue % 1 === 0
          ? `₹${newValue} Lakhs`
          : `₹${newValue.toFixed(1)} Lakhs`;
          //@ts-ignore
      } else if (value >= 10000000) {
        let newValue = intValue / 10000000;
        return newValue % 1 === 0
          ? `₹${newValue} Crores`
          : `₹${newValue.toFixed(1)} Crores`;
      }
    } else {
      return value;
    }
  };

  function isNumeric(input) {
    // Regular expression to match only numeric characters
    const regex = /^[0-9]+$/;
    // Check if input is a string and match the regex
    return typeof input === "string" && regex.test(input);
  }


  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Institute & Institute Type</th>
            <th>Quota</th>
            <th>Branch</th>
            <th>Fees</th>

            <th>Stipend year 1</th>
            <th>Stipend year 2</th>
            <th>Stipend year 3</th>
            <th>Bond Years</th>
            <th>Bond Penalty</th>
          </tr>
        </thead>

        <tbody>
          {Loading ? (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>
                No data found.
              </td>
            </tr>
          ) : (
            data?.map((item, index) => {
              const getRoundSeats = (roundNum) =>
                item.matrix?.find((r) => r.round === roundNum)?.seats ?? '-';

              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item?.institute_details?.name}</strong>
                    <br />
                    <span className={styles.subText}>{item?.instituteType_details?.name}</span>
                  </td>
                  {/* <td>{item.course}</td> */}
                  <td>{item.quota_details?.name}</td>
                  <td>{item.course_details?.name}</td>
                  <td>{formatCurrency(item?.feeStipendBond_details?.fee!==null && item?.feeStipendBond_details?.fee?.toString())}</td>
                  <td>{formatCurrency(item?.feeStipendBond_details?.stipend_year_1!==null && item?.feeStipendBond_details?.stipend_year_1.toString())}</td>
                  <td>{formatCurrency(item?.feeStipendBond_details?.stipend_year_2!==null && item?.feeStipendBond_details?.stipend_year_2.toString())}</td>
                  <td>{formatCurrency(item?.feeStipendBond_details?.stipend_year_3!==null && item?.feeStipendBond_details?.stipend_year_3.toString())}</td>

                  <td>
                    {item?.feeStipendBond_details?.bond_years_non_inService
                      ? item?.feeStipendBond_details
                        ?.bond_years_non_inService !== -2
                        ? item?.feeStipendBond_details
                          ?.bond_years_non_inService
                        : nullValue
                      : nullValue}
                  </td>

                  {/* <td>
                    ₹
                    {item.fees && item.fees !== "--"
                      ? (parseInt(item.fees) / 100000).toFixed(1) + " Lakhs"
                      : "--"}
                  </td>
                  <td>{getRoundSeats(1)}</td>
                  <td>{getRoundSeats(2)}</td>
                  <td>{getRoundSeats(3)}</td> */}
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
