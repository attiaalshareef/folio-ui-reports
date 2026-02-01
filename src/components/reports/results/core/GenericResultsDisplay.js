import PropTypes from 'prop-types';
import { Layout, Loading } from '@folio/stripes/components';
import { renderDisplayComponent } from './DisplayMethodRegistry';
import ErrorMessage from '../../../common/errorMessage/ErrorMessage';
import EmptyData from '../../../common/emptyData/EmptyData';

function GenericResultsDisplay({
  resultSet,
  error,
  isLoading,
  displayMethod,
  reportType,
  onDrillDown,
  exportOptions,
  printOptions,
  query,
}) {
  // Handle loading state
  if (isLoading) {
    return (
      <Layout
        className="centered full"
        style={{ maxWidth: '15rem', height: '8rem' }}
      >
        &nbsp;
        <Loading size="xlarge" />
      </Layout>
    );
  }

  // Handle error state
  if (error && !isLoading) {
    return <ErrorMessage errorMessage={error.toString()} />;
  }

  // Handle empty query
  if (!query || query === '') {
    return <EmptyData />;
  }

  // Handle no results
  if (!resultSet || Object.keys(resultSet).length === 0) {
    return <EmptyData />;
  }

  // Render results using new display registry
  return renderDisplayComponent(displayMethod, {
    resultSet,
    reportType,
    onDrillDown,
    printOptions,
    exportOptions,
    // Default configurations for different report types
    drillDownMeasures:
      reportType === 'productivity'
        ? [
          'cataloging_productivity_view_instances_created',
          'cataloging_productivity_view_instances_updated',
          'cataloging_productivity_view_holdings_created',
          'cataloging_productivity_view_holdings_updated',
          'cataloging_productivity_view_items_created',
          'cataloging_productivity_view_items_updated',
          'cataloging_productivity_view_instances_suppressed',
          'cataloging_productivity_view_instances_discovery_suppressed',
          'cataloging_productivity_view_instances_staff_suppressed',
        ]
        : [],
    hiddenFields:
      reportType === 'productivity'
        ? ['cataloging_productivity_view_instance_created_by']
        : [],
  });
}

GenericResultsDisplay.propTypes = {
  resultSet: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  displayMethod: PropTypes.string.isRequired,
  reportType: PropTypes.string,
  onDrillDown: PropTypes.func,
  exportOptions: PropTypes.shape({
    excel: PropTypes.bool,
    pdf: PropTypes.bool,
  }),
  printOptions: PropTypes.shape({
    componentRef: PropTypes.object,
    targetRef: PropTypes.object,
    isShowPrintWindow: PropTypes.bool,
    currentReport: PropTypes.object,
    onAfterPrint: PropTypes.func,
  }),
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

GenericResultsDisplay.defaultProps = {
  exportOptions: { excel: true, pdf: true },
  printOptions: {},
};

export default GenericResultsDisplay;
