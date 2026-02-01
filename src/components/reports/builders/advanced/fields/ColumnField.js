import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Card,
  Col,
  FilterAccordionHeader,
  Icon,
  MultiSelection,
  Row,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

function ColumnField({ currentCubeMembers, disabled }) {
  const [filterToggle, setFilterToggle] = useState(true);

  const intl = useIntl();

  console.log('currentCubeMembers: ', currentCubeMembers);

  return (
    <Accordion
      id="query-builder-form-columns-accordion"
      label={
        <FormattedMessage
          id="ui-reports.queryBuilder.columnsField.Accordion.header"
          defaultMessage="Columns Options"
        />
      }
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <Row>
        {currentCubeMembers?.map((member) => {
          return (
            <Col xs={6} key={member.name}>
              <Field
                id={`query-builder-form-${member.name}-columns-multiselect`}
                name={`columns.${member.name}`}
                component={MultiSelection}
                label={
                  <FormattedMessage
                    id={`ui-reports.dataModels.availableTables.name.${member.name}`}
                    defaultMessage={`${member.title}`}
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'ui-reports.queryBuilder.columnField.placeholder',
                  defaultMessage: 'Choose column',
                })}
                dataOptions={member?.dimensions?.map((option) => ({
                  label: option.name?.split('.')[1],
                  value: option.name,
                }))}
                // required
                // validate={required}
                disabled={disabled}
              />
            </Col>
          );
        })}
      </Row>
    </Accordion>
    /* </Card> */
  );
}

ColumnField.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ColumnField;
