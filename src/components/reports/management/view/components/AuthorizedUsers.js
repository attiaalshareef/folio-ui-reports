import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  MultiColumnList,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function AuthorizedUsers(props) {
  const [filterToggle, setFilterToggle] = useState(true);

  return (
    <>
      <Accordion
        id="report-details-authorized-users-accordion"
        label={
          <FormattedMessage
            id="ui-reports.reportDetails.authorizedUsers.accordion.header"
            defaultMessage="Authorized users"
          />
        }
        onToggle={() => setFilterToggle(!filterToggle)}
        open={filterToggle}
        separator
        header={FilterAccordionHeader}
      >
        <MultiColumnList
          id="report-details-authorized-users-Multi-Column-List"
          interactive={false}
          visibleColumns={['name', 'role', 'perms']}
          contentData={[
            {
              name: 'Attia Alshareef',
              role: 'Owner',
              perms: 'All Perms',
            },
          ]}
          columnMapping={{
            name: (
              <FormattedMessage
                id="ui-reports.reportDetails.authorizedUsers.columns.name"
                defaultMessage="User"
              />
            ),
            role: (
              <FormattedMessage
                id="ui-reports.reportDetails.authorizedUsers.columns.role"
                defaultMessage="Role"
              />
            ),
            perms: (
              <FormattedMessage
                id="ui-reports.reportDetails.authorizedUsers.columns.perms"
                defaultMessage="Perms"
              />
            ),
          }}
          columnWidths={{
            name: '50%',
            role: '25%',
            perms: '25%',
          }}
          // formatter={{}}
          // autosize
          // hasMargin
        />
      </Accordion>
    </>
  );
}

AuthorizedUsers.propTypes = {};

export default AuthorizedUsers;
