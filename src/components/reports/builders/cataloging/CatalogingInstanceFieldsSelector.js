import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Accordion,
  FilterAccordionHeader,
  MultiSelection,
  RepeatableField,
  Row,
  Col,
  Label,
} from '@folio/stripes/components';
import FieldFilter from '../advanced/fields/filters/components/FieldFilter';
import OperatorField from '../advanced/fields/filters/components/OperatorField';
import ValueField from '../advanced/fields/filters/components/ValueField';
import { useCatalogingFieldLabels } from '../../../../helpers/catalogingFieldLabels';

const CatalogingInstanceFieldsSelector = ({ formValues }) => {
  const [filterToggle, setFilterToggle] = useState(true);
  const intl = useIntl();
  const fieldLabels = useCatalogingFieldLabels();

  const instanceFieldsOptions = [
    {
      value: 'cataloging_view.title',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.title',
        defaultMessage: 'Title',
      }),
    },
    {
      value: 'cataloging_view.instance_hrid',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.hrid',
        defaultMessage: 'HRID',
      }),
    },
    {
      value: 'cataloging_view.series_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.seriesList',
        defaultMessage: 'Series',
      }),
    },
    {
      value: 'cataloging_view.editions_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.editionsList',
        defaultMessage: 'Editions',
      }),
    },
    {
      value: 'cataloging_view.contributors',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.contributors',
        defaultMessage: 'Contributors',
      }),
    },
    {
      value: 'cataloging_view.identifiers',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.identifiers',
        defaultMessage: 'Identifiers',
      }),
    },
    {
      value: 'cataloging_view.publication_info',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.publicationInfo',
        defaultMessage: 'Publication Info',
      }),
    },
    {
      value: 'cataloging_view.publicationrange',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.publicationRange',
        defaultMessage: 'Publication Range',
      }),
    },
    {
      value: 'cataloging_view.subjects',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.subjects',
        defaultMessage: 'Subjects',
      }),
    },
    {
      value: 'cataloging_view.classifications',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.classifications',
        defaultMessage: 'Classifications',
      }),
    },
    {
      value: 'cataloging_view.languages',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.languages',
        defaultMessage: 'Languages',
      }),
    },
    {
      value: 'cataloging_view.nature_of_content_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.natureOfContent',
        defaultMessage: 'Nature of Content',
      }),
    },
    {
      value: 'cataloging_view.physicaldescriptions',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.physicalDescriptions',
        defaultMessage: 'Physical Descriptions',
      }),
    },
    {
      value: 'cataloging_view.instance_formats_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.instanceFormatsList',
        defaultMessage: 'Instance Formats',
      }),
    },
    {
      value: 'cataloging_view.electronic_access_urls',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.electronicAccessUrls',
        defaultMessage: 'Electronic Access URLs',
      }),
    },
    {
      value: 'cataloging_view.alternative_titles_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.alternativeTitlesList',
        defaultMessage: 'Alternative Titles',
      }),
    },
    {
      value: 'cataloging_view.indextitle',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.indexTitle',
        defaultMessage: 'Index Title',
      }),
    },
    {
      value: 'cataloging_view.statistical_codes_list',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.statisticalCodesList',
        defaultMessage: 'Statistical Codes',
      }),
    },
    {
      value: 'cataloging_view.resource_status',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.instanceStatus',
        defaultMessage: 'Instance Status',
      }),
    },
    {
      value: 'cataloging_view.resource_type',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.resourceType',
        defaultMessage: 'Resource Type',
      }),
    },
    {
      value: 'cataloging_view.suppression_status',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.suppressionStatus',
        defaultMessage: 'Suppression Status',
      }),
    },
    {
      value: 'cataloging_view.discoverysuppress',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.discoverySuppress',
        defaultMessage: 'Discovery Suppress',
      }),
    },
    {
      value: 'cataloging_view.staffsuppress',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.staffSuppress',
        defaultMessage: 'Staff Suppress',
      }),
    },
    {
      value: 'cataloging_view.instance_notes',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.notes',
        defaultMessage: 'Notes',
      }),
    },
    {
      value: 'cataloging_view.instance_admin_notes',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.administrativeNotes',
        defaultMessage: 'Administrative Notes',
      }),
    },
    {
      value: 'cataloging_view.publicationfrequency',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.publicationFrequency',
        defaultMessage: 'Publication Frequency',
      }),
    },
    {
      value: 'cataloging_view.source',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.source',
        defaultMessage: 'Source',
      }),
    },
    {
      value: 'cataloging_view.tags',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.tags',
        defaultMessage: 'Tags',
      }),
    },
    {
      value: 'cataloging_view.mode_of_issuance_name',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.modeOfIssuance',
        defaultMessage: 'Mode of Issuance',
      }),
    },
    {
      value: 'cataloging_view.instance_created_date',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.metadataCreatedDate',
        defaultMessage: 'Created Date',
      }),
    },
    {
      value: 'cataloging_view.instance_updated_date',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.metadataUpdatedDate',
        defaultMessage: 'Updated Date',
      }),
    },
    {
      value: 'cataloging_view.catalogeddate',
      label: intl.formatMessage({
        id: 'ui-reports.catalogingReports.instanceFields.catalogedDate',
        defaultMessage: 'Cataloged Date',
      }),
    },
  ];

  // Create cube members structure for instance fields including reference tables
  const instanceCubeMembers = [
    {
      name: 'cataloging_view',
      dimensions: [
        // Instance fields with translations
        {
          name: 'cataloging_view.title',
          type: 'string',
          label: fieldLabels['cataloging_view.title'],
        },
        {
          name: 'cataloging_view.instance_hrid',
          type: 'string',
          label: fieldLabels['cataloging_view.instance_hrid'],
        },
        {
          name: 'cataloging_view.subjects',
          type: 'string',
          label: fieldLabels['cataloging_view.subjects'],
        },
        {
          name: 'cataloging_view.languages',
          type: 'string',
          label: fieldLabels['cataloging_view.languages'],
        },
        {
          name: 'cataloging_view.series_list',
          type: 'string',
          label: fieldLabels['cataloging_view.series_list'] || 'Series',
        },
        {
          name: 'cataloging_view.editions_list',
          type: 'string',
          label: fieldLabels['cataloging_view.editions_list'] || 'Editions',
        },
        {
          name: 'cataloging_view.publication_info',
          type: 'string',
          label:
            fieldLabels['cataloging_view.publication_info'] ||
            'Publication Info',
        },
        {
          name: 'cataloging_view.publicationrange',
          type: 'string',
          label:
            fieldLabels['cataloging_view.publicationrange'] ||
            'Publication Range',
        },
        {
          name: 'cataloging_view.publicationfrequency',
          type: 'string',
          label:
            fieldLabels['cataloging_view.publicationfrequency'] ||
            'Publication Frequency',
        },
        {
          name: 'cataloging_view.physicaldescriptions',
          type: 'string',
          label:
            fieldLabels['cataloging_view.physicaldescriptions'] ||
            'Physical Descriptions',
        },
        {
          name: 'cataloging_view.electronic_access_urls',
          type: 'string',
          label:
            fieldLabels['cataloging_view.electronic_access_urls'] ||
            'Electronic Access URLs',
        },
        {
          name: 'cataloging_view.instance_admin_notes',
          type: 'string',
          label:
            fieldLabels['cataloging_view.instance_admin_notes'] ||
            'Administrative Notes',
        },
        {
          name: 'cataloging_view.indextitle',
          type: 'string',
          label: fieldLabels['cataloging_view.indextitle'] || 'Index Title',
        },
        {
          name: 'cataloging_view.source',
          type: 'string',
          label: fieldLabels['cataloging_view.source'] || 'Source',
        },
        {
          name: 'cataloging_view.tags',
          type: 'string',
          label: fieldLabels['cataloging_view.tags'] || 'Tags',
        },
        {
          name: 'cataloging_view.suppression_status',
          type: 'string',
          label:
            fieldLabels['cataloging_view.suppression_status'] ||
            'Suppression Status',
        },
        {
          name: 'cataloging_view.discoverysuppress',
          type: 'boolean',
          label:
            fieldLabels['cataloging_view.discoverysuppress'] ||
            'Discovery Suppress',
        },
        {
          name: 'cataloging_view.staffsuppress',
          type: 'boolean',
          label:
            fieldLabels['cataloging_view.staffsuppress'] || 'Staff Suppress',
        },
        {
          name: 'cataloging_view.catalogeddate',
          type: 'time',
          label: fieldLabels['cataloging_view.catalogeddate'],
        },
        {
          name: 'cataloging_view.instance_created_date',
          type: 'time',
          label: fieldLabels['cataloging_view.instance_created_date'],
        },
        {
          name: 'cataloging_view.instance_updated_date',
          type: 'time',
          label: fieldLabels['cataloging_view.instance_updated_date'],
        },
        // Complex fields for filtering only
        // Contributors
        {
          name: 'cataloging_view.name',
          type: 'string',
          label: fieldLabels['cataloging_view.name'] || 'اسم المساهم',
        },
        {
          name: 'cataloging_view.contributorTypeText',
          type: 'string',
          label:
            fieldLabels['cataloging_view.contributorTypeText'] ||
            'نص نوع المساهم',
        },
        {
          name: 'cataloging_view.primary',
          type: 'boolean',
          label: fieldLabels['cataloging_view.primary'] || 'مساهم أساسي',
        },
        // Identifiers
        {
          name: 'cataloging_view.value',
          type: 'string',
          label: fieldLabels['cataloging_view.value'] || 'قيمة المعرف',
        },
        // Classifications
        {
          name: 'cataloging_view.classificationNumber',
          type: 'string',
          label:
            fieldLabels['cataloging_view.classificationNumber'] ||
            'رقم التصنيف',
        },
        // Notes
        {
          name: 'cataloging_view.note',
          type: 'string',
          label: fieldLabels['cataloging_view.note'] || 'نص الملاحظة',
        },
        {
          name: 'cataloging_view.staffOnly',
          type: 'boolean',
          label: fieldLabels['cataloging_view.staffOnly'] || 'للموظفين فقط',
        },
        // Alternative titles
        {
          name: 'cataloging_view.alternativeTitle',
          type: 'string',
          label:
            fieldLabels['cataloging_view.alternativeTitle'] || 'العنوان البديل',
        },
      ],
    },
    {
      name: 'instance_type',
      dimensions: [
        { name: 'instance_type.id', type: 'string', label: fieldLabels['instance_type.id'] || 'Instance Type ID' },
        { name: 'instance_type.name', type: 'string', label: fieldLabels['instance_type.name'] || 'Instance Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'instance_status',
      dimensions: [
        { name: 'instance_status.id', type: 'string', label: fieldLabels['instance_status.id'] || 'Instance Status ID' },
        { name: 'instance_status.name', type: 'string', label: fieldLabels['instance_status.name'] || 'Instance Status' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'mode_of_issuance',
      dimensions: [
        { name: 'mode_of_issuance.id', type: 'string', label: fieldLabels['mode_of_issuance.id'] || 'Mode of Issuance ID' },
        { name: 'mode_of_issuance.name', type: 'string', label: fieldLabels['mode_of_issuance.name'] || 'Mode of Issuance' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'contributor_type',
      dimensions: [
        { name: 'contributor_type.id', type: 'string', label: fieldLabels['contributor_type.id'] || 'Contributor Type ID' },
        { name: 'contributor_type.name', type: 'string', label: fieldLabels['contributor_type.name'] || 'Contributor Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'contributor_name_type',
      dimensions: [
        { name: 'contributor_name_type.id', type: 'string', label: fieldLabels['contributor_name_type.id'] || 'Contributor Name Type ID' },
        { name: 'contributor_name_type.name', type: 'string', label: fieldLabels['contributor_name_type.name'] || 'Contributor Name Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'identifier_type',
      dimensions: [
        { name: 'identifier_type.id', type: 'string', label: fieldLabels['identifier_type.id'] || 'Identifier Type ID' },
        { name: 'identifier_type.name', type: 'string', label: fieldLabels['identifier_type.name'] || 'Identifier Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'classification_type',
      dimensions: [
        { name: 'classification_type.id', type: 'string', label: fieldLabels['classification_type.id'] || 'Classification Type ID' },
        { name: 'classification_type.name', type: 'string', label: fieldLabels['classification_type.name'] || 'Classification Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'instance_note_type',
      dimensions: [
        { name: 'instance_note_type.id', type: 'string', label: fieldLabels['instance_note_type.id'] || 'Note Type ID' },
        { name: 'instance_note_type.name', type: 'string', label: fieldLabels['instance_note_type.name'] || 'Note Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'alternative_title_type',
      dimensions: [
        { name: 'alternative_title_type.id', type: 'string', label: fieldLabels['alternative_title_type.id'] || 'Alternative Title Type ID' },
        { name: 'alternative_title_type.name', type: 'string', label: fieldLabels['alternative_title_type.name'] || 'Alternative Title Type' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'instance_format',
      dimensions: [
        { name: 'instance_format.id', type: 'string', label: fieldLabels['instance_format.id'] || 'Instance Format ID' },
        { name: 'instance_format.name', type: 'string', label: fieldLabels['instance_format.name'] || 'Instance Format' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'nature_of_content_term',
      dimensions: [
        { name: 'nature_of_content_term.id', type: 'string', label: fieldLabels['nature_of_content_term.id'] || 'Nature of Content ID' },
        { name: 'nature_of_content_term.name', type: 'string', label: fieldLabels['nature_of_content_term.name'] || 'Nature of Content' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'statistical_code',
      dimensions: [
        { name: 'statistical_code.id', type: 'string', label: fieldLabels['statistical_code.id'] || 'Statistical Code ID' },
        { name: 'statistical_code.name', type: 'string', label: fieldLabels['statistical_code.name'] || 'Statistical Code' },
      ],
      meta: { isReferenceTable: true }
    },
    {
      name: 'statistical_code_type',
      dimensions: [
        { name: 'statistical_code_type.id', type: 'string', label: fieldLabels['statistical_code_type.id'] || 'Statistical Code Type ID' },
        { name: 'statistical_code_type.name', type: 'string', label: fieldLabels['statistical_code_type.name'] || 'Statistical Code Type' },
      ],
      meta: { isReferenceTable: true }
    },
  ];

  const renderFiltersList = (field, index) => {
    const selectedMember = formValues?.instanceFilters?.[index]?.member;
    const selectedOperator = formValues?.instanceFilters?.[index]?.operator;

    // Check if this is a date range operator that needs full width
    const isDateRangeOperator = ['inDateRange', 'notInDateRange'].includes(
      selectedOperator,
    );

    return (
      <>
        <Row>
          <Col xs={4}>
            <FieldFilter
              field={field}
              index={index}
              currentCubeMembers={instanceCubeMembers}
              disabled={false}
              fieldType="dimensions"
            />
          </Col>
          <Col xs={4}>
            <OperatorField
              field={field}
              index={index}
              disabled={false}
              currentCubeMembers={instanceCubeMembers}
              fieldType="dimensions"
              selectedMember={selectedMember}
            />
          </Col>
          {!isDateRangeOperator && (
            <Col xs={4}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={instanceCubeMembers}
                disabled={false}
                fieldType="dimensions"
                selectedMember={selectedMember}
                selectedOperator={selectedOperator}
                formValues={formValues}
              />
            </Col>
          )}
        </Row>
        {isDateRangeOperator && (
          <Row>
            <Col xs={12}>
              <ValueField
                field={field}
                index={index}
                currentCubeMembers={instanceCubeMembers}
                disabled={false}
                fieldType="dimensions"
                selectedMember={selectedMember}
                selectedOperator={selectedOperator}
                formValues={formValues}
              />
            </Col>
          </Row>
        )}
      </>
    );
  };

  return (
    <Accordion
      label={
        <h2>
          <FormattedMessage
            id="ui-reports.catalogingReports.instanceFields.title"
            defaultMessage="Bibliographic Data (Instances)"
          />
        </h2>
      }
      id="cataloging-instance-fields"
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.catalogingReports.instanceFields.description"
          defaultMessage="Select fields and filters for bibliographic data:"
        />
      </div>

      <Field
        name="instanceFields"
        component={MultiSelection}
        label={
          <FormattedMessage
            id="ui-reports.catalogingReports.instanceFields.label"
            defaultMessage="Instance Fields"
          />
        }
        placeholder={intl.formatMessage({
          id: 'ui-reports.catalogingReports.instanceFields.placeholder',
          defaultMessage: 'Choose instance fields...',
        })}
        dataOptions={instanceFieldsOptions}
      />

      <Label>
        <FormattedMessage
          id="ui-reports.catalogingReports.filtersSection.title"
          defaultMessage="Filters"
        />
      </Label>

      <FieldArray
        addLabel={intl.formatMessage({
          id: 'ui-reports.catalogingReports.addInstanceFilter',
          defaultMessage: 'Add instance filter',
        })}
        component={RepeatableField}
        name="instanceFilters"
        onAdd={(fields) => fields.push('')}
        renderField={renderFiltersList}
      />
    </Accordion>
  );
};

CatalogingInstanceFieldsSelector.propTypes = {
  formValues: PropTypes.object,
};

export default CatalogingInstanceFieldsSelector;
