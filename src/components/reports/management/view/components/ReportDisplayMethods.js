import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiColumnList,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function ReportDisplayMethods({ selectedReport }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const formatter = {
    label: (item) => (
      <FormattedMessage
        id={`ui-reports.displayMethods.${item.value}`}
        defaultMessage={item.label}
      />
    ),
    default: (item) => {
      if (selectedReport.defaultDisplayMethod === item.value) {
        return 'default';
      }
      return <div />;
    },
  };

  return (
    <>
      <Accordion
        id="report-details-display-methods-accordion"
        label={
          <FormattedMessage
            id="ui-reports.reportDetails.displayMethods.accordion.header"
            defaultMessage="Display methods"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <MultiColumnList
          id="report-details-display-methods-Multi-Column-List"
          interactive={false}
          visibleColumns={['label', 'default']}
          contentData={selectedReport?.displayMethods}
          columnMapping={{
            label: (
              <FormattedMessage
                id="ui-reports.reportDetails.displayMethods.columns.name"
                defaultMessage="Method name"
              />
            ),
            default: (
              <FormattedMessage
                id="ui-reports.reportDetails.displayMethods.columns.isDefault"
                defaultMessage="Default method"
              />
            ),
          }}
          columnWidths={{
            label: '75%',
            default: '25%',
          }}
          formatter={formatter}
          // autosize
          // hasMargin
        />
      </Accordion>
    </>
  );
}

ReportDisplayMethods.propTypes = {
  selectedReport: PropTypes.object,
};

export default ReportDisplayMethods;
