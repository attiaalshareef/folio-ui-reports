import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiColumnList,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function QueryMetadata({ selectedReport }) {
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
            id="ui-reports.reportDetails.queryMetadata.accordion.header"
            defaultMessage="Query metadata"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <MultiColumnList
          id="report-details-query-metadata-Multi-Column-List"
          interactive={false}
          visibleColumns={['dimensions', 'measures', 'order', 'timeDimensions']}
          contentData={[selectedReport?.queryMetadata]}
          // columnMapping={{
          //   label: (
          //     <FormattedMessage
          //       id="ui-reports.reportDetails.queryMetadata.columns.name"
          //       defaultMessage="Method name"
          //     />
          //   ),
          //   default: (
          //     <FormattedMessage
          //       id="ui-reports.reportDetails.queryMetadata.columns.isDefault"
          //       defaultMessage="Default method"
          //     />
          //   ),
          // }}
          columnWidths={{
            label: '75%',
            default: '25%',
          }}
          //   formatter={formatter}
        />
      </Accordion>
    </>
  );
}

QueryMetadata.propTypes = {
  selectedReport: PropTypes.object,
};

export default QueryMetadata;
