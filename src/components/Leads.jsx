"use client";

import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import '../styles/lead.css'

// Column helper setup
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("userDetails.first_name", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor("userDetails.last_name", {
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("userDetails.email", {
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor("userDetails.phone_number", {
    cell: (info) => info.getValue(),
    header: () => <span>Phone Number</span>,
  }),
  columnHelper.accessor("subscriptionDetails.plan_name", {
    cell: (info) => info.getValue(),
    header: () => <span>Plan Name</span>,
  }),
  columnHelper.accessor("payment_method", {
    cell: (info) => info.getValue(),
    header: () => <span>Payment Method</span>,
  }),
  columnHelper.accessor("amount", {
    cell: (info) => info.getValue(),
    header: () => <span>Amount</span>,
  }),
  columnHelper.accessor("transaction_id", {
    cell: (info) => info.getValue(),
    header: () => <span>Transaction Id</span>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
  }),
];

const Leads = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

  const pageLimit = 10;
  const page = 1;

  useEffect(() => {
    // Get user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails?.employee?.id) {
      setEmployeeId(userDetails.employee.id); // Set the employee ID
    }
  }, []);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!employeeId) return; // Don't fetch if employeeId is not set
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}offline-payments?page=${page}&limit=${pageLimit}&employeeId=${employeeId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming you are using token-based auth
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setEmployeeData(data.payment);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployeeData();
  }, [page, pageLimit, employeeId]);
  
  // Set up the table
  const table = useReactTable({
    data: employeeData,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>

      <div className="containers">
        <table className="leads-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <GoArrowDown />
                        ) : (
                          <GoArrowUp />
                        )
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leads;
