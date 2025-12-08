// hooks to get all states data 
"use client";

import { gql, useQuery } from "@apollo/client";
import { STATES_QUERY } from "../utils/gql/query";
export const useStatesData = () => {
  const { data, loading, error } = useQuery(STATES_QUERY);

  const states = data?.getAllStates?.states || [];

  return {
    states,
    loading,
    error,
  };
};
