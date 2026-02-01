import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { withStripes } from '@folio/stripes/core';

class DashboardsSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired
    }).isRequired,
    intl: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes, intl } = this.props;

    return (
      <this.connectedControlledVocab
        stripes={stripes}
        /* Kware start editing */
        instanceName="dashboards"
        appName="ui-reports"
        translatableFields={['name', 'desc']}
        /* Kware end editing */
        baseUrl="dashboards"
        records="dashboards"
        label={intl.formatMessage({
          id: 'ui-reports.settings.dashboards.paneTitle',
          defaultMessage: 'Dashboards List'
        })}
        objectLabel={
          <FormattedMessage
            id="ui-reports.settings.dashboards.paneTitle"
            defaultMessage="Dashboards List"
          />
        }
        visibleFields={['name', 'desc']}
        hiddenFields={['numberOfObjects']}
        columnMapping={{
          name: intl.formatMessage({
            id: 'ui-reports.settings.dashboards.fields.name',
            defaultMessage: 'Name'
          }),
          desc: intl.formatMessage({
            id: 'ui-reports.settings.dashboards.fields.description',
            defaultMessage: 'Desc'
          })
        }}
        nameKey="name"
        id="dashboards"
        sortby="name"
      />
    );
  }
}

export default injectIntl(withStripes(DashboardsSettings));
