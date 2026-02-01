import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useCubeQuery } from '@cubejs-client/react';
import { Card, Loading, MessageBanner } from '@folio/stripes/components';

const ProductivityStatsCard = () => {
  const { resultSet, isLoading, error } = useCubeQuery({
    measures: [
      'cataloging_productivity_view.instances_created',
      'cataloging_productivity_view.holdings_created', 
      'cataloging_productivity_view.items_created',
      'cataloging_productivity_view.total_staff'
    ],
    dimensions: [],
    timeDimensions: [{
      dimension: 'cataloging_productivity_view.instance_created_date',
      granularity: 'month',
      dateRange: 'last 30 days'
    }]
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <MessageBanner type="error">
        <FormattedMessage 
          id="ui-reports.productivityReports.stats.error"
          defaultMessage="Error loading productivity statistics"
        />
      </MessageBanner>
    );
  }

  const data = resultSet?.tablePivot() || [];
  const totals = data.reduce((acc, row) => ({
    instances: acc.instances + (parseInt(row['cataloging_productivity_view.instances_created']) || 0),
    holdings: acc.holdings + (parseInt(row['cataloging_productivity_view.holdings_created']) || 0),
    items: acc.items + (parseInt(row['cataloging_productivity_view.items_created']) || 0),
    staff: Math.max(acc.staff, parseInt(row['cataloging_productivity_view.total_staff']) || 0)
  }), { instances: 0, holdings: 0, items: 0, staff: 0 });

  return (
    <Card
      cardStyle="positive"
      headerStart={
        <strong>
          <FormattedMessage 
            id="ui-reports.productivityReports.stats.title"
            defaultMessage="Productivity Overview (Last 30 Days)"
          />
        </strong>
      }
    >
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0071bc' }}>
              {totals.instances.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <FormattedMessage 
                id="ui-reports.productivityReports.stats.instances"
                defaultMessage="Instances Created"
              />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0071bc' }}>
              {totals.holdings.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <FormattedMessage 
                id="ui-reports.productivityReports.stats.holdings"
                defaultMessage="Holdings Created"
              />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0071bc' }}>
              {totals.items.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <FormattedMessage 
                id="ui-reports.productivityReports.stats.items"
                defaultMessage="Items Created"
              />
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0071bc' }}>
              {totals.staff.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <FormattedMessage 
                id="ui-reports.productivityReports.stats.activeStaff"
                defaultMessage="Active Staff"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductivityStatsCard;