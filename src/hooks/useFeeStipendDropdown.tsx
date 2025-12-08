"use client";
import { useQuery } from "@apollo/client";
import { FEE_STIPEND_BOND_DROPDOWN_QUERY } from "../utils/gql/query";

type UseFeeStipendDropdownParams = {
  selectedStates: string[];
  counsellingTypeId: string;
  degreeTypeId: string;
  bondInservice: boolean;
};

export const useFeeStipendDropdown = ({
  selectedStates,
  counsellingTypeId,
  degreeTypeId,
  bondInservice,
}: UseFeeStipendDropdownParams) => {
  // const shouldSkip =
  //   !selectedStates?.length || !counsellingTypeId || !degreeTypeId;

  // ✅ Always call useQuery, but control execution with `skip`
  const { data, loading, error } = useQuery(FEE_STIPEND_BOND_DROPDOWN_QUERY, {
    variables: {
      stateId: selectedStates,
      counsellingTypeId,
      degreeTypeId,
      bondInservice,
    },
    // skip: shouldSkip,
    fetchPolicy: "network-only", // 👈 force fresh data on each variable change
  });

  return {
    loading,
    error,
    data: data?.getDropDownDetailsForFeeStipendBond?.columns ?? null,
  };
};
