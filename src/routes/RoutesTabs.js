import React, { useState, useEffect } from 'react';
import { NavListItem, Tooltip, Icon } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { MdDashboard, MdMenu, MdMenuOpen } from 'react-icons/md';
import useCurrentTab from '../hooks/useCurrentTab';
import css from './style.css';

const tabs = [
  {
    tabName: 'dashboard',
    tabLink: '/reports/dashboards',
    icon: 'dashboard',
    customIcon: MdDashboard,
    labelId: 'ui-reports.tabs.dashboard',
    defaultLabel: 'Dashboard',
  },
  {
    tabName: 'reportBuilder',
    tabLink: '/reports/report-builder',
    icon: 'lightning',
    labelId: 'ui-reports.tabs.reportBuilder',
    defaultLabel: 'Report Builder',
  },
  {
    tabName: 'reportsList',
    tabLink: '/reports/reports-list',
    icon: 'document',
    labelId: 'ui-reports.tabs.reports',
    defaultLabel: 'Reports',
  },
  {
    tabName: 'prefferedReports',
    tabLink: '/reports/preffered-reports',
    icon: 'bookmark',
    labelId: 'ui-reports.tabs.preffered',
    defaultLabel: 'Preffered',
  },
  {
    tabName: 'scheduledReports',
    tabLink: '/reports/scheduled-reports',
    icon: 'clock',
    labelId: 'ui-reports.tabs.scheduled',
    defaultLabel: 'Scheduled',
  },
];

function RoutesTabs() {
  const currentTab = useCurrentTab();
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('ui-reports-sidebar-expanded');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      'ui-reports-sidebar-expanded',
      JSON.stringify(isExpanded),
    );
  }, [isExpanded]);

  return (
    <div
      className={`${css.sideMenu} ${isExpanded ? css.expanded : css.collapsed}`}
      style={{ width: isExpanded ? '200px' : '80px' }}
    >
      <div className={css.expandToggleContainer}>
        <NavListItem
          type="button"
          buttonStyle="slim"
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseDown={(e) => e.preventDefault()}
          className={css.expandToggle}
        >
          {isExpanded ? (
            <MdMenuOpen size={24} className={css.toggleIcon} />
          ) : (
            <MdMenu size={24} className={css.toggleIcon} />
          )}
        </NavListItem>
      </div>

      <div className={css.tabsContainer}>
        {tabs.map((tab) => {
          const tabButton = (
            <NavListItem
              id={`routes-tabs-${tab.tabName}-btn`}
              type="button"
              buttonStyle="slim"
              to={tab.tabLink}
              isActive={currentTab === tab.tabName}
              onMouseDown={(e) => e.preventDefault()}
              className={`${css.tabBtn} ${currentTab === tab.tabName ? css.active : ''}`}
            >
              <div
                className={`${css.tabContent} ${isExpanded ? css.expanded : ''}`}
              >
                {tab.customIcon ? (
                  <tab.customIcon className={css.tabIcon} size={20} />
                ) : (
                  <Icon
                    icon={tab.icon}
                    size="large"
                    iconClassName={css.tabIcon}
                  />
                )}
                {isExpanded && (
                  <span className={css.tabLabel}>
                    <FormattedMessage
                      id={tab.labelId}
                      defaultMessage={tab.defaultLabel}
                    />
                  </span>
                )}
              </div>
            </NavListItem>
          );

          return !isExpanded ? (
            <Tooltip
              key={tab.tabName}
              id={`routes-tabs-${tab.tabName}-tooltip`}
              text={
                <FormattedMessage
                  id={tab.labelId}
                  defaultMessage={tab.defaultLabel}
                />
              }
            >
              {({ ref, ariaIds }) => React.cloneElement(tabButton, {
                'aria-labelledby': ariaIds.text,
                ref,
              })}
            </Tooltip>
          ) : (
            <div key={tab.tabName}>{tabButton}</div>
          );
        })}
      </div>
    </div>
  );
}

export default RoutesTabs;
