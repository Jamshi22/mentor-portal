import { gql } from "@apollo/client";

export const STATES_QUERY = gql`
  query GetAllStates {
    getAllStates {
      error
      message
      states {
        id
        name
        short_name
      }
      status
      success
    }
  }
`;

export const FEE_STIPEND_BOND_DROPDOWN_QUERY = gql`
  query GetDropDownDetailsForFeeStipendBond(
    $stateId: [String!]!
    $counsellingTypeId: String!
    $degreeTypeId: String!
    $bondInservice: Boolean!
  ) {
    getDropDownDetailsForFeeStipendBond(
      stateId: $stateId
      counsellingTypeId: $counsellingTypeId
      degreeTypeId: $degreeTypeId
      bondInservice: $bondInservice
    ) {
      status
      success
      message
      error
      columns {
        quotas {
          name
          id
        }
        institutes {
          name
          id
        }
        instituteTypes {
          name
          id
        }
        courses {
          name
          id
        }
        minMaxFee {
          min
          max
        }
        feeWithBond
        minMaxStipends {
          min
          max
        }
        bondYears
        minMaxbondPenalty {
          min
          max
        }
      }
    }
  }
`;

export const FEE_STIPEND_BOND_QUERY = gql`
  query getAllFeeStipendBondDetails(
    $counsellingTypeId: String!
    $stateId: [String!]!
    $degreeTypeId: String!
    $sortData: sortDataInput!
    $page: Int!
    $instituteTypeId: [String]
    $quotaId: [String]
    $courseId: [String]
    $instituteId: [String]
    $fee: [Int]
    $feeWithBond: Boolean
    $stipendYear: [Int]
    $stipend: [Int]
    $bondInservice: Boolean!
    $bondYear: [String]
    $bondPenalty: [Int]
    $itemsPerPage: Int
  ) {
    getAllFeeStipendBondDetails(
      counsellingTypeId: $counsellingTypeId
      stateId: $stateId
      degreeTypeId: $degreeTypeId
      sortData: $sortData
      page: $page
      instituteTypeId: $instituteTypeId
      quotaId: $quotaId
      courseId: $courseId
      instituteId: $instituteId
      fee: $fee
      feeWithBond: $feeWithBond
      stipendYear: $stipendYear
      stipend: $stipend
      bondInservice: $bondInservice
      bondYear: $bondYear
      bondPenalty: $bondPenalty
      itemsPerPage: $itemsPerPage
    ) {
      message
      status
      success
      error
      itemsInCurrentPage
      totalPages
      totalItems
      itemsPerPage
      currentPage
      feeStipendBondData {
        state_details {
          name
        }
        course_details {
          name
        }
        feeStipendBond_details {
          id
          fee
          fee_withBond
          stipend_year_1
          stipend_year_2
          stipend_year_3
          bond_details_non_inService
          bond_details_inService
          bond_penalty_non_inService
          bond_penalty_inService
          bond_years_non_inService
          bond_years_inService
        }
        instituteType_details {
          name
        }
        institute_details {
          name
        }
        quota_details {
          name
        }
      }
    }
  }
`;