import { FormattedMessage } from 'react-intl';

export const ReportColumnMapping = {
  rowIndex: '#',
  loclibrary_name: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.loclibrary_name"
      defaultMessage="Library name"
    />
  ),
  location_name: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.location_name"
      defaultMessage="Location name"
    />
  ),
  instance_count: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.instance_count"
      defaultMessage="Instances count"
    />
  ),
  item_count: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.item_count"
      defaultMessage="Items count"
    />
  ),
  material_type_name: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.material_type_name"
      defaultMessage="Material type name"
    />
  ),
  holdings_record_count: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.holdings_record_count"
      defaultMessage="Holdings record count"
    />
  ),
  location_count: (
    <FormattedMessage
      id="ui-reports.listPreview.columns.location_count"
      defaultMessage="Locations count"
    />
  ),
};
