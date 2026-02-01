import { useState, useEffect } from 'react';
import { useCubeQuery } from '@cubejs-client/react';

const useStaffList = () => {
  const [staffList, setStaffList] = useState([]);

  const { resultSet, error, isLoading } = useCubeQuery({
    dimensions: [
      'users.username',
      'users.personal_firstname',
      'users.personal_lastname',
      'users.barcode',
      'users.departments',
      'users.type',
      'users.active',
    ],
    filters: [
      {
        member: 'users.type',
        operator: 'equals',
        values: ['staff'],
      },
    ],
    order: {
      'users.personal_firstname': 'asc',
    },
    limit: 1000,
  });

  useEffect(() => {
    if (resultSet) {
      try {
        const data = resultSet.tablePivot();

        // Transform staff data (already filtered by query)
        const staffOptions = data.map((row) => {
          const firstName = row['users.personal_firstname'] || '';
          const lastName = row['users.personal_lastname'] || '';
          const username = row['users.username'] || '';
          const barcode = row['users.barcode'] || '';
          const isActive = row['users.active'] === 'true';
          const departments = row['users.departments'] || '';

          // Build display name - use lastName if firstName is null
          let displayName = '';
          if (firstName && lastName) {
            displayName = `${firstName} ${lastName}`;
          } else if (lastName) {
            displayName = lastName;
          } else {
            displayName = username;
          }

          const statusIndicator = isActive ? '' : ' (غير نشط)';

          // Build label: DisplayName (Barcode) Status
          let label = displayName;
          if (barcode) {
            label += ` (${barcode})`;
          }
          label += statusIndicator;

          return {
            value: username,
            label,
            firstName,
            lastName,
            barcode,
            username,
            isActive,
            departments,
          };
        });

        setStaffList(staffOptions);
      } catch (err) {
        console.error('Error processing staff list:', err);
      }
    } else if (error) {
      console.error('Staff list query error:', error);
      setStaffList([]);
    }
  }, [resultSet, error]);

  return {
    staffList,
    loading: isLoading,
    error: error?.message || null,
  };
};

export default useStaffList;
