import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  FilterAccordionHeader,
  Button,
  List,
  Card,
  KeyValue,
  Icon,
  NoValue
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Pluggable } from '@folio/stripes/core';

function AuthorizedUsers() {
  const [filterToggle, setFilterToggle] = useState(false);
  const [users, setUsers] = useState([]);

  const selectUser = (user) => {
    const userExists = users.find(u => u.id === user.id);
    if (!userExists) {
      const newUsers = [...users, user];
      setUsers(newUsers);
    }
  };

  const removeUser = (userId) => {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  };

  const renderUser = (user, index) => (
    <div key={index} style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '8px 12px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '4px',
      marginBottom: '4px'
    }}>
      <span>
        {user.personal?.firstName && user.personal?.lastName 
          ? `${user.personal.firstName} ${user.personal.lastName}` 
          : user.username || 'Unknown User'
        }
      </span>
      <Button buttonStyle="none" onClick={() => removeUser(user.id)}>
        <Icon icon="times" />
      </Button>
    </div>
  );

  return (
    <Accordion
      id="save-new-report-authorized-users-accordion"
      label={
        <FormattedMessage
          id="ui-reports.newReport.saveReportPane.AuthorizedUsers.accordion.header"
          defaultMessage="Authorized users"
        />
      }
      onToggle={() => setFilterToggle(!filterToggle)}
      open={filterToggle}
      separator
      header={FilterAccordionHeader}
    >
      <Field name="authorizedUsers">
        {({ input }) => {
          input.onChange(users);
          return null;
        }}
      </Field>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <Pluggable
          type="find-user"
          selectUser={selectUser}
          visibleColumns={['name', 'username', 'barcode']}
          renderTrigger={(props) => (
            <Button {...props} buttonStyle="default" style={{ whiteSpace: 'nowrap' }}>
              + <FormattedMessage
                id="ui-reports.newReport.saveReportPane.AuthorizedUsers.addUser"
                defaultMessage="Add user"
              />
            </Button>
          )}
        />
      </div>
      
      {users.length > 0 ? (
        <List
          items={users}
          itemFormatter={renderUser}
        />
      ) : (
        <FormattedMessage
          id="ui-reports.newReport.saveReportPane.AuthorizedUsers.noUsers"
          defaultMessage="No authorized users"
        />
      )}
    </Accordion>
  );
}

AuthorizedUsers.propTypes = {};

export default AuthorizedUsers;