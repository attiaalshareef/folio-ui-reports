import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  Col, 
  Icon, 
  Layout, 
  Loading, 
  Row
} from '@folio/stripes/components';
import { useCubeQuery } from '@cubejs-client/react';
import { FormattedMessage } from 'react-intl';
import ReportsContext from '../../../../Context/reports/ReportsContext';
import { renderDisplayComponent } from '../../../reports/results/core/DisplayMethodRegistry';
import widgetTypes from '../../../../constants/WidgetsTypes';

function MultiReportsWidget({ widget, widgetType = 'multiReports' }) {
  const reports = useContext(ReportsContext);
  const [reportsData, setReportsData] = useState([]);
  const [currentWidgetType, setCurrentWidgetType] = useState(null);

  useEffect(() => {
    const type = widgetTypes.find(t => t.value === widgetType);
    setCurrentWidgetType(type);
  }, [widgetType]);

  useEffect(() => {
    if (widget?.reportsIds && reports.length > 0) {
      const widgetReports = widget.reportsIds.map(reportId => 
        reports.find(report => report.id === reportId)
      ).filter(Boolean);
      setReportsData(widgetReports);
    }
  }, [widget, reports]);

  const renderSingleReportWidget = () => {
    if (!reportsData[0] || !widget?.queriesMetadata?.[0]) return null;

    return (
      <SingleReportDisplay 
        report={reportsData[0]}
        query={widget.queriesMetadata[0]}
      />
    );
  };

  const renderMultiReportsWidget = () => {
    if (!reportsData.length) return null;

    return (
      <Row>
        {reportsData.map((report, index) => (
          <Col xs={6} key={report.id}>
            <Card
              roundedBorder
              cardStyle="positive"
              headerStart={<Icon icon="report">{report.name}</Icon>}
              marginBottom0
              style={{ marginBottom: '1rem' }}
            >
              <SingleReportDisplay 
                report={report}
                query={widget?.queriesMetadata?.[index]}
                compact
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderComparisonWidget = () => {
    if (!reportsData.length) return null;

    return (
      <Row>
        {reportsData.map((report, index) => (
          <Col xs={12 / reportsData.length} key={report.id}>
            <Card
              roundedBorder
              cardStyle="default"
              headerStart={<Icon icon="report">{report.name}</Icon>}
              marginBottom0
              style={{ marginBottom: '1rem' }}
            >
              <SingleReportDisplay 
                report={report}
                query={widget?.queriesMetadata?.[index]}
                compact
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderWidgetContent = () => {
    switch (widgetType) {
      case 'singleReport':
        return renderSingleReportWidget();
      case 'multiReports':
        return renderMultiReportsWidget();
      case 'comparison':
        return renderComparisonWidget();
      default:
        return renderSingleReportWidget();
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {renderWidgetContent()}
    </div>
  );
}

// مكون فرعي لعرض تقرير واحد
function SingleReportDisplay({ report, query, compact = false }) {
  const { resultSet, error, isLoading } = useCubeQuery(query, {
    subscribe: true,
  });

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
        style={{ 
          maxWidth: compact ? '10rem' : '15rem', 
          height: compact ? '4rem' : '8rem' 
        }}
      >
        <Loading size={compact ? 'medium' : 'xlarge'} />
      </Layout>
    );
  }

  if (!resultSet) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <FormattedMessage 
          id="ui-reports.widget.noData"
          defaultMessage="No data available"
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: compact ? '100px' : '200px' }}>
      {renderDisplayComponent(report?.defaultDisplayMethod || 'numLabel', {
        resultSet,
        reportType: report?.reportType,
      })}
    </div>
  );
}

SingleReportDisplay.propTypes = {
  report: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  compact: PropTypes.bool,
};

MultiReportsWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  widgetType: PropTypes.string,
};

export default MultiReportsWidget;