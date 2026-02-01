import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Selection } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { CubeContext, useCubeMeta } from '@cubejs-client/react';
import { translateReferenceValue } from '../../../../../../../helpers/referenceTableTranslations';

function ReferenceValueField({
  field,
  index,
  disabled,
  selectedMember,
  currentCubeMembers,
}) {
  const intl = useIntl();
  const { cubeApi } = useContext(CubeContext);
  const cubeMetaData = useCubeMeta();
  const [referenceValues, setReferenceValues] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get reference table info from member name - memoized to prevent re-renders
  const referenceTableInfo = useMemo(() => {
    if (!selectedMember) return null;

    // Handle selectedMember as object or string (after page refresh, it comes from URL as object)
    const memberName = typeof selectedMember === 'string' ? selectedMember : selectedMember?.value || selectedMember;
    if (!memberName || typeof memberName !== 'string') return null;

    const [cubeName, fieldName] = memberName.split('.');

    // Map cataloging_view reference fields to actual reference tables
    const referenceFieldMapping = {
      'cataloging_view.instance_type_name': {
        cubeName: 'instance_type',
        fieldName: 'name',
      },
      'cataloging_view.instance_status_name': {
        cubeName: 'instance_status',
        fieldName: 'name',
      },
      'cataloging_view.mode_of_issuance_name_ref': {
        cubeName: 'mode_of_issuance',
        fieldName: 'name',
      },
      'cataloging_view.material_type_name': {
        cubeName: 'material_type',
        fieldName: 'name',
      },
      'cataloging_view.loan_type_name': {
        cubeName: 'loan_type',
        fieldName: 'name',
      },
      'cataloging_view.call_number_type_name': {
        cubeName: 'call_number_type',
        fieldName: 'name',
      },
      'cataloging_view.location_name_ref': {
        cubeName: 'location',
        fieldName: 'name',
      },
      'cataloging_view.loclibrary_name': {
        cubeName: 'loclibrary',
        fieldName: 'name',
      },
      'cataloging_view.loccampus_name': {
        cubeName: 'loccampus',
        fieldName: 'name',
      },
      'cataloging_view.locinstitution_name': {
        cubeName: 'locinstitution',
        fieldName: 'name',
      },
      // Complex field reference types (FIXED MAPPING)
      'cataloging_view.contributor_type_name': {
        cubeName: 'contributor_type',
        fieldName: 'name',
      },
      'cataloging_view.contributor_name_type_name': {
        cubeName: 'contributor_name_type',
        fieldName: 'name',
      },
      'cataloging_view.identifier_type_name': {
        cubeName: 'identifier_type',
        fieldName: 'name',
      },
      'cataloging_view.classification_type_name': {
        cubeName: 'classification_type',
        fieldName: 'name',
      },
      'cataloging_view.note_type_name': {
        cubeName: 'instance_note_type',
        fieldName: 'name',
      },
      'cataloging_view.alternative_title_type_name': {
        cubeName: 'alternative_title_type',
        fieldName: 'name',
      },
      // Reference table fields
      'cataloging_view.contributor_type_ref': {
        cubeName: 'contributor_type',
        fieldName: 'name',
      },
      'cataloging_view.identifier_type_ref': {
        cubeName: 'identifier_type',
        fieldName: 'name',
      },
      'cataloging_view.classification_type_ref': {
        cubeName: 'classification_type',
        fieldName: 'name',
      },
      'cataloging_view.note_type_ref': {
        cubeName: 'instance_note_type',
        fieldName: 'name',
      },
      'cataloging_view.statistical_code_name': {
        cubeName: 'statistical_code',
        fieldName: 'name',
      },
      'cataloging_view.statistical_code_type_name': {
        cubeName: 'statistical_code_type',
        fieldName: 'name',
      },
      'cataloging_view.instance_format_name': {
        cubeName: 'instance_format',
        fieldName: 'name',
      },
      'cataloging_view.nature_of_content_name': {
        cubeName: 'nature_of_content_term',
        fieldName: 'name',
      },
      'cataloging_view.alternative_title_type_ref': {
        cubeName: 'alternative_title_type',
        fieldName: 'name',
      },
    };

    // Check if this is a mapped reference field
    if (referenceFieldMapping[memberName]) {
      return referenceFieldMapping[memberName];
    }

    // First check currentCubeMembers (for cataloging reports)
    if (currentCubeMembers) {
      const cube = currentCubeMembers.find((c) => c.name === cubeName);
      if (cube?.meta?.isReferenceTable) {
        return {
          cubeName,
          fieldName, // Use the actual field selected by user
        };
      }
    }

    // Fallback to cubeMetaData (for advanced query builder)
    if (cubeMetaData?.response?.cubes) {
      const cube = cubeMetaData.response.cubes.find((c) => c.name === cubeName);
      if (cube?.meta?.isReferenceTable) {
        return {
          cubeName,
          fieldName, // Use the actual field selected by user
        };
      }
    }

    return null;
  }, [selectedMember, currentCubeMembers, cubeMetaData?.response]);

  // Fetch reference values from CubeJS
  useEffect(() => {
    const fetchReferenceValues = async () => {
      if (!referenceTableInfo || !cubeApi) {
        setReferenceValues([]);
        return;
      }

      setLoading(true);

      const query = {
        dimensions: [
          `${referenceTableInfo.cubeName}.${referenceTableInfo.fieldName}`,
        ],
        measures: [],
        limit: 100,
      };

      try {
        const response = await cubeApi.load(query);

        if (!response) {
          setReferenceValues([]);
          return;
        }

        const tablePivot = response.tablePivot();

        if (!tablePivot || tablePivot.length === 0) {
          setReferenceValues([]);
          return;
        }

        const values = tablePivot
          .map((row) => {
            const fieldKey = `${referenceTableInfo.cubeName}.${referenceTableInfo.fieldName}`;
            const value = row[fieldKey];
            
            // Translate the value using the translation helper
            const translatedLabel = translateReferenceValue(
              intl,
              referenceTableInfo.cubeName,
              referenceTableInfo.fieldName,
              value
            );
            
            return {
              label: translatedLabel || value || 'N/A',
              value: value || '',
            };
          })
          .filter((item) => item.value); // Remove empty values

        setReferenceValues(values);
      } catch (error) {
        console.error('ReferenceValueField: Error loading reference values:', error.message);
        setReferenceValues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceValues();
  }, [referenceTableInfo, cubeApi, intl]);

  return (
    <Field
      id={`query-builder-form-referenceValueField-${index}`}
      component={Selection}
      name={`${field}.values`}
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
      dataOptions={referenceValues}
      disabled={disabled || loading}
      loading={loading}
    />
  );
}

ReferenceValueField.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  selectedMember: PropTypes.string,
  currentCubeMembers: PropTypes.array,
};

export default ReferenceValueField;
