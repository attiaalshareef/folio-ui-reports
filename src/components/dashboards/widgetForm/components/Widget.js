import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Icon, Layout, Loading } from '@folio/stripes/components';
import { useCubeQuery } from '@cubejs-client/react';
import css from './widget.css';
import WidgetActionsMenu from './WidgetActionsMenu';
import ReportsContext from '../../../../Context/reports/ReportsContext';
import { renderDisplayComponent } from '../../../reports/results/core/DisplayMethodRegistry';
import MultiReportsWidget from './MultiReportsWidget';

function Widget({ widget, index, onDeleteWidget, currentDashboard }) {
  const reports = useContext(ReportsContext);
  const [reportData, setReportData] = useState({});
  const [widgetType, setWidgetType] = useState('singleReport');

  // تحديد نوع الويدجت من البيانات
  useEffect(() => {
    if (widget?.reportsIds?.length > 1) {
      setWidgetType('multiReports');
    } else {
      setWidgetType('singleReport');
    }
  }, [widget]);

  // للويدجت أحادي التقرير
  const { resultSet, error, isLoading } = useCubeQuery(
    widgetType === 'singleReport' ? widget?.queriesMetadata?.[0] : null,
    {
      subscribe: true,
      skip: widgetType !== 'singleReport',
    },
  );

  useEffect(() => {
    if (widgetType === 'singleReport' && widget?.reportsIds?.[0]) {
      const report = reports.find((rep) => rep.id === widget.reportsIds[0]);
      setReportData(report);
    }
  }, [reports, widget.reportsIds, widgetType]);

  const renderWidgetContent = () => {
    if (widgetType === 'singleReport') {
      // عرض الويدجت أحادي التقرير
      if (error) {
        return (
          <div style={{ padding: '1rem', textAlign: 'center', color: 'red' }}>
            <Icon icon="exclamation-circle" />
            <div>Error loading report</div>
          </div>
        );
      }

      if (isLoading) {
        return (
          <Layout
            className="centered full"
            style={{ maxWidth: '15rem', height: '8rem' }}
          >
            <Loading size="xlarge" />
          </Layout>
        );
      }

      if (reportData?.defaultDisplayMethod) {
        return (
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            {renderDisplayComponent(reportData.defaultDisplayMethod, {
              resultSet: resultSet || [],
              reportType: reportData.reportType,
            })}
          </div>
        );
      }

      return null;
    } else {
      // عرض الويدجت متعدد التقارير
      return (
        <MultiReportsWidget 
          widget={widget}
          widgetType={widgetType}
        />
      );
    }
  };

  return (
    <Col xs={widgetType === 'multiReports' ? 12 : 6}>
      <Card
        id={`card-new-widget-${index}`}
        cardClass={css.cardClass}
        headerClass={css.headerClass}
        roundedBorder
        headerStart={
          <Icon icon={widgetType === 'multiReports' ? 'duplicate' : 'report'}>
            {widget?.name}
          </Icon>
        }
        headerEnd={
          <WidgetActionsMenu 
            onDeleteWidget={onDeleteWidget} 
            widget={widget}
            currentDashboard={currentDashboard}
          />
        }
        marginBottom0
      >
        {renderWidgetContent()}
      </Card>
    </Col>
  );
}

Widget.propTypes = {
  widget: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDeleteWidget: PropTypes.func.isRequired,
  currentDashboard: PropTypes.object,
};

export default Widget;
