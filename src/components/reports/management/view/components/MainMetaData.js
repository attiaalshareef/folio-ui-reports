import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Col,
  FilterAccordionHeader,
  KeyValue,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { ViewMetaData } from '@folio/stripes/smart-components';

function MainMetaData({ selectedReport }) {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();

  return (
    <>
      <Accordion
        id="report-details-main-meta-data-view-accordion"
        label={
          <FormattedMessage
            id="ui-reports.reportDetails.mainMetaData.accordion.header"
            defaultMessage="Main data"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator={false}
        header={FilterAccordionHeader}
      >
        <>
          <Row>
            <Col xs={12}>
              <ViewMetaData metadata={selectedReport?.metadata} />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage
                    id="ui-reports.reportDetails.mainMetaData.name"
                    defaultMessage="Report name"
                  />
                }
                value={selectedReport?.name}
              />
            </Col>
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage
                    id="ui-reports.reportDetails.mainMetaData.desc"
                    defaultMessage="Report Desc"
                  />
                }
                value={selectedReport?.desc}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage
                    id="ui-reports.reportDetails.mainMetaData.status"
                    defaultMessage="Status"
                  />
                }
                value={
                  <FormattedMessage
                    id={`ui-reports.filters.status.${selectedReport?.status}`}
                    defaultMessage={selectedReport?.status}
                  />
                }
              />
            </Col>
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage
                    id="ui-reports.reportDetails.mainMetaData.privacyType"
                    defaultMessage="Privacy type"
                  />
                }
                value={
                  <FormattedMessage
                    id={`ui-reports.filters.privacyType.${selectedReport?.privacyType}`}
                    defaultMessage={selectedReport?.privacyType}
                  />
                }
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage
                    id="ui-reports.reportDetails.mainMetaData.reportType"
                    defaultMessage="Report type"
                  />
                }
                // value={selectedReport?.reportType}
                value={
                  <FormattedMessage
                    id={`ui-reports.reportTypes.label.${selectedReport?.reportType}`}
                    defaultMessage={selectedReport?.reportType}
                  />
                }
              />
            </Col>
          </Row>
        </>
      </Accordion>
    </>
  );
}

MainMetaData.propTypes = {
  selectedReport: PropTypes.object.isRequired,
};

export default MainMetaData;
