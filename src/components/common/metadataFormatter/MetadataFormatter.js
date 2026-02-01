import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { HandleUserName, stripesConnect } from '@folio/stripes-core';

function MetadataFormatter(props) {
  const renderUser = userId => {
    const { systemId, systemUser } = props;
    if (systemId && systemId === userId) {
      return systemUser;
    }

    const updaters = (props.resources.updaters || {}).records || [];
    console.log(props.metadata);
    return <HandleUserName user={updaters.find(r => r.id === userId)} />;
    // return updaters.find(r => r.id === userId)?.personal?.lastName;
  };
  return <div>{renderUser(props.metadata.createdByUserId)}</div>;
}

MetadataFormatter.propTypes = {
  metadata: PropTypes.object,
  mutator: PropTypes.shape({
    updaters: PropTypes.object
  }).isRequired,
  resources: PropTypes.shape({
    updaters: PropTypes.object
  }).isRequired,
  //   showUserLink: PropTypes.bool,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func.isRequired
  }).isRequired,
  systemId: PropTypes.string,
  systemUser: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      personal: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        middleName: PropTypes.string
      })
    }),
    PropTypes.node
  ])
};

MetadataFormatter.manifest = Object.freeze({
  updaters: {
    type: 'okapi',
    records: 'users',
    path: 'users',
    params: (_q, _p, _r, _l, props) => {
      const cId = get(props, 'metadata.createdByUserId');
      const uId = get(props, 'metadata.updatedByUserId');

      const userIds = [];
      if (cId && cId !== props.systemId) userIds.push(cId);
      if (uId && uId !== props.systemId) userIds.push(uId);
      const query = [...new Set(userIds.map(i => `id==${i}`))].join(' or ');

      return query ? { query } : null;
    },
    permissionsRequired: ['users.collection.get']
  }
});
export default stripesConnect(MetadataFormatter);
