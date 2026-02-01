import React, { lazy, Suspense } from 'react';
import { Loading, Layout } from '@folio/stripes/components';

// Lazy load display components for better performance
const GenericTableView = lazy(() => import('../views/table/GenericTableView'));
const GenericBarChart = lazy(() => import('../views/charts/GenericBarChart'));
const GenericPieChart = lazy(() => import('../views/charts/GenericPieChart'));
const GenericLineChart = lazy(() => import('../views/charts/GenericLineChart'));
const GenericAreaChart = lazy(() => import('../views/charts/GenericAreaChart'));
const GenericNumericalView = lazy(() => import('../views/numerical/GenericNumericalView'));

// Display method registry with lazy loading
const displayMethods = {
  table: GenericTableView,
  barChart: GenericBarChart,
  pieChart: GenericPieChart,
  lineChart: GenericLineChart,
  areaChart: GenericAreaChart,
  numLabel: GenericNumericalView,
};

// Loading fallback component
const LoadingFallback = () => (
  <Layout className="centered full" style={{ maxWidth: '15rem', height: '8rem' }}>
    &nbsp;
    <Loading size="xlarge" />
  </Layout>
);

// Registry functions
export const getDisplayComponent = (displayMethod) => {
  return displayMethods[displayMethod] || null;
};

export const renderDisplayComponent = (displayMethod, props) => {
  const Component = getDisplayComponent(displayMethod);
  
  if (!Component) {
    console.warn(`Display method "${displayMethod}" not found in registry`);
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
};

export const getAvailableDisplayMethods = () => {
  return Object.keys(displayMethods);
};

export const registerDisplayMethod = (name, component) => {
  displayMethods[name] = component;
};

export default {
  getDisplayComponent,
  renderDisplayComponent,
  getAvailableDisplayMethods,
  registerDisplayMethod,
};