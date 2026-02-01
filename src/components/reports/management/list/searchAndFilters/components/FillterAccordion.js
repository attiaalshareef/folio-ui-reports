import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Checkbox,
  FilterAccordionHeader
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function FillterAccordion({ filter }) {
  const [filterToggle, setFilterToggle] = useState(filter.initialStatus);

  return (
    <>
      <Accordion
        id={`${filter.id}-accordion`}
        label={filter.label}
        onToggle={setFilterToggle}
        open={filterToggle}
        separator={filter.separator}
        header={FilterAccordionHeader}
      >
        {filter.values.map(value => {
          return (
            <Checkbox
              label={value.label}
              checked={false}
              value={value.value}
              onChange={event => {
                // consume event.target.value
              }}
            />
          );
        })}
      </Accordion>
    </>
  );
}

FillterAccordion.propTypes = {
  filter: PropTypes.object.isRequired
};

export default FillterAccordion;
