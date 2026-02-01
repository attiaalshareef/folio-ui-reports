import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { branding } from 'stripes-config';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { useStripes } from '@folio/stripes-core';
import css from './styles.css';
// import DisplayMethodSwitcher from '../../queryResultsPreview/DisplayMethodSwitcher';

function PrintWindow({
  displayMethod,
  title = '',
  resultSet,
  onAfterPrint,
  reportType,
  children,
  componentRef,
}) {
  const {
    user: {
      user: { firstName, lastName },
    },
  } = useStripes();
  //   const componentRef = useRef(null);

  //   const popupStyles = `
  //     @page {
  //       size: A4 auto;
  //       margin: 30px;
  //     }

  //     @media print {
  //       html, body {
  //         height: auto !important;
  //         overflow: initial !important;
  //         color-adjust: exact;
  //         -webkit-print-color-adjust: exact;
  //       }
  //     }
  //   `;

  //   const handlePrint = useReactToPrint({
  //     contentRef: componentRef,
  //     pageStyle: popupStyles,
  //     onAfterPrint,
  //   });

  //   useEffect(() => {
  //     handlePrint();
  //   }, [handlePrint, children]);

  //   console.log('children: ', children);

  return (
    <div className={css.hidden}>
      <div ref={componentRef}>
        <div className={css.header_container}>
          <div className={css.branding_container}>
            <div className={css.logo}>
              <img alt={branding.logo.alt} src={branding.logo.src} />
            </div>
            <div className={css.org}>
              <img alt={branding.org.alt} src={branding.org.src} />
            </div>
          </div>
          <h3 className={css.paneTitle}>
            <span>{title}</span>
          </h3>
          <hr className={css.divider} />
        </div>
        {/* <div>Test Printing Tools</div> */}
        <div dir="rtl" className={css.report_content} ref={componentRef}>
          {children}
        </div>
        <div className={css.footer_container}>
          <hr className={css.divider} />
          <div className={css.footer}>
            <div>
              <FormattedMessage
                id="ui-reports.printWindo.createdBy"
                values={{ createdBy: `${firstName} ${lastName}` }}
                defaultMessage="Created by: {createdBy}"
              />
            </div>
            <div>
              <FormattedMessage
                id="ui-reports.printWindo.createdDate"
                values={{ createdDate: moment().toString() }}
                defaultMessage="Created date: {createdDate}"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PrintWindow.propTypes = {
  displayMethod: PropTypes.string,
  resultSet: PropTypes.object.isRequired,
  onAfterPrint: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  reportType: PropTypes.string,
  children: PropTypes.node,
  componentRef: PropTypes.object,
};

export default PrintWindow;
