/* eslint-disable implicit-arrow-linebreak */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import { CalloutContext, useOkapiKy } from '@folio/stripes/core';
import { Layer } from '@folio/stripes/components';
import { Icon, Loading, Pane } from '@folio/stripes-components';
import css from './styles.css';
import useReport from '../../../../hooks/useReport';

function ReportEdit(props) {
  const history = useHistory();
  const okapiKy = useOkapiKy();
  const context = useContext(CalloutContext);

  const { reportId } = useParams();
  const { reports, isLoading } = useReport(reportId);

  console.log({ reports });
  //   const initialValues = useMemo(
  //     () => ({
  //       templateInfo: {
  //         name: templates?.name,
  //         description: templates?.description,
  //         code: templates?.code,
  //         isDefault: templates?.isDefault,
  //         isLocked: templates?.isLocked,
  //         active: templates?.active,
  //       },
  //       templateFields: templates?.templateFields,
  //     }),
  //     [templateId, isLoading],
  //   );

  //   const onSubmit = (values) => {
  //     okapiKy
  //       .put(`inventory-templates/${templateId}`, {
  //         timeout: 30000,
  //         method: 'PUT',
  //         headers: {
  //           'content-Type': 'application/json',
  //           accept: 'text/plain',
  //         },
  //         json: {
  //           ...values.templateInfo,
  //           templateFields: values.templateFields,
  //         },
  //       })
  //       .json()
  //       .then(() => {
  //         const message = (
  //           <FormattedMessage
  //             id="ui-plugin-inventory-templates.editTemplate.callout.updated"
  //             defaultMessage="Template updated successfully"
  //           />
  //         );
  //         history.push(`${props.basePath}/${templateId}/view`);
  //         context.sendCallout({ message });
  //       })
  //       .catch(async (err) => {
  //         const res = err.response;
  //         const text = await res.text();
  //         console.log('error: ', text);
  //         context.sendCallout({ message: text, type: 'error' });
  //       });
  //   };

  return (
    <Layer contentLabel="View inventory template" isOpen>
      {isLoading && (
        <div className={css.loading}>
          <Loading size="xlarge" />
        </div>
      )}
      {!isLoading && (
        <Pane
          id="report-edit-pane"
          defaultWidth="fill"
          paneTitle={
            <Icon icon="edit">
              <FormattedMessage
                id="ui-reports.viewTemplate.pane.paneTitle"
                values={{ reportName: reports.name }}
                defaultMessage="Edit {reportName} report"
              />
            </Icon>
          }
          dismissible
          onClose={() =>
            history.push({ pathname: `/reports/reports-list/${reportId}/view` })
          }
        >
          <div />
        </Pane>
      )}
    </Layer>
  );
}

ReportEdit.propTypes = {};

export default ReportEdit;
