import { useMemo } from 'react';
import { useIntl } from 'react-intl';

export const useCirculationFieldLabels = () => {
  const intl = useIntl();

  return useMemo(() => ({
    // Loan Fields
    'circulation_view.loan_id': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanId',
      defaultMessage: 'Loan ID',
    }),
    'circulation_view.loan_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanDate',
      defaultMessage: 'Loan Date',
    }),
    'circulation_view.due_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.dueDate',
      defaultMessage: 'Due Date',
    }),
    'circulation_view.return_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.returnDate',
      defaultMessage: 'Return Date',
    }),
    'circulation_view.loan_status': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanStatus',
      defaultMessage: 'Loan Status',
    }),
    'circulation_view.loan_action': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanAction',
      defaultMessage: 'Loan Action',
    }),
    'circulation_view.renewal_count': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.renewalCount',
      defaultMessage: 'Renewal Count',
    }),
    'circulation_view.loan_created_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanCreatedDate',
      defaultMessage: 'Loan Created Date',
    }),
    'circulation_view.loan_updated_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.loanFields.loanUpdatedDate',
      defaultMessage: 'Loan Updated Date',
    }),

    // Patron Fields
    'circulation_view.borrower_username': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.username',
      defaultMessage: 'Username',
    }),
    'circulation_view.borrower_first_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.firstName',
      defaultMessage: 'First Name',
    }),
    'circulation_view.borrower_last_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.lastName',
      defaultMessage: 'Last Name',
    }),
    'circulation_view.borrower_email': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.email',
      defaultMessage: 'Email',
    }),
    'circulation_view.borrower_phone': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.phone',
      defaultMessage: 'Phone',
    }),
    'circulation_view.borrower_barcode': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.barcode',
      defaultMessage: 'Patron Barcode',
    }),
    'circulation_view.patron_group_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.patronGroup',
      defaultMessage: 'Patron Group',
    }),
    'circulation_view.borrower_active': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.active',
      defaultMessage: 'Active Status',
    }),
    'circulation_view.borrower_type': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.type',
      defaultMessage: 'Patron Type',
    }),
    'circulation_view.borrower_enrollment_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.enrollmentDate',
      defaultMessage: 'Enrollment Date',
    }),
    'circulation_view.borrower_expiration_date': intl.formatMessage({
      id: 'ui-reports.circulationReports.patronFields.expirationDate',
      defaultMessage: 'Expiration Date',
    }),

    // Item Fields
    'circulation_view.title': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.title',
      defaultMessage: 'Title',
    }),
    'circulation_view.item_barcode': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.barcode',
      defaultMessage: 'Item Barcode',
    }),
    'circulation_view.item_hrid': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.itemHrid',
      defaultMessage: 'Item HRID',
    }),
    'circulation_view.call_number': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.callNumber',
      defaultMessage: 'Call Number',
    }),
    'circulation_view.material_type': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.materialType',
      defaultMessage: 'Material Type',
    }),
    'circulation_view.loan_type': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.loanType',
      defaultMessage: 'Loan Type',
    }),
    'circulation_view.item_status': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.itemStatus',
      defaultMessage: 'Item Status',
    }),
    'circulation_view.location_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.location',
      defaultMessage: 'Location',
    }),
    'circulation_view.library_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.library',
      defaultMessage: 'Library',
    }),
    'circulation_view.campus_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.campus',
      defaultMessage: 'Campus',
    }),
    'circulation_view.institution_name': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.institution',
      defaultMessage: 'Institution',
    }),
    'circulation_view.contributors': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.contributors',
      defaultMessage: 'Contributors',
    }),
    'circulation_view.identifiers': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.identifiers',
      defaultMessage: 'Identifiers',
    }),
    'circulation_view.subjects': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.subjects',
      defaultMessage: 'Subjects',
    }),
    'circulation_view.resource_type': intl.formatMessage({
      id: 'ui-reports.circulationReports.itemFields.resourceType',
      defaultMessage: 'Resource Type',
    }),

    // Measures
    'circulation_view.total_loans': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.totalLoans',
      defaultMessage: 'Total Loans',
    }),
    'circulation_view.loans_created': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.loansCreated',
      defaultMessage: 'Loans Created',
    }),
    'circulation_view.loans_updated': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.loansUpdated',
      defaultMessage: 'Loans Updated',
    }),
    'circulation_view.total_renewals': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.totalRenewals',
      defaultMessage: 'Total Renewals',
    }),
    'circulation_view.total_borrowers': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.totalBorrowers',
      defaultMessage: 'Total Borrowers',
    }),
    'circulation_view.total_items': intl.formatMessage({
      id: 'ui-reports.circulationReports.measures.totalItems',
      defaultMessage: 'Total Items',
    }),
  }), [intl]);
};