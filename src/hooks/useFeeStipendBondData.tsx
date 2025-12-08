// hooks/useFeeStipendBondData.ts
import { useQuery } from "@apollo/client";
import { FEE_STIPEND_BOND_QUERY } from "../utils/gql/query"; // adjust path if needed

interface Props {
  counsellingTypeId: string;
  stateId: string[];
  degreeTypeId: string;
  page: number;
  sortData: {
    column: string;
    order: string;
  };
  bondInservice: boolean;
  instituteTypeId?: string[];
  quotaId?: string[];
  courseId?: string[];
  instituteId?: string[];
  fee?: number[];
  feeWithBond?: boolean;
  stipendYear?: number[];
  stipend?: number[];
  bondYear?: string[];
  bondPenalty?: number[];
  itemsPerPage?: number;
}

export const useFeeStipendBondData = ({
  counsellingTypeId,
  stateId,
  degreeTypeId,
  page,
  sortData,
  bondInservice,
  instituteTypeId = [],
  quotaId = [],
  courseId = [],
  instituteId = [],
  fee = [],
  feeWithBond,
  stipendYear = [],
  stipend = [],
  bondYear = [],
  bondPenalty = [],
  itemsPerPage = 20,
}: Props) => {
  const { data, loading, error, refetch } = useQuery(FEE_STIPEND_BOND_QUERY, {
    variables: {
      counsellingTypeId,
      stateId,
      degreeTypeId,
      page,
      sortData,
      bondInservice,
      instituteTypeId,
      quotaId,
      courseId,
      instituteId,
      fee,
      feeWithBond,
      stipendYear,
      stipend,
      bondYear,
      bondPenalty,
      itemsPerPage,
    },
    fetchPolicy: "network-only", // or "no-cache" if you want to always fetch fresh
  });

  return {
    data: data?.getAllFeeStipendBondDetails || {},
    loading,
    error,
    refetch,
  };
};
