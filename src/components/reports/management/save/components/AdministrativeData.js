import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Col,
  FilterAccordionHeader,
  Row,
  Select,
  TextArea,
  TextField
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useForm } from 'react-final-form';
import {
  reportPrivacyOptions,
  reportStatusOptions
} from '../../../../../constants/dataOptions';
import { required } from '../../../../../helpers/Validations';
import reportTypesConfig from '../../../../../constants/ReportsTypes';

function AdministrativeData({ reportTypeRecord, selectedReportType, setSelectedReportType }) {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const form = useForm();

  const reportTypeOptions = reportTypesConfig.map(type => ({
    value: type.value,
    label: intl.formatMessage({
      id: `ui-reports.reportTypes.${type.value}.name`,
      defaultMessage: type.name
    })
  }));

  return (
    <>
      <Accordion
        id="save-new-report-administrativeData-accordion"
        label={
          <FormattedMessage
            id="ui-reports.saveNewReportForm.administrativeData.accordion.header"
            defaultMessage="Administrative data"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator={false}
        header={FilterAccordionHeader}
      >
        <Row>
          <Col xs={12}>
            <Field
              id="save-new-report-name-textField"
              name="reportName"
              component={TextField}
              label={
                <FormattedMessage
                  id="ui-reports.saveNewReportForm.reportNameField.label"
                  defaultMessage="Report name"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.saveNewReportForm.reportNameField.placeholder',
                defaultMessage: 'Enter report name'
              })}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              id="save-new-form-report-desc-textField"
              name="reportDesc"
              component={TextArea}
              label={
                <FormattedMessage
                  id="ui-reports.saveNewReportForm.reportDescField.label"
                  defaultMessage="Report description"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.saveNewReportForm.reportDescField.placeholder',
                defaultMessage: 'Enter report desc'
              })}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              id="save-new-form-report-type-select"
              name="reportType"
              component={Select}
              label={
                <FormattedMessage
                  id="ui-reports.saveNewReportForm.reportTypeField.label"
                  defaultMessage="Report type"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.saveNewReportForm.reportTypeField.placeholder',
                defaultMessage: 'Select report type'
              })}
              dataOptions={reportTypeOptions}
              onChange={(e) => {
                const newType = e.target.value;
                setSelectedReportType(newType);
                form.change('reportType', newType);
              }}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Field
              id="save-new-form-report-desc-selectField"
              name="reportStatus"
              component={Select}
              label={
                <FormattedMessage
                  id="ui-reports.saveNewReportForm.reportStatusField.label"
                  defaultMessage="Report status"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.saveNewReportForm.reportStatusField.placeholder',
                defaultMessage: 'Enter report status'
              })}
              dataOptions={reportStatusOptions(intl)}
              required
            />
          </Col>
          <Col xs={6}>
            <Field
              id="save-new-form-report-privacy-type-select-Field"
              name="privacyType"
              component={Select}
              label={
                <FormattedMessage
                  id="ui-reports.saveNewReportForm.reportPrivacyField.label"
                  defaultMessage="Privacy type"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.saveNewReportForm.reportPrivacyField.placeholder',
                defaultMessage: 'Enter report privacy type'
              })}
              dataOptions={reportPrivacyOptions(intl)}
              required
            />
          </Col>
        </Row>
      </Accordion>
    </>
  );
}

AdministrativeData.propTypes = {
  reportTypeRecord: PropTypes.object,
  selectedReportType: PropTypes.string,
  setSelectedReportType: PropTypes.func
};

export default AdministrativeData;
