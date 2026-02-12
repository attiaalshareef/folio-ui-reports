# Report Types Classification - Professional System

## Overview
This document describes the new professional report types classification system designed for FOLIO reporting module.

---

## Report Types

### 1. Statistical Analysis Report (`statistical`)
**Purpose**: Comprehensive statistical analysis with aggregated data and visual analytics

**Best For**:
- Collection statistics and metrics
- Circulation analysis
- Acquisition summaries
- Comparative statistical analysis

**Display Methods**:
- ✅ Table (default) - For detailed statistical data
- ✅ Bar Chart - For category comparisons
- ✅ Pie Chart - For distribution visualization
- ✅ Line Chart - For trend visualization
- ✅ Area Chart - For cumulative trends

**Use Cases**:
- Monthly circulation statistics by material type
- Collection growth analysis by subject
- Patron registration trends
- Acquisition spending by vendor

---

### 2. Detailed Data Report (`detailed`)
**Purpose**: Comprehensive tabular listings with full record details

**Best For**:
- Complete item inventories
- Patron record listings
- Transaction logs
- Holdings details

**Display Methods**:
- ✅ Table (only) - Optimized for detailed data display

**Use Cases**:
- Complete item inventory with all fields
- Patron list with contact information
- Overdue items with borrower details
- Holdings list by location

---

### 3. Executive Summary Report (`summary`)
**Purpose**: High-level KPIs and summary metrics for quick insights

**Best For**:
- Dashboard indicators
- Management summaries
- Quick metrics overview
- At-a-glance statistics

**Display Methods**:
- ✅ Numeric Label (default) - For single/multiple KPIs
- ✅ Pie Chart - For simple distributions
- ✅ Table - For multiple summary metrics

**Use Cases**:
- Total collection count
- Active patron count
- Current circulation total
- Budget utilization percentage

---

### 4. Trend Analysis Report (`trend`)
**Purpose**: Time-based analysis showing patterns and changes over time

**Best For**:
- Historical analysis
- Growth tracking
- Seasonal patterns
- Forecasting data

**Display Methods**:
- ✅ Line Chart (default) - For continuous trends
- ✅ Area Chart - For cumulative trends
- ✅ Table - For detailed time-series data

**Use Cases**:
- Monthly circulation trends over 12 months
- Collection growth year-over-year
- Seasonal usage patterns
- Acquisition trends by quarter

---

### 5. Comparative Analysis Report (`comparative`)
**Purpose**: Side-by-side comparisons across categories or periods

**Best For**:
- Branch comparisons
- Collection comparisons
- Period-over-period analysis
- Category performance

**Display Methods**:
- ✅ Bar Chart (default) - For clear comparisons
- ✅ Table - For detailed comparison data
- ✅ Line Chart - For trend comparisons

**Use Cases**:
- Branch circulation comparison
- Collection size by location
- This year vs last year analysis
- Department budget comparison

---

### 6. Distribution Analysis Report (`distribution`)
**Purpose**: Data composition and proportion analysis

**Best For**:
- Collection composition
- Patron demographics
- Material type distribution
- Subject breakdown

**Display Methods**:
- ✅ Pie Chart (default) - For proportion visualization
- ✅ Bar Chart - For category distribution
- ✅ Table - For detailed distribution data

**Use Cases**:
- Material type distribution (books, DVDs, etc.)
- Patron type breakdown
- Collection by language
- Subject classification distribution

---

### 7. Performance Metrics Report (`performance`)
**Purpose**: Operational efficiency and productivity tracking

**Best For**:
- Staff productivity
- Processing efficiency
- Service quality metrics
- Operational KPIs

**Display Methods**:
- ✅ Table (default) - For detailed metrics
- ✅ Bar Chart - For performance comparison
- ✅ Line Chart - For performance trends
- ✅ Numeric Label - For key metrics

**Use Cases**:
- Cataloging productivity by staff
- Average processing time
- Service desk transaction volume
- Staff performance metrics

---

## Migration Guide

### Legacy Type Mapping

| Old Type | New Type | Rationale |
|----------|----------|-----------|
| `numMetric` | `summary` | Numeric metrics → Executive summaries |
| `dimMetric` | `statistical` | Dimensional metrics → Statistical analysis |
| `periodMetric` | `trend` | Periodic metrics → Trend analysis |
| `list` | `detailed` | Lists → Detailed data reports |
| `productivity` | `performance` | Productivity → Performance metrics |
| `cataloging` | `statistical` | Cataloging reports → Statistical analysis |
| `circulation` | `statistical` | Circulation reports → Statistical analysis |

---

## Implementation Notes

1. **Backward Compatibility**: Legacy types are automatically mapped to new types
2. **Display Methods**: Each type has carefully selected display methods
3. **Default Method**: Each type has an optimal default display method
4. **Extensibility**: Easy to add new types in the future

---

## Translation Keys

All report types use the following translation key pattern:
- `ui-reports.reportTypes.{value}.name` - Report type name
- `ui-reports.reportTypes.{value}.desc` - Report type description
- `ui-reports.reportTypes.{value}.useCases` - Use case examples
