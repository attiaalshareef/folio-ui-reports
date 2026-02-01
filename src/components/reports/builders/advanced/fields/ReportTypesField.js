import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { reportTypesOptions } from '../../../../../constants/dataOptions';
import css from './styles.css';
import reportTypes from '../../../../../constants/ReportsTypes';

function ReportTypesField(props) {
  const [openHelpe, setOpenHelpe] = useState(false);

  const intl = useIntl();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ width: '98%' }}>
          <Select
            id="query-builder-form-reportType-select-field"
            label={
              <FormattedMessage
                id="ui-reports.queryBuilder.reportTypeField.label"
                defaultMessage="Report type"
              />
            }
            placeholder={intl.formatMessage({
              id: 'ui-reports.queryBuilder.reportTypeField.placeholder',
              defaultMessage: 'Choose report type'
            })}
            dataOptions={reportTypesOptions(intl)}
            required
            value={props.reportType}
            onChange={e => {
              props.setReportType(e.target.value);
              props.resetForm();
            }}
          />
        </div>
        <div style={{ paddingTop: '12px', justifyContent: 'flex-end' }}>
          <Button
            buttonStyle="slim"
            id="query-builder-pane-apply-btn"
            marginBottom0
            onClick={() => setOpenHelpe(!openHelpe)}
            onMouseDown={e => e.preventDefault()}
          >
            <Icon size="large" icon="info" />
          </Button>
        </div>
      </div>
      {openHelpe && (
        <div className={css.layout}>
          {reportTypes.find(report => report.value === props.reportType)?.desc}
        </div>
      )}
    </>
  );
}

ReportTypesField.propTypes = {
  reportType: PropTypes.string.isRequired,
  setReportType: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
};

export default ReportTypesField;
