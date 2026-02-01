import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Select } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-final-form';
import { filtersOperators } from '../../utils';
import { useOperatorLabels } from '../../../../../../../helpers/catalogingFieldLabels';

function OperatorField({ field, index, disabled, currentCubeMembers, fieldType, selectedMember }) {
  const intl = useIntl();
  const operatorLabels = useOperatorLabels();
  const form = useForm();
  
  // Reset operator when field changes to ensure compatibility
  useEffect(() => {
    if (selectedMember) {
      const dataType = getFieldDataType();
      const currentOperator = form.getFieldState(`${field}.operator`)?.value;
      
      // Check if current operator is compatible with new field type
      const compatibleOperators = getFilteredOperators().map(op => op.value);
      
      if (currentOperator && !compatibleOperators.includes(currentOperator)) {
        // Reset to default operator for this field type
        const defaultOperator = dataType === 'time' ? 'equals' : 'equals';
        form.change(`${field}.operator`, defaultOperator);
        // Also clear the values
        form.change(`${field}.values`, undefined);
      }
    }
  }, [selectedMember, field, form]);

  // Get data type for selected field
  const getFieldDataType = () => {
    if (!selectedMember || !currentCubeMembers) return 'string';
    
    // Handle selectedMember as object or string
    const memberName = typeof selectedMember === 'string' ? selectedMember : selectedMember?.value || selectedMember;
    if (!memberName || typeof memberName !== 'string') return 'string';
    
    for (const member of currentCubeMembers) {
      const fields = member[fieldType] || [];
      const foundField = fields.find(f => f.name === memberName);
      if (foundField) {
        return foundField.type || 'string';
      }
    }
    return 'string';
  };

  // Filter operators based on data type
  const getFilteredOperators = () => {
    const dataType = getFieldDataType();
    
    let filteredOps;
    switch (dataType) {
      case 'time':
        filteredOps = filtersOperators.filter(op => 
          ['equals', 'notEquals', 'gt', 'gte', 'lt', 'lte', 'set', 'notSet', 
           'inDateRange', 'notInDateRange', 'beforeDate', 'afterDate'].includes(op.value)
        );
        break;
      
      case 'number':
        filteredOps = filtersOperators.filter(op => 
          ['equals', 'notEquals', 'gt', 'gte', 'lt', 'lte', 'set', 'notSet'].includes(op.value)
        );
        break;
      
      case 'boolean':
        filteredOps = filtersOperators.filter(op => 
          ['equals', 'notEquals', 'set', 'notSet'].includes(op.value)
        );
        break;
      
      default: // string
        filteredOps = filtersOperators.filter(op => 
          !['inDateRange', 'notInDateRange', 'beforeDate', 'afterDate'].includes(op.value)
        );
        break;
    }
    
    // Apply translations to operator labels
    return filteredOps.map(op => ({
      ...op,
      label: operatorLabels[op.value] || op.label
    }));
  };

  return (
    <>
      <Field
        id={`query-builder-form-operatorField-select-${index}`}
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.operatorField.label"
            defaultMessage="Operator"
          />
        }
        name={`${field}.operator`}
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.operatorField.placeholder',
          defaultMessage: 'Choose operator name',
        })}
        dataOptions={getFilteredOperators()}
        disabled={disabled}
        defaultValue="equals"
      />
    </>
  );
}

OperatorField.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  currentCubeMembers: PropTypes.array,
  fieldType: PropTypes.string,
  selectedMember: PropTypes.string,
};

export default OperatorField;
