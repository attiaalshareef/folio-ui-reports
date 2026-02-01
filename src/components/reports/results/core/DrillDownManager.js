// DrillDown configurations for different report types
const drillDownConfigs = {
  productivity: {
    measures: [
      'instances_created',
      'instances_updated',
      'holdings_created',
      'holdings_updated',
      'items_created',
      'items_updated',
      'instances_suppressed',
      'instances_discovery_suppressed',
      'instances_staff_suppressed',
    ],

    // Get user ID from row data
    getUserId: (rowData) => {
      return rowData.cataloging_productivity_view_instance_created_by;
    },

    // Get staff name from row data
    getStaffName: (rowData) => {
      const firstName = rowData.cataloging_productivity_view_first_name || '';
      const lastName = rowData.cataloging_productivity_view_last_name || '';
      return `${firstName} ${lastName}`.trim();
    },

    // Build drill-down query based on measure
    queryBuilder: (measureName, rowData) => {
      const staffUserId = drillDownConfigs.productivity.getUserId(rowData);

      if (!staffUserId) {
        console.error('No user ID found for drill-down:', rowData);
        return null;
      }

      const baseFilters = [
        {
          member: 'instance.created_by',
          operator: 'equals',
          values: [staffUserId],
        },
      ];

      switch (measureName) {
        case 'instances_created':
          return {
            dimensions: [
              'instance.title',
              'instance.hrid',
              'instance.creation_date',
            ],
            filters: baseFilters,
            order: { 'instance.creation_date': 'desc' },
            limit: 50,
          };

        case 'instances_updated':
          return {
            dimensions: [
              'instance.title',
              'instance.hrid',
              'instance.metadata_updateddate',
            ],
            filters: [
              { member: 'instance.metadata_updateddate', operator: 'set' },
            ],
            order: { 'instance.metadata_updateddate': 'desc' },
            limit: 50,
          };

        case 'holdings_created':
          return {
            dimensions: [
              'holdings_record.hrid',
              'holdings_record.callnumber',
              'holdings_record.creation_date',
            ],
            filters: [
              {
                member: 'holdings_record.created_by',
                operator: 'equals',
                values: [staffUserId],
              },
            ],
            order: { 'holdings_record.creation_date': 'desc' },
            limit: 50,
          };

        case 'items_created':
          return {
            dimensions: ['item.hrid', 'item.barcode', 'item.creation_date'],
            filters: [
              {
                member: 'item.created_by',
                operator: 'equals',
                values: [staffUserId],
              },
            ],
            order: { 'item.creation_date': 'desc' },
            limit: 50,
          };

        case 'instances_discovery_suppressed':
          return {
            dimensions: [
              'instance.title',
              'instance.hrid',
              'instance.creation_date',
              'instance.discoverysuppress',
            ],
            filters: [
              ...baseFilters,
              {
                member: 'instance.discoverysuppress',
                operator: 'equals',
                values: [true],
              },
            ],
            order: { 'instance.creation_date': 'desc' },
            limit: 50,
          };

        case 'instances_staff_suppressed':
          return {
            dimensions: [
              'instance.title',
              'instance.hrid',
              'instance.creation_date',
              'instance.staffsuppress',
            ],
            filters: [
              ...baseFilters,
              {
                member: 'instance.staffsuppress',
                operator: 'equals',
                values: [true],
              },
            ],
            order: { 'instance.creation_date': 'desc' },
            limit: 50,
          };

        case 'instances_suppressed':
          return {
            dimensions: [
              'instance.title',
              'instance.hrid',
              'instance.creation_date',
              'instance.suppression_status',
            ],
            filters: [
              ...baseFilters,
              {
                member: 'instance.suppressed_count',
                operator: 'gt',
                values: [0],
              },
            ],
            order: { 'instance.creation_date': 'desc' },
            limit: 50,
          };

        default:
          return {
            dimensions: ['instance.title', 'instance.hrid'],
            measures: ['instance.count'],
            limit: 10,
          };
      }
    },
  },

  cataloging: {
    measures: [],
    getUserId: () => null,
    getStaffName: () => '',
    queryBuilder: () => null,
  },

  // Add more report types as needed
};

// Main DrillDown Manager
const DrillDownManager = {
  // Check if measure supports drill-down for given report type
  supportsDrillDown: (reportType, measureName) => {
    const config = drillDownConfigs[reportType];
    return config && config.measures.includes(measureName);
  },

  // Get available drill-down measures for report type
  getDrillDownMeasures: (reportType) => {
    const config = drillDownConfigs[reportType];
    return config ? config.measures : [];
  },

  // Handle drill-down action
  handleDrillDown: (reportType, measureName, rowData, measureValue) => {
    const config = drillDownConfigs[reportType];

    if (!config) {
      console.warn(`No drill-down config found for report type: ${reportType}`);
      return null;
    }

    if (!config.measures.includes(measureName)) {
      console.warn(
        `Measure ${measureName} not supported for drill-down in ${reportType}`,
      );
      return null;
    }

    try {
      const query = config.queryBuilder(measureName, rowData);
      const staffName = config.getStaffName(rowData);

      if (!query) {
        console.error('Failed to build drill-down query');
        return null;
      }

      return {
        query,
        measureName,
        staffName,
        measureValue,
        reportType,
      };
    } catch (error) {
      console.error('Error in drill-down handler:', error);
      return null;
    }
  },

  // Register new report type configuration
  registerReportType: (reportType, config) => {
    drillDownConfigs[reportType] = config;
  },
};

export default DrillDownManager;
