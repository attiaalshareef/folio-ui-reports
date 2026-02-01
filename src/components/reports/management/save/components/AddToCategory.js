import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Accordion,
  FilterAccordionHeader,
  RepeatableField,
  Select,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function AddToCategory({ categories = [] }) {
  const [filterToggle, setFilterToggle] = useState(false);

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const renderCategoriesList = (field, index) => {
    return (
      <Field
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.addToCategory.field.categoryName"
            defaultMessage="Category name"
          />
        }
        name={`${field}`}
        dataOptions={categoryOptions}
        placeholder="Select category"
      />
    );
  };
  return (
    <>
      <Accordion
        id="save-new-report-add-to-categories-accordion"
        label={
          <FormattedMessage
            id="ui-reports.newReport.saveReportPane.addToCategory.accordion.header"
            defaultMessage="Categories"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <FieldArray
          addLabel="Add to category"
          component={RepeatableField}
          name="categories"
          onAdd={(fields) => fields.push('')}
          renderField={renderCategoriesList}
        />
      </Accordion>
    </>
  );
}

AddToCategory.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

export default AddToCategory;
