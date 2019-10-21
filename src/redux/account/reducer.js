import {
  REQUEST_ACCOUNT,
  RECEIVE_ACCOUNT,
  REQUEST_ACCOUNT_REMARKS,
  RECEIVE_ACCOUNT_REMARKS,
  REQUEST_ORG_REMARKS,
  RECEIVE_ORG_REMARKS,
  INVALIDATE_ACCOUNT,
  REQUEST_ACCOUNT_CHARGE_DATA,
  RECEIVE_ACCOUNT_CHARGE_DATA,
  REQUEST_ACCOUNT_EQUIPMENT,
  RECEIVE_ACCOUNT_EQUIPMENT,
  REQUEST_EQUIPMENT_ITEM,
  RECEIVE_EQUIPMENT_ITEM,
  REQUEST_METERING,
  RECEIVE_METERING,
  REQUEST_BILLING_SUMMARY,
  RECEIVE_BILLING_SUMMARY,
  REQUEST_DEBTS,
  RECEIVE_DEBTS,
  REQUEST_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  REQUEST_DOCUMENT_ITEM,
  RECEIVE_DOCUMENT_ITEM,
  REQUEST_DOCUMENT_REMARKS,
  RECEIVE_DOCUMENT_REMARKS,
  REQUEST_REQUISITES,
  RECEIVE_REQUISITES,
  REQUEST_OFFICIALS,
  RECEIVE_OFFICIALS,
  REQUEST_BANK_ACCOUNTS,
  RECEIVE_BANK_ACCOUNTS,
  REQUEST_PAYMENTS,
  RECEIVE_PAYMENTS,
  REQUEST_OBJECTS,
  RECEIVE_OBJECTS,
  REQUEST_DOCUMENT_CALC,
  RECEIVE_DOCUMENT_CALC,
  WRITE_PHONE,
  REQUEST_SUPR_OBJECTS,
  RECEIVE_SUPR_OBJECTS
} from './actions'

const DEFAULT_STATE = {
  summaryLoading: true,
  accountRemarksLoading: true,
  chargeDataLoading: true,
  documentsLoading: true,
  documentItemLoading: true,
  documentRemarksLoading: true,
  equipmentLoading: true,
  equipmentItemLoading: true,
  meteringLoading: true,
  billingSummaryLoading: true,
  debtsByMonthsLoading: true,
  requisitesLoading: true,
  officialsLoading: true,
  bankAccountsLoading: true,
  paymentsLoading: true,
  fetchingObjects: true,
  docCalculationLoading: true,
  accountSummary: null,
  suprObjects: null,
  suprObjectsLoading: true
}

export default function account (state = DEFAULT_STATE, { type, payload, isOrg }) {
  switch (type) {
    case REQUEST_ACCOUNT:
      return {
        ...state,
        summaryLoading: true
      }
    case RECEIVE_ACCOUNT:
      return {
        ...state,
        summaryLoading: false,
        accountSummary: payload,
        isOrg
      }
    case REQUEST_ACCOUNT_REMARKS:
      return {
        ...state,
        accountRemarksLoading: true
      }
    case RECEIVE_ACCOUNT_REMARKS:
      return {
        ...state,
        accountRemarksLoading: false,
        accountRemarks: payload
      }
    case REQUEST_ORG_REMARKS:
      return {
        ...state,
        accountRemarksLoading: true
      }
    case RECEIVE_ORG_REMARKS:
      return {
        ...state,
        accountRemarksLoading: false,
        accountRemarks: payload
      }
    case REQUEST_ACCOUNT_CHARGE_DATA:
      return {
        ...state,
        chargeDataLoading: true
      }
    case RECEIVE_ACCOUNT_CHARGE_DATA:
      return {
        ...state,
        chargeData: payload,
        chargeDataLoading: false
      }
    case REQUEST_ACCOUNT_EQUIPMENT:
      return {
        ...state,
        equipmentLoading: true
      }
    case RECEIVE_ACCOUNT_EQUIPMENT:
      return {
        ...state,
        equipment: payload,
        equipmentLoading: false
      }
    case REQUEST_EQUIPMENT_ITEM:
      return {
        ...state,
        equipmentItemLoading: true
      }
    case RECEIVE_EQUIPMENT_ITEM:
      return {
        ...state,
        equipmentItem: payload,
        equipmentItemLoading: false
      }
    case REQUEST_METERING:
      return {
        ...state,
        meteringLoading: true
      }
    case RECEIVE_METERING:
      return {
        ...state,
        metering: payload,
        meteringLoading: false
      }
    case REQUEST_BILLING_SUMMARY:
      return {
        ...state,
        billingSummaryLoading: true
      }
    case RECEIVE_BILLING_SUMMARY:
      return {
        ...state,
        billingSummary: payload,
        billingSummaryLoading: false
      }
    case REQUEST_DEBTS:
      return {
        ...state,
        debtsByMonthsLoading: true
      }
    case RECEIVE_DEBTS:
      return {
        ...state,
        debtsByMonths: payload,
        debtsByMonthsLoading: false
      }
    case REQUEST_DOCUMENTS:
      return {
        ...state,
        documentsLoading: true
      }
    case RECEIVE_DOCUMENTS:
      return {
        ...state,
        documents: payload,
        documentsLoading: false
      }
    case REQUEST_DOCUMENT_ITEM:
      return {
        ...state,
        documentItemLoading: true
      }
    case RECEIVE_DOCUMENT_ITEM:
      return {
        ...state,
        documentItem: payload,
        documentItemLoading: false
      }
    case REQUEST_DOCUMENT_REMARKS:
      return {
        ...state,
        documentRemarksLoading: true
      }
    case RECEIVE_DOCUMENT_REMARKS:
      return {
        ...state,
        documentRemarks: payload,
        documentRemarksLoading: false
      }
    case REQUEST_REQUISITES:
      return {
        ...state,
        requisitesLoading: true
      }
    case RECEIVE_REQUISITES:
      return {
        ...state,
        requisites: payload,
        requisitesLoading: false
      }
    case REQUEST_OFFICIALS:
      return {
        ...state,
        officialsLoading: true
      }
    case RECEIVE_OFFICIALS:
      return {
        ...state,
        officials: payload,
        officialsLoading: false
      }
    case REQUEST_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccountsLoading: true
      }
    case RECEIVE_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts: payload,
        bankAccountsLoading: false
      }
    case REQUEST_PAYMENTS:
      return {
        ...state,
        paymentsLoading: true
      }
    case RECEIVE_PAYMENTS:
      return {
        ...state,
        payments: payload,
        paymentsLoading: false
      }
    case REQUEST_OBJECTS:
      return {
        ...state,
        fetchingObjects: true
      }
    case RECEIVE_OBJECTS:
      return {
        ...state,
        fetchingObjects: false,
        objects: payload
      }
    case REQUEST_DOCUMENT_CALC:
      return {
        ...state,
        docCalculationLoading: true
      }
    case RECEIVE_DOCUMENT_CALC:
      return {
        ...state,
        docCalculationLoading: false,
        docCalculation: payload
      }
    case WRITE_PHONE:
      return {
        ...state,
        abonentPhone: payload
      }
    case REQUEST_SUPR_OBJECTS:
      return {
        ...state,
        suprObjects: null,
        suprObjectsLoading: true
      }
    case RECEIVE_SUPR_OBJECTS:
      return {
        ...state,
        suprObjectsLoading: false,
        suprObjects: payload
      }
    case INVALIDATE_ACCOUNT:
      return DEFAULT_STATE
    default:
      return state
  }
}
