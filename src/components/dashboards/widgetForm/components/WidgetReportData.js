/* eslint-disable implicit-arrow-linebreak */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  Accordion,
  Button,
  Card,
  Col,
  FilterAccordionHeader,
  Icon,
  MultiSelection,
  Row,
  Select,
  Selection,
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import ReportsContext from '../../../../Context/reports/ReportsContext';
import widgetTypes from '../../../../constants/WidgetsTypes';

function WidgetReportData({ 
  currentReport, 
  setCurrentReport, 
  widgetType, 
  setWidgetType,
  selectedReports,
  setSelectedReports 
}) {
  const intl = useIntl();
  const reports = useContext(ReportsContext);
  const [filterToggle, setFilterToggle] = useState(true);
  const [currentWidgetType, setCurrentWidgetType] = useState(widgetTypes[0]);

  useEffect(() => {
    if (widgetType) {
      const type = widgetTypes.find(t => t.value === widgetType);
      setCurrentWidgetType(type || widgetTypes[0]);
    }
  }, [widgetType]);

  const handleAddReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report && selectedReports.length < currentWidgetType.maxReports) {
      const newReports = [...selectedReports, report];
      setSelectedReports(newReports);
      if (currentWidgetType.value === 'singleReport') {
        setCurrentReport(report);
      }
    }
  };

  const handleRemoveReport = (reportId) => {
    const newReports = selectedReports.filter(r => r.id !== reportId);
    setSelectedReports(newReports);
    if (currentWidgetType.value === 'singleReport' && newReports.length === 0) {
      setCurrentReport(null);
    }
  };

  return (
    <>
      <Accordion
        id="widget-form.widget-report-data-accordion"
        label={
          <FormattedMessage
            id="ui-reports.dashboards.widgetForm.reportData.accordion.header"
            defaultMessage="Report Data"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator={false}
        header={FilterAccordionHeader}
      >
        <Row>
          <Col xs={6}>
            <Field
              id="widget-form-widget-type-selection-field"
              name="widgetType"
              component={Selection}
              label={
                <FormattedMessage
                  id="ui-reports.dashboards.widgetForm.widgetTypeField.label"
                  defaultMessage="Widget type"
                />
              }
              placeholder={intl.formatMessage({
                id: 'ui-reports.dashboards.widgetForm.widgetTypeField.placeholder',
                defaultMessage: 'Select widget type',
              })}
              dataOptions={widgetTypes.map((type) => ({
                label: intl.formatMessage(type.translationKey),
                value: type.value,
              }))}
              onChange={(value) => {
                setWidgetType(value);
                setSelectedReports([]);
                setCurrentReport(null);
              }}
            />
          </Col>
          <Col xs={6}>
            {currentWidgetType.value === 'singleReport' ? (
              <Selection
                id="widget-form-report-data-report-name-selection-field"
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.reportData.nameField.label"
                    defaultMessage="Report name"
                  />
                }
                value={currentReport?.id}
                dataOptions={reports.map((report) => ({
                  label: report.name,
                  value: report.id,
                }))}
                onChange={(reportId) => handleAddReport(reportId)}
              />
            ) : (
              <Selection
                id="widget-form-report-data-add-report-selection-field"
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.reportData.addReportField.label"
                    defaultMessage="Add report"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.dashboards.widgetForm.reportData.addReportField.placeholder',
                  defaultMessage: 'Select report to add',
                })}
                dataOptions={reports
                  .filter(report => !selectedReports.find(r => r.id === report.id))
                  .map((report) => ({
                    label: report.name,
                    value: report.id,
                  }))}
                onChange={(reportId) => handleAddReport(reportId)}
                disabled={selectedReports.length >= currentWidgetType.maxReports}
              />
            )}
          </Col>
        </Row>
        {/* عرض التقارير المحددة */}
        {selectedReports.length > 0 && (
          <Row>
            <Col xs={12}>
              <div style={{ marginTop: '1rem' }}>
                <FormattedMessage
                  id="ui-reports.dashboards.widgetForm.reportData.selectedReports.label"
                  defaultMessage="Selected Reports ({count}/{max})"
                  values={{
                    count: selectedReports.length,
                    max: currentWidgetType.maxReports
                  }}
                />
                {selectedReports.map((report, index) => (
                  <Card
                    key={report.id}
                    cardStyle="positive"
                    roundedBorder
                    marginBottom0
                    style={{ marginTop: '0.5rem' }}
                    headerStart={
                      <Icon icon="report">
                        {report.name}
                      </Icon>
                    }
                    headerEnd={
                      <Button
                        buttonStyle="none"
                        onClick={() => handleRemoveReport(report.id)}
                      >
                        <Icon icon="times" />
                      </Button>
                    }
                  >
                    <div style={{ padding: '0.5rem' }}>
                      <small>{report.desc}</small>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        )}
        
        {/* إعدادات الأعمدة للتقرير الواحد */}
        {currentWidgetType.value === 'singleReport' && currentReport?.id && (
          <Row>
            <Col xs={6}>
              <Field
                id="widget-form-report-data-report-visable-columns-selection-field"
                name="visableColumns"
                component={MultiSelection}
                label={
                  <FormattedMessage
                    id="ui-reports.dashboards.widgetForm.reportData.visableColumnsField.label"
                    defaultMessage="Visible columns"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.dashboards.widgetForm.reportData.visableColumnsField.placeholder',
                  defaultMessage: 'Select visible columns',
                })}
                dataOptions={currentReport?.queryMetadata?.measures?.map(
                  (col) => ({
                    label: col,
                    value: col,
                  })
                )}
              />
            </Col>
          </Row>
        )}
      </Accordion>
    </>
  );
}

WidgetReportData.propTypes = {
  currentReport: PropTypes.object,
  setCurrentReport: PropTypes.func.isRequired,
  widgetType: PropTypes.string,
  setWidgetType: PropTypes.func.isRequired,
  selectedReports: PropTypes.array,
  setSelectedReports: PropTypes.func.isRequired,
};

export default WidgetReportData;
