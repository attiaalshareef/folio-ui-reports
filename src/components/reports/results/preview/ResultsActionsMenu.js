import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
  MenuSection,
} from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';

const ResultsActionsMenu = ({ handlePrint, toPDF, handleExcelExport }) => {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const getDropdownContent = () => {
    return (
      <>
        <MenuSection>
          <Button
            marginBottom0
            id="results-actions-export-excel-btn"
            buttonStyle="dropdownItem"
            onClick={() => {
              handleExcelExport();
              toggleDropdown(); // Close menu immediately
            }}
            onMouseDown={(e) => e.preventDefault()}
            disabled={!handleExcelExport}
          >
            <Icon icon="download">
              <FormattedMessage
                id="ui-reports.resultsActions.exportExcel"
                defaultMessage="Export to Excel"
              />
            </Icon>
          </Button>
          <Button
            marginBottom0
            id="results-actions-export-pdf-btn"
            buttonStyle="dropdownItem"
            onClick={() => {
              toPDF();
              toggleDropdown(); // Close menu immediately
            }}
            onMouseDown={(e) => e.preventDefault()}
            disabled={!toPDF}
          >
            <Icon icon="source">
              <FormattedMessage
                id="ui-reports.resultsActions.exportPDF"
                defaultMessage="Export to PDF"
              />
            </Icon>
          </Button>
        </MenuSection>
        <hr />
        <MenuSection>
          <Button
            marginBottom0
            id="results-actions-print-btn"
            buttonStyle="dropdownItem"
            onClick={() => {
              handlePrint();
              toggleDropdown(); // Close menu immediately
            }}
            onMouseDown={(e) => e.preventDefault()}
            disabled={!handlePrint}
          >
            <Icon icon="print">
              <FormattedMessage
                id="ui-reports.resultsActions.print"
                defaultMessage="Print report"
              />
            </Icon>
          </Button>
        </MenuSection>
      </>
    );
  };

  const renderActionsMenuTrigger = ({ getTriggerProps, open }) => {
    return (
      <FormattedMessage id="ui-reports.resultsActions.menuLabel">
        {(label) => (
          <div style={{ paddingRight: '0.25em', paddingLeft: '0.25em' }}>
            <Button
              data-test-pane-header-actions-button
              buttonStyle="primary"
              marginBottom0
              ariaLabel={label}
              type="button"
              {...getTriggerProps()}
            >
              <Icon icon="ellipsis" size="large" />
            </Button>
          </div>
        )}
      </FormattedMessage>
    );
  };

  const renderActionsMenu = ({ open }) => (
    <DropdownMenu open={open}>{getDropdownContent()}</DropdownMenu>
  );

  return (
    <Dropdown
      id="ui-translation-actionsMenu-Dropdown"
      renderTrigger={renderActionsMenuTrigger}
      renderMenu={renderActionsMenu}
      open={dropdownOpen}
      onToggle={toggleDropdown}
      placement="bottom-end"
      relativePosition
      focusHandlers={{ open: () => null }}
    />
  );
};

ResultsActionsMenu.propTypes = {
  handlePrint: PropTypes.func,
  toPDF: PropTypes.func,
  handleExcelExport: PropTypes.func,
};

export default ResultsActionsMenu;
