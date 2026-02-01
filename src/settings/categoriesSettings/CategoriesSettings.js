import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { withStripes } from '@folio/stripes/core';

class CategoriesSettings extends React.Component {
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
        instanceName="reports.categories"
        appName="ui-reports"
        translatableFields={['name', 'desc']}
        /* Kware end editing */
        baseUrl="categories"
        records="categories"
        label={intl.formatMessage({
          id: 'ui-reports.settings.sections.categories.paneTitle',
          defaultMessage: 'Reports Categories'
        })}
        objectLabel={
          <FormattedMessage
            id="ui-reports.settings.sections.categories.paneTitle"
            defaultMessage="Reports Categories"
          />
        }
        visibleFields={['name', 'desc']}
        hiddenFields={['numberOfObjects']}
        columnMapping={{
          name: intl.formatMessage({
            id: 'ui-reports.settings.categories.fields.name',
            defaultMessage: 'Name'
          }),
          desc: intl.formatMessage({
            id: 'ui-reports.settings.categories.fields.description',
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

export default injectIntl(withStripes(CategoriesSettings));
