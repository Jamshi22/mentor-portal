"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import "./columndelete.css";
import { TailSpin } from "react-loader-spinner";

const ColumnTableDelete = ({ tableData, Loading, yearsData, year, round }) => {
  // All year-rounds from all data
  const allYearRoundPairs = yearsData.flatMap((y) =>
    y.rounds.map((r) => ({ year: y.year, round: r }))
  );

  // User-selected years and rounds
const selectedYearValues = year ? [year.value] : [];
  const selectedYearRoundPairs = round.map((r) => {
    const [yr, rd] = r.value.split("-");
    return { year: +yr, round: +rd };
  });

  // Sort years descending to get latest
  const sortedYears = [...yearsData].sort((a, b) => b.year - a.year);

  // Default: last 2 years (initial render)
  const lastTwoYears = sortedYears.slice(0, 2).map((y) => y.year);
  const lastTwoYearRoundPairs = yearsData
    .filter((y) => lastTwoYears.includes(y.year))
    .flatMap((y) => y.rounds.map((r) => ({ year: y.year, round: r })));

  // 🔀 Final display logic
  let yearRoundPairsToShow = [];

  if (selectedYearRoundPairs.length > 0) {
    // ✅ User selected rounds
    yearRoundPairsToShow = selectedYearRoundPairs;
  // } else if (selectedYearValues.length > 0) {
  //   // ✅ Only year selected
  //   yearRoundPairsToShow = yearsData
  //     .filter((y) => selectedYearValues.includes(y.year))
  //     .flatMap((y) => y.rounds.map((r) => ({ year: y.year, round: r })));
  // } else {
  }else if (selectedYearValues.length > 0) {
  yearRoundPairsToShow = yearsData
    .filter((y) => selectedYearValues.includes(y.year))
    .flatMap((y) => y.rounds.map((r) => ({ year: y.year, round: r })));
}else{
    // ✅ Initial render — show last 2 years
    yearRoundPairsToShow = lastTwoYearRoundPairs;
  }

  if (Loading) {
    return (
      <div className="loading_container">
        <TailSpin />
      </div>
    );
  }

  // console.log(tableData?.data, "tableData");

  return (
    <>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Institute Name / Quota</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Fee Session</th>
              <th>State</th>
              {/* <th>2024 R1</th>
              <th>2024 R2</th>
              <th>2024 R3</th> */}
              {/* 👇 Dynamically render year/round columns */}
              {/* {yearsData.map((yearItem) =>
                yearItem.rounds.map((round) => (
                  <th key={`${yearItem.year}-R${round}`}>
                    {yearItem.year} R{round}
                  </th>
                ))
              )} */}
              {yearRoundPairsToShow.map(({ year, round }) => (
                <th key={`th-${year}-R${round}`}>
                  {year} R{round}
                </th>
              ))}
            </tr>
          </thead>

          {Loading ? (
            <TailSpin />
          ) : (
            <tbody>
              {tableData?.data?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="table_column__">
                        <div>{data.InstituteName}</div>
                        <div>{data.QuotaName}</div>
                      </div>
                    </td>

                    <td>{data.CategoryName}</td>
                    <td>{data.DegreeName}</td>
                    <td>{data.fee}</td>
                    <td>{data.fee_session}</td>
                    <td>{data.StateName}</td>
                    {/* <td>{data.min_rank_2023_round_1}</td>
                    <td>{data && "-"}</td>
                    <td>{data && "-"}</td> */}

                    {/* {yearsData.map((yearItem) =>
                      yearItem.rounds.map((round) => {
                        const match = data.value_array?.find(
                          (entry) =>
                            entry.year === yearItem.year &&
                            entry.round === round
                        );

                        return (
                          <td
                            key={`${data.InstituteId}-${yearItem.year}-R${round}`}
                          >
                            {match?.max_rank ?? "-"}
                          </td>
                        );
                      })
                    )} */}
                    {yearRoundPairsToShow.map(({ year, round }) => {
                      const match = data.value_array?.find(
                        (entry) => entry.year === year && entry.round === round
                      );

                      return (
                        <td key={`td-${data.InstituteId}-${year}-R${round}`}>
                          {match?.max_rank ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ColumnTableDelete;
