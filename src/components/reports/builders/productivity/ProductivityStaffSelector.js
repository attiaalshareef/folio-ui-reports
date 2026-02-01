import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, MultiSelection, Selection, Loading, MessageBanner } from '@folio/stripes/components';
import useStaffList from '../../../../hooks/useStaffList';

const ProductivityStaffSelector = ({ values }) => {
  const { staffList, loading, error } = useStaffList();

  const shouldShowStaffSelector = values?.reportType && 
    ['individual', 'team', 'comparison'].includes(values.reportType);

  if (!shouldShowStaffSelector) {
    return null;
  }

  if (loading) {
    return (
      <Accordion
        label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.title" />}
        id="productivity-staff-selector"
      >
        <Loading />
      </Accordion>
    );
  }

  if (error || (!loading && staffList.length === 0)) {
    return (
      <Accordion
        label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.title" />}
        id="productivity-staff-selector"
      >
        <MessageBanner type={error ? "error" : "warning"}>
          <FormattedMessage 
            id={error ? "ui-reports.productivityReports.staffSelector.error" : "ui-reports.productivityReports.staffSelector.noStaff"}
            defaultMessage={error ? "Error loading staff list: {error}" : "No staff members found"}
            values={{ error }}
          />
        </MessageBanner>
      </Accordion>
    );
  }

  return (
    <Accordion
      label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.title" />}
      id="productivity-staff-selector"
    >
      {values.reportType === 'individual' && (
        <Field
          name="selectedStaff"
          component={Selection}
          label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.selectOne" />}
          placeholder="اختر موظف واحد"
          dataOptions={staffList}
        />
      )}
      
      {values.reportType === 'team' && (
        <Field
          name="selectedStaff"
          component={MultiSelection}
          label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.selectTeam" />}
          placeholder="اختر مجموعة من الموظفين"
          dataOptions={staffList}
          itemToString={item => item?.label || ''}
          formatter={({ option }) => option.label}
        />
      )}
      
      {values.reportType === 'comparison' && (
        <Field
          name="selectedStaff"
          component={MultiSelection}
          label={<FormattedMessage id="ui-reports.productivityReports.staffSelector.selectForComparison" />}
          placeholder="اختر موظفين للمقارنة (2 أو أكثر)"
          dataOptions={staffList}
          itemToString={item => item?.label || ''}
          formatter={({ option }) => option.label}
        />
      )}
    </Accordion>
  );
};

export default ProductivityStaffSelector;