import React from 'react';
import { Pane, Button, Row, Col, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { AppIcon } from '@folio/stripes-core';
import {
  FaBook,
  FaExchangeAlt,
  FaUsers,
  FaCogs,
  FaChartBar,
  FaTruck,
} from 'react-icons/fa';

const REPORT_BUILDER_OPTIONS = [
  {
    id: 'cataloging',
    title: 'Cataloging Reports',
    description: 'Simple report builder for cataloging data',
    icon: FaBook,
    route: '/reports/cataloging-reports',
    category: 'simple',
  },
  {
    id: 'circulation',
    title: 'Circulation Reports',
    description: 'Simple report builder for circulation data',
    icon: FaExchangeAlt,
    route: '/reports/circulation-reports',
    category: 'simple',
  },
  {
    id: 'users',
    title: 'Users Reports',
    description: 'Simple report builder for user data',
    icon: FaUsers,
    route: '/reports/users-reports',
    category: 'simple',
    disabled: true,
  },
  {
    id: 'acquisition',
    title: 'Acquisition Reports',
    description: 'Ready report builder for acquisition data',
    icon: FaTruck,
    route: '/reports/acquisition-reports',
    category: 'simple',
    disabled: true,
  },
  {
    id: 'productivity',
    title: 'Productivity Reports',
    description: 'Staff productivity reports for cataloging activities',
    icon: FaChartBar,
    route: '/reports/productivity-reports',
    category: 'simple',
  },
  {
    id: 'advanced',
    title: 'Advanced Query Builder',
    description: 'Full-featured query builder for complex reports',
    icon: FaCogs,
    route: '/reports/query-builder',
    category: 'advanced',
  },
];

function ReportBuilderSelection() {
  const history = useHistory();
  const [selectedBuilder, setSelectedBuilder] = React.useState(null);

  const handleSelectBuilder = (option) => {
    if (!option.disabled) {
      setSelectedBuilder(option);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedBuilder) {
      history.push(selectedBuilder.route);
    }
  };

  const handleDoubleClick = (option) => {
    if (!option.disabled) {
      history.push(option.route);
    }
  };

  const renderBuilderCard = (option) => (
    <Col xs={12} sm={6} key={option.id}>
      <div
        role="button"
        tabIndex={option.disabled ? -1 : 0}
        onClick={() => handleSelectBuilder(option)}
        onDoubleClick={() => handleDoubleClick(option)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectBuilder(option);
          }
        }}
        style={{
          cursor: option.disabled ? 'not-allowed' : 'pointer',
          marginBottom: '1rem',
          opacity: option.disabled ? 0.6 : 1,
          border:
            selectedBuilder?.id === option.id
              ? '2px solid #0071bc'
              : '1px solid #d4d4d4ff',
          borderRadius: '4px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <option.icon
          size={32}
          style={{ marginBottom: '0.5rem', color: '#0071bc' }}
        />
        <h4 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>
          <FormattedMessage
            id={`ui-reports.reportBuilderSelection.${option.id}.title`}
            defaultMessage={option.title}
          />
        </h4>
        <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
          <FormattedMessage
            id={`ui-reports.reportBuilderSelection.${option.id}.description`}
            defaultMessage={option.description}
          />
        </p>
      </div>
    </Col>
  );

  const simpleBuilders = REPORT_BUILDER_OPTIONS.filter(
    (opt) => opt.category === 'simple',
  );
  const advancedBuilders = REPORT_BUILDER_OPTIONS.filter(
    (opt) => opt.category === 'advanced',
  );

  return (
    <Pane
      id="pane-report-builder-selection"
      appIcon={<AppIcon app="reports" />}
      defaultWidth="fill"
      fluidContentWidth
      padContent={false}
      paneTitle={
        <FormattedMessage
          id="ui-reports.reportBuilderSelection.modalTitle"
          defaultMessage="Select Report Builder"
        />
      }
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            padding: '1rem',
            borderTop: '1px solid #ddd',
            backgroundColor: '#f8f9fa',
          }}
        >
          <Button
            buttonStyle="default"
            onClick={() => setSelectedBuilder(null)}
            disabled={!selectedBuilder}
            marginBottom0
          >
            <FormattedMessage
              id="ui-reports.reportBuilderSelection.cancel"
              defaultMessage="Cancel"
            />
          </Button>
          <Button
            buttonStyle="primary"
            onClick={handleConfirmSelection}
            disabled={!selectedBuilder}
            marginBottom0
          >
            <Icon icon="arrow-right" size="large">
              <FormattedMessage
                id="ui-reports.reportBuilderSelection.select"
                defaultMessage="Select"
              />
            </Icon>
          </Button>
        </div>
      }
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <FaChartBar
              style={{
                marginRight: '0.5rem',
                marginLeft: '0.5rem',
                color: '#0071bc',
              }}
            />
            <FormattedMessage
              id="ui-reports.reportBuilderSelection.simpleBuilders.title"
              defaultMessage="Simple Report Builders"
            />
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            <FormattedMessage
              id="ui-reports.reportBuilderSelection.simpleBuilders.description"
              defaultMessage="Easy-to-use report builders for specific data categories"
            />
          </p>
          <Row>{simpleBuilders.map(renderBuilderCard)}</Row>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <FaCogs
              style={{
                marginRight: '0.5rem',
                marginLeft: '0.5rem',
                color: '#0071bc',
              }}
            />
            <FormattedMessage
              id="ui-reports.reportBuilderSelection.advancedBuilders.title"
              defaultMessage="Advanced Query Builder"
            />
          </h3>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            <FormattedMessage
              id="ui-reports.reportBuilderSelection.advancedBuilders.description"
              defaultMessage="Full-featured query builder for complex custom reports"
            />
          </p>
          <Row>{advancedBuilders.map(renderBuilderCard)}</Row>
        </div>
      </div>
    </Pane>
  );
}

ReportBuilderSelection.propTypes = {};

export default ReportBuilderSelection;
