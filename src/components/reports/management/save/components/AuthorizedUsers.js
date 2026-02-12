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
  NoValue,
  Row,
  Col,
  Select
} from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { Pluggable } from '@folio/stripes/core';

function AuthorizedUsers() {
  const [filterToggle, setFilterToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const intl = useIntl();

  const roleOptions = [
    { value: 'Owner', label: intl.formatMessage({ id: 'ui-reports.authorizedUsers.role.owner', defaultMessage: 'Owner' }) },
    { value: 'Admin', label: intl.formatMessage({ id: 'ui-reports.authorizedUsers.role.admin', defaultMessage: 'Admin' }) },
    { value: 'Editor', label: intl.formatMessage({ id: 'ui-reports.authorizedUsers.role.editor', defaultMessage: 'Editor' }) },
    { value: 'Viewer', label: intl.formatMessage({ id: 'ui-reports.authorizedUsers.role.viewer', defaultMessage: 'Viewer' }) }
  ];

  const selectUser = (user) => {
    const userExists = users.find(u => u.id === user.id);
    if (!userExists) {
      const newUsers = [...users, { ...user, role: 'Viewer', permissions: '' }];
      setUsers(newUsers);
    }
  };

  const removeUser = (userId) => {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
  };

  const updateUserRole = (userId, role) => {
    const newUsers = users.map(user => 
      user.id === userId ? { ...user, role } : user
    );
    setUsers(newUsers);
  };

  const renderUser = (user, index) => (
    <Card key={index} style={{ marginBottom: '8px', padding: '12px' }}>
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-reports.authorizedUsers.userName" defaultMessage="User" />}
            value={
              user.personal?.firstName && user.personal?.lastName 
                ? `${user.personal.firstName} ${user.personal.lastName}` 
                : user.username || 'Unknown User'
            }
          />
        </Col>
        <Col xs={5}>
          <Select
            label={<FormattedMessage id="ui-reports.authorizedUsers.role" defaultMessage="Role" />}
            value={user.role || 'Viewer'}
            dataOptions={roleOptions}
            onChange={(e) => updateUserRole(user.id, e.target.value)}
          />
        </Col>
        <Col xs={1} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Button buttonStyle="none" onClick={() => removeUser(user.id)}>
            <Icon icon="trash" />
          </Button>
        </Col>
      </Row>
    </Card>
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