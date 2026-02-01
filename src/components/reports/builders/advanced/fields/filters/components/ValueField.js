import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { TextField, Checkbox, Datepicker, RadioButton, RadioButtonGroup, Label } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { CubeContext, useCubeMeta } from '@cubejs-client/react';
import DateRangeFilter from './DateRangeFilter';
import ReferenceValueField from './ReferenceValueField';

function ValueField({
  field,
  index,
  currentCubeMembers,
  disabled,
  fieldType,
  selectedMember,
  selectedOperator,
  formValues,
}) {
  const intl = useIntl();
  const cubejsApi = useContext(CubeContext);
  const cubeMetaData = useCubeMeta();

  // Get data type for selected field
  const getFieldDataType = () => {
    if (!selectedMember || !currentCubeMembers) return 'string';
    
    // Handle selectedMember as object or string (after page refresh, it comes from URL as object)
    const memberName = typeof selectedMember === 'string' ? selectedMember : selectedMember?.value || selectedMember;
    if (!memberName || typeof memberName !== 'string') return 'string';

    for (const member of currentCubeMembers) {
      const fields = member[fieldType] || [];
      const foundField = fields.find((f) => f.name === memberName);
      if (foundField) {
        return foundField.type || 'string';
      }
    }
    return 'string';
  };

  const dataType = getFieldDataType();

  // Check if this is a reference field
  const isReferenceField = () => {
    if (!selectedMember) return false;
    
    // Handle selectedMember as object or string (after page refresh, it comes from URL as object)
    const memberName = typeof selectedMember === 'string' ? selectedMember : selectedMember?.value || selectedMember;
    if (!memberName || typeof memberName !== 'string') return false;
    
    // Define specific reference fields for cataloging_view
    const referenceFields = [
      'cataloging_view.instance_type_name',
      'cataloging_view.instance_status_name', 
      'cataloging_view.mode_of_issuance_name_ref',
      'cataloging_view.material_type_name',
      'cataloging_view.loan_type_name',
      'cataloging_view.call_number_type_name',
      'cataloging_view.location_name_ref',
      'cataloging_view.loclibrary_name',
      'cataloging_view.loccampus_name',
      'cataloging_view.locinstitution_name',
      // Complex field reference types
      'cataloging_view.contributor_type_name',
      'cataloging_view.contributor_name_type_name',
      'cataloging_view.identifier_type_name',
      'cataloging_view.classification_type_name',
      'cataloging_view.note_type_name',
      'cataloging_view.alternative_title_type_name',
      // Reference table fields
      'cataloging_view.contributor_type_ref',
      'cataloging_view.identifier_type_ref',
      'cataloging_view.classification_type_ref',
      'cataloging_view.note_type_ref',
      'cataloging_view.statistical_code_name',
      'cataloging_view.statistical_code_type_name',
      'cataloging_view.instance_format_name',
      'cataloging_view.nature_of_content_name',
      'cataloging_view.alternative_title_type_ref'
    ];
    
    // Check if this specific field is a reference field
    if (referenceFields.includes(memberName)) {
      return true;
    }
    
    const [cubeName] = memberName.split('.');
    
    // For non-cataloging_view cubes, check meta
    if (cubeName !== 'cataloging_view' && currentCubeMembers) {
      const cube = currentCubeMembers.find(c => c.name === cubeName);
      if (cube?.meta?.isReferenceTable === true) {
        return true;
      }
    }
    
    // Fallback to cubeMetaData (for advanced query builder)
    if (cubeMetaData?.response?.cubes) {
      const cube = cubeMetaData.response.cubes.find(c => c.name === cubeName);
      return cube?.meta?.isReferenceTable === true;
    }
    
    console.log('ValueField: Not a reference field:', selectedMember);
    return false;
  };

  // Render appropriate component based on data type and selected operator
  const renderValueInput = () => {
    const commonProps = {
      id: `query-builder-form-valueField-${index}`,
      name: `${field}.values`,
      disabled,
    };

    // No value field needed for set/notSet operations
    if (['set', 'notSet'].includes(selectedOperator)) {
      return null;
    }

    // Use DateRangeFilter for date range operations
    if (['inDateRange', 'notInDateRange'].includes(selectedOperator)) {
      return (
        <DateRangeFilter
          field={field}
          index={index}
          disabled={disabled}
        />
      );
    }

    // Check if this is a reference field first
    if (isReferenceField()) {
      return (
        <ReferenceValueField
          field={field}
          index={index}
          disabled={disabled}
          selectedMember={selectedMember}
          currentCubeMembers={currentCubeMembers}
        />
      );
    }

    switch (dataType) {
      case 'time':
        return (
          <Field
            {...commonProps}
            component={Datepicker}
            label={
              <FormattedMessage
                id="ui-reports.filters.valueField.label"
                defaultMessage="Value"
              />
            }
            placeholder={intl.formatMessage({
              id: 'ui-reports.filters.valueField.selectPlaceholder',
              defaultMessage: 'Select value',
            })}
            backendDateStandard="ISO8601"
          />
        );

      case 'boolean':
        return (
          <>
            <Label>
              <FormattedMessage
                id="ui-reports.filters.valueField.label"
                defaultMessage="Value"
              />
            </Label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Field
                {...commonProps}
                component={RadioButton}
                type="radio"
                label={intl.formatMessage({
                  id: 'ui-reports.filters.valueField.boolean.yes',
                  defaultMessage: 'Yes',
                })}
                value="true"
              />
              <Field
                {...commonProps}
                component={RadioButton}
                type="radio"
                label={intl.formatMessage({
                  id: 'ui-reports.filters.valueField.boolean.no',
                  defaultMessage: 'No',
                })}
                value="false"
              />
            </div>
          </>
        );

      case 'number':
        return (
          <Field
            {...commonProps}
            component={TextField}
            type="number"
            label={
              <FormattedMessage
                id="ui-reports.filters.valueField.label"
                defaultMessage="Value"
              />
            }
            placeholder={intl.formatMessage({
              id: 'ui-reports.filters.valueField.placeholder',
              defaultMessage: 'Enter value',
            })}
          />
        );

      default: // string
        return (
          <Field
            {...commonProps}
            component={TextField}
            label={
              <FormattedMessage
                id="ui-reports.filters.valueField.label"
                defaultMessage="Value"
              />
            }
            placeholder={intl.formatMessage({
              id: 'ui-reports.filters.valueField.placeholder',
              defaultMessage: 'Enter value',
            })}
          />
        );
    }
  };

  return renderValueInput();
}

ValueField.propTypes = {
  field: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentCubeMembers: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  selectedMember: PropTypes.string,
  selectedOperator: PropTypes.string,
  formValues: PropTypes.object,
};

export default ValueField;
