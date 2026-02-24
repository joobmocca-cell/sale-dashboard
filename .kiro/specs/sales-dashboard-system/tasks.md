# Implementation Plan: Sales Dashboard System

## Overview

This implementation plan breaks down the Sales Dashboard System into 6 phases, following an incremental approach where each task builds on previous work. The system will be built using Next.js 14 with TypeScript, Prisma ORM, PostgreSQL, and deployed on Vercel.

## Tasks

- [-] 1. Phase 1: Foundation - Project Setup and Authentication
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and configure development environment
    - Create Next.js 14 project with App Router
    - Configure TypeScript with strict mode
    - Set up Tailwind CSS and shadcn/ui
    - Configure ESLint and Prettier
    - Create basic folder structure (app, components, lib, types)
    - _Requirements: Foundation for all features_

  - [ ] 1.2 Set up Prisma ORM with PostgreSQL database
    - Install Prisma and PostgreSQL client
    - Initialize Prisma schema
    - Configure database connection (Vercel Postgres)
    - Create initial User, Session, Branch, Sale models
    - Generate Prisma client
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ] 1.3 Implement database schema with all models and relationships
    - Define User model with role-based fields (employeeCode, branchCode, managedRegions, managedAreas, managedBranches)
    - Define Branch model with all required fields
    - Define Sale model with indexes on branchCode, employeeCode, docDate
    - Define aggregate models (DailySalesAggregate, MonthlySalesAggregate, YearlySalesAggregate)
    - Define CustomKPI and ColumnMapping models
    - Define ImportJob model for background job tracking
    - Create database migrations
    - _Requirements: 2.1, 4.1, 5.1, 6.1, 7.1_

  - [ ]* 1.4 Write property test for password encryption
    - **Property 3: Password encryption uses bcrypt with sufficient rounds**
    - **Validates: Requirements 1.4**

  - [ ] 1.5 Implement NextAuth.js authentication system
    - Install and configure NextAuth.js
    - Create credentials provider with email/password
    - Implement password hashing with bcrypt (minimum 10 rounds)
    - Create login API route (/api/auth/[...nextauth])
    - Implement session management with 24-hour expiry
    - Create HTTP-only session cookies
    - _Requirements: 1.1, 1.2, 1.4, 29.1, 29.5_


  - [ ]* 1.6 Write property tests for authentication
    - **Property 1: Authentication with valid credentials grants access**
    - **Validates: Requirements 1.1**
    - **Property 2: Authentication with invalid credentials returns error**
    - **Validates: Requirements 1.2**

  - [ ] 1.7 Create login page with form validation
    - Build login page UI at /app/(auth)/login/page.tsx
    - Create form with email and password fields
    - Implement client-side validation
    - Add error message display
    - Implement redirect to dashboard on success
    - _Requirements: 1.1, 1.2_

  - [ ]* 1.8 Write unit tests for login page
    - Test form validation
    - Test error message display
    - Test successful login redirect
    - _Requirements: 1.1, 1.2_

  - [ ] 1.9 Implement session management and expiry handling
    - Configure session expiry to 24 hours
    - Implement session extension on user activity
    - Create middleware to check session validity
    - Implement automatic redirect to login on expiry
    - Display session timeout message
    - _Requirements: 1.3, 29.1, 29.2, 29.3, 29.4_

  - [ ]* 1.10 Write property tests for session lifecycle
    - **Property 4: Session expiry requires re-authentication**
    - **Validates: Requirements 1.3**
    - **Property 51: Session lifecycle follows 24-hour rule**
    - **Validates: Requirements 29.1, 29.2**
    - **Property 52: Expired session redirects to login**
    - **Validates: Requirements 29.3, 29.4**
    - **Property 53: Session cookies are HTTP-only**
    - **Validates: Requirements 29.5**

- [ ] 2. Checkpoint - Verify authentication system
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Phase 2: Core Features - File Upload and Data Import
  - [ ] 3.1 Set up Vercel Blob Storage for file uploads
    - Install @vercel/blob package
    - Configure Blob Storage connection
    - Create utility functions for file upload/download
    - _Requirements: 4.1_

  - [ ] 3.2 Implement streaming file upload API endpoint
    - Create POST /api/upload/sales route
    - Implement multipart/form-data streaming
    - Validate file size (max 300 MB)
    - Validate file format (.xlsx, .xls)
    - Stream file to Blob Storage
    - Return file URL and upload ID
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 3.3 Write property tests for file upload validation
    - **Property 8: File format validation accepts only Excel files**
    - **Validates: Requirements 4.3**

  - [ ] 3.4 Create file upload UI component with drag-and-drop
    - Build FileUploader component
    - Implement drag-and-drop functionality
    - Add file size validation on client side
    - Display upload progress bar
    - Show success/error messages
    - _Requirements: 4.1, 4.5_

  - [ ] 3.5 Implement column mapping interface
    - Create ColumnMapper component
    - Parse and display first 20 rows of uploaded Excel file
    - Create dropdown selectors for each required field
    - Implement mapping for Sales_Data_File fields (Amount, Quantity, Branch_Code, Doc_Date, Categories, etc.)
    - Implement mapping for Branch_Data_File fields
    - Add validation to ensure all required fields are mapped
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 3.6 Write property tests for column mapping
    - **Property 10: Column mapping preview shows first 20 rows**
    - **Validates: Requirements 5.2**
    - **Property 11: Column mapping validates required fields**
    - **Validates: Requirements 5.4, 5.5, 5.8**

  - [ ] 3.7 Implement column mapping template system
    - Create POST /api/column-mapping route to save templates
    - Create GET /api/column-mapping route to load templates
    - Add "Save as template" option in UI
    - Implement auto-apply of saved templates
    - Store templates in ColumnMapping model
    - _Requirements: 5.6, 5.7_

  - [ ]* 3.8 Write property test for mapping template persistence
    - **Property 12: Saved mapping template is auto-applied**
    - **Validates: Requirements 5.7**
    - **Property 21: Custom KPI configuration is persisted**
    - **Validates: Requirements 7.12**

  - [ ] 3.9 Create ImportJob model and background job queue system
    - Implement ImportJob tracking in database
    - Create job queue system (using Vercel serverless functions)
    - Implement job status polling endpoint (GET /api/jobs/[id])
    - Create progress update mechanism
    - _Requirements: 4.6, 6.1, 6.2_

  - [ ]* 3.10 Write property tests for import job lifecycle
    - **Property 9: File upload triggers background job**
    - **Validates: Requirements 4.6**
    - **Property 13: Mapping confirmation creates import job**
    - **Validates: Requirements 6.1**

  - [ ] 3.11 Implement data parsing and validation logic
    - Create parser for Excel files (read in 1000-row chunks)
    - Implement date parsing for Doc_Date column
    - Implement numeric conversion for Amount and Quantity
    - Validate Employee_Code is not empty
    - Validate Branch_Code exists in Branch data
    - Validate Quantity is non-negative
    - Log validation errors with row numbers
    - _Requirements: 6.3, 6.4, 30.1, 30.2, 30.3, 30.4, 30.5_

  - [ ]* 3.12 Write property tests for data validation
    - **Property 14: Date parsing converts to valid date format**
    - **Validates: Requirements 6.3**
    - **Property 15: Numeric conversion validates and converts values**
    - **Validates: Requirements 6.4**
    - **Property 54: Data validation enforces field rules**
    - **Validates: Requirements 30.1, 30.2, 30.3, 30.4, 30.5**

  - [ ] 3.13 Implement background import worker
    - Create import worker function
    - Read file from Blob Storage in chunks
    - Parse each chunk using validation logic
    - Bulk insert valid rows into Sale table
    - Skip invalid rows and log errors
    - Update ImportJob progress every 5 seconds
    - Handle database connection failures with 3 retries
    - Implement transaction rollback on failure
    - _Requirements: 6.1, 6.5, 6.8, 27.3, 28.4_

  - [ ]* 3.14 Write property tests for import error handling
    - **Property 16: Invalid rows are skipped and logged**
    - **Validates: Requirements 6.5**
    - **Property 18: Failed import triggers rollback**
    - **Validates: Requirements 6.8**
    - **Property 55: Validation failures are skipped and counted**
    - **Validates: Requirements 30.6, 30.7**

  - [ ] 3.15 Implement aggregate table generation
    - Create function to generate DailySalesAggregate
    - Create function to generate MonthlySalesAggregate
    - Create function to generate YearlySalesAggregate
    - Trigger aggregate generation after successful import
    - Group by date, branchCode, employeeCode, category
    - Calculate totalAmount, totalQuantity, transCount
    - _Requirements: 6.7, 25.4_

  - [ ]* 3.16 Write property test for aggregate generation
    - **Property 17: Successful import generates aggregates**
    - **Validates: Requirements 6.7**

  - [ ] 3.17 Implement import completion and error notification
    - Display success notification with row counts
    - Display error summary (total, successful, failed rows)
    - Provide download link for error log
    - Send email notification to Admin on failure
    - _Requirements: 6.6, 28.1, 28.2, 28.3, 28.5_

  - [ ]* 3.18 Write property tests for import completion
    - **Property 47: Import errors are logged with details**
    - **Validates: Requirements 28.1**
    - **Property 48: Import completion shows accurate summary**
    - **Validates: Requirements 28.2**
    - **Property 49: Database connection failures trigger retry**
    - **Validates: Requirements 28.4**
    - **Property 50: Import failure sends notification**
    - **Validates: Requirements 28.5**

- [ ] 4. Checkpoint - Verify file upload and import system
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 5. Phase 3: Dashboard & RBAC - Multi-Role Dashboards and Access Control
  - [ ] 5.1 Implement role-based access control (RBAC) middleware
    - Create getUserScope function to determine user's data scope
    - Implement applyScopeToQuery function to filter queries by scope
    - Create middleware to check user role and permissions
    - Apply RBAC to all protected API routes
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 5.2 Write property tests for RBAC
    - **Property 27: Role-based access control enforces scope**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**
    - **Property 28: Unauthorized data access returns empty result**
    - **Validates: Requirements 9.6**

  - [ ] 5.3 Create sales data query API with RBAC
    - Create GET /api/sales route
    - Accept query parameters (startDate, endDate, aggregation, filters)
    - Apply user scope filter automatically
    - Support date range filtering
    - Support category, brand, model filtering
    - Support inventory type filtering
    - Support branch and employee filtering
    - Return sales data with summary
    - _Requirements: 9.1-9.6, 14.3, 16.5, 17.2-17.4, 18.3, 18.4_

  - [ ]* 5.4 Write property tests for filtering logic
    - **Property 29: Date range filter applies to all metrics**
    - **Validates: Requirements 14.3**
    - **Property 32: Category filters apply to dashboard**
    - **Validates: Requirements 16.5**
    - **Property 33: Multiple filter values use OR logic**
    - **Validates: Requirements 16.6**
    - **Property 34: Different filters use AND logic**
    - **Validates: Requirements 16.7**
    - **Property 35: Inventory type filter applies correctly**
    - **Validates: Requirements 17.2, 17.3, 17.4**
    - **Property 36: Branch filter limits data to selected branches**
    - **Validates: Requirements 18.3**
    - **Property 37: Employee filter limits data to selected employees**
    - **Validates: Requirements 18.4**

  - [ ] 5.5 Implement time period aggregation logic
    - Create aggregation functions for daily, monthly, yearly
    - Implement logic to use aggregate tables for queries > 90 days
    - Create query optimizer to choose between Sale and aggregate tables
    - _Requirements: 15.2, 15.3, 15.4, 25.4_

  - [ ]* 5.6 Write property tests for time aggregation
    - **Property 31: Time aggregation groups data correctly**
    - **Validates: Requirements 15.2, 15.3, 15.4**
    - **Property 46: Long date ranges use aggregate tables**
    - **Validates: Requirements 25.4**

  - [ ] 5.7 Create reusable chart components
    - Build KPICard component for metric display
    - Build TrendChart component (line chart) using Recharts
    - Build BarChart component for comparisons
    - Build PieChart component for distributions
    - Add hover tooltips with detailed values
    - Implement loading states
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7_

  - [ ] 5.8 Create data table component with sorting and pagination
    - Build DataTable component with sortable columns
    - Implement ascending/descending sort toggle
    - Add pagination controls for tables > 50 rows
    - Set default page size to 50 rows
    - Implement page navigation
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6_

  - [ ]* 5.9 Write property tests for table functionality
    - **Property 41: Table sorting toggles between ascending and descending**
    - **Validates: Requirements 21.2, 21.3**
    - **Property 42: Pagination appears for large tables**
    - **Validates: Requirements 21.4**
    - **Property 43: Default page size is 50 rows**
    - **Validates: Requirements 21.5**

  - [ ] 5.10 Create filter panel component
    - Build DateRangePicker component with preset options
    - Build MultiSelect component for category/brand/model filters
    - Create FilterPanel combining all filters
    - Implement filter state management
    - Add "Apply Filters" and "Reset" buttons
    - _Requirements: 14.1, 14.2, 16.1, 16.2, 16.3, 16.4_

  - [ ] 5.11 Implement period comparison functionality
    - Add comparison toggle to date range filter
    - Calculate previous period based on selected range
    - Fetch comparison data from API
    - Display comparison in charts and KPI cards
    - Show trend indicators (up/down arrows with percentage)
    - _Requirements: 14.5, 14.6, 14.7_

  - [ ]* 5.12 Write property test for period comparison
    - **Property 30: Period comparison shows previous period data**
    - **Validates: Requirements 14.6, 14.7**

  - [ ] 5.13 Build Admin dashboard
    - Create /app/(dashboard)/admin/page.tsx
    - Display system-wide KPI overview
    - Show all branches and employees data
    - Display recent import jobs status
    - Add navigation to user management and upload pages
    - _Requirements: 9.1_

  - [ ] 5.14 Build RM dashboard with drill-down capability
    - Create /app/(dashboard)/rm/page.tsx
    - Display regional KPI overview (total sales, AMs, branches)
    - Show AM performance comparison table
    - Display branch ranking (top 10 and bottom 10)
    - Show sales trend chart
    - Implement drill-down: AM → branches → employees
    - Apply date range and filters
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_

  - [ ] 5.15 Build AM dashboard with drill-down capability
    - Create /app/(dashboard)/am/page.tsx
    - Display area KPI overview (total sales, branches)
    - Show branch performance comparison table
    - Display staff ranking (top 10 performers)
    - Show sales trend chart
    - Implement drill-down: branch → employees
    - Apply date range and filters
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

  - [ ] 5.16 Build BM dashboard
    - Create /app/(dashboard)/bm/page.tsx
    - Display branch KPI overview (sales, employees)
    - Show staff performance table
    - Display category analysis breakdown
    - Display brand analysis breakdown
    - Show sales trend chart
    - Apply date range and filters
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [ ] 5.17 Build Staff dashboard
    - Create /app/(dashboard)/staff/page.tsx
    - Display personal KPI overview (sales, transactions)
    - Show personal sales trend chart
    - Display category breakdown
    - Display brand breakdown
    - Apply date range and filters
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.7_

  - [ ] 5.18 Implement dashboard routing based on user role
    - Create /app/(dashboard)/page.tsx as router
    - Detect user role from session
    - Redirect to appropriate dashboard (admin, rm, am, bm, staff)
    - Handle unauthorized access
    - _Requirements: 9.1-9.5_

- [ ] 6. Checkpoint - Verify dashboards and RBAC
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 7. Phase 4: Custom KPI System - KPI Builder and Calculation Engine
  - [ ] 7.1 Implement Custom KPI permission management
    - Add canCreateKPI field to User model (already in schema)
    - Create API endpoint to grant/revoke KPI creation permission
    - Add permission check middleware for KPI Builder access
    - Display permission error when unauthorized user accesses builder
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 7.2 Write property test for KPI permission
    - **Property 7: Unauthorized KPI builder access is denied**
    - **Validates: Requirements 3.3**

  - [ ] 7.3 Create KPI Builder UI component
    - Build KPIBuilder component at /app/(dashboard)/kpi-builder/page.tsx
    - Add KPI name input field
    - Create numerator filter section (categories, sub-categories, brands, models)
    - Create numerator aggregation selector (sum quantity, sum amount, count)
    - Create denominator filter section
    - Create denominator aggregation selector
    - Add calculation type selector (division, subtraction, multiplication)
    - Add display format selector (percentage, currency, number)
    - Add benchmark input field (conditional on percentage format)
    - Add role visibility multi-select
    - Implement form validation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10_

  - [ ]* 7.4 Write property tests for KPI creation validation
    - **Property 5: User creation requires all mandatory fields**
    - **Validates: Requirements 2.4**
    - **Property 19: Custom KPI creation requires name**
    - **Validates: Requirements 7.2**
    - **Property 20: Custom KPI creation validates all required fields**
    - **Validates: Requirements 7.11**

  - [ ] 7.5 Implement Custom KPI CRUD API endpoints
    - Create POST /api/kpi route to save new KPI
    - Create GET /api/kpi route to list user's KPIs
    - Create PUT /api/kpi/[id] route to update KPI
    - Create DELETE /api/kpi/[id] route to delete KPI
    - Validate all required fields before saving
    - Store configuration in CustomKPI model
    - _Requirements: 7.11, 7.12, 7.13, 7.14_

  - [ ] 7.6 Implement KPI calculation engine
    - Create calculateKPI function
    - Apply user scope filter to queries
    - Apply date range filter
    - Apply numerator filters (categories, brands, etc.)
    - Execute numerator aggregation (sum/count)
    - Apply denominator filters
    - Execute denominator aggregation
    - Perform calculation based on type
    - Handle division by zero (return "N/A")
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_

  - [ ]* 7.7 Write property tests for KPI calculation
    - **Property 22: KPI filters are applied to data queries**
    - **Validates: Requirements 8.1, 8.2**
    - **Property 23: KPI aggregation calculates correctly**
    - **Validates: Requirements 8.3, 8.4**
    - **Property 24: KPI calculation performs correct operation**
    - **Validates: Requirements 8.6, 8.7, 8.8**
    - **Property 25: Division by zero returns N/A**
    - **Validates: Requirements 8.5**

  - [ ] 7.8 Implement KPI result formatting
    - Create formatKPIResult function
    - Implement percentage formatting (× 100 + "%")
    - Implement currency formatting (2 decimals + "฿")
    - Implement number formatting (appropriate decimals)
    - _Requirements: 8.9, 8.10, 8.11_

  - [ ]* 7.9 Write property test for display formatting
    - **Property 26: Display format is applied correctly**
    - **Validates: Requirements 8.9, 8.10, 8.11**

  - [ ] 7.10 Create KPI calculation API endpoint
    - Create GET /api/kpi/calculate route
    - Accept kpiId, startDate, endDate, groupBy parameters
    - Load KPI configuration from database
    - Execute calculation engine
    - Format results
    - Return array of results grouped by AM/branch/employee
    - _Requirements: 8.1-8.11_

  - [ ] 7.11 Implement benchmark comparison and visualization
    - Create benchmark comparison logic
    - Determine status: above (> benchmark), near (90-100%), below (< 90%)
    - Apply color coding: green (above), yellow (near), red (below)
    - Display benchmark value alongside actual value
    - Handle KPIs without benchmark (default color)
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

  - [ ]* 7.12 Write property tests for benchmark visualization
    - **Property 38: Benchmark comparison determines status color**
    - **Validates: Requirements 19.1, 19.2, 19.3**
    - **Property 39: KPI without benchmark shows default color**
    - **Validates: Requirements 19.4**
    - **Property 40: Benchmark value is displayed alongside result**
    - **Validates: Requirements 19.5**

  - [ ] 7.13 Create KPI display component
    - Build KPIDisplay component
    - Show KPI name and value
    - Apply formatting based on display format
    - Show benchmark comparison if configured
    - Apply color coding based on status
    - Display trend indicator if comparison enabled
    - _Requirements: 13.6, 19.1-19.5_

  - [ ] 7.14 Integrate Custom KPIs into all dashboards
    - Add Custom KPI section to RM dashboard (aggregated by AM)
    - Add Custom KPI section to AM dashboard (aggregated by branch)
    - Add Custom KPI section to BM dashboard (aggregated by employee)
    - Add Custom KPI section to Staff dashboard (personal values)
    - Filter KPIs by role visibility
    - Apply date range and filters to KPI calculations
    - _Requirements: 10.5, 11.5, 12.6, 13.3_

- [ ] 8. Checkpoint - Verify Custom KPI system
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 9. Phase 5: Export & Polish - Export Features and Performance Optimization
  - [ ] 9.1 Implement data export to Excel
    - Install xlsx library
    - Create POST /api/export route
    - Accept format parameter (excel or csv)
    - Apply current filters and date range
    - Apply user scope filter
    - Generate Excel file with column headers
    - Stream file to response
    - Trigger browser download
    - _Requirements: 22.1, 22.2, 22.3, 22.5, 22.6, 22.7_

  - [ ] 9.2 Implement data export to CSV
    - Create CSV generation function
    - Apply current filters and date range
    - Apply user scope filter
    - Generate CSV file with column headers
    - Stream file to response
    - Trigger browser download
    - _Requirements: 22.1, 22.2, 22.4, 22.5, 22.6, 22.7_

  - [ ]* 9.3 Write property tests for data export
    - **Property 44: Export generates file with filtered data**
    - **Validates: Requirements 22.3, 22.4, 22.5**
    - **Property 45: Export respects user authorization scope**
    - **Validates: Requirements 22.7**

  - [ ] 9.4 Implement chart export to PNG
    - Install html2canvas library
    - Create chart export function
    - Capture chart as PNG at 1920x1080 resolution
    - Trigger browser download
    - Add export button to each chart component
    - _Requirements: 23.1, 23.2, 23.3, 23.5_

  - [ ] 9.5 Implement chart export to PDF
    - Install jsPDF library
    - Create PDF generation function
    - Embed chart image in PDF document
    - Trigger browser download
    - _Requirements: 23.1, 23.2, 23.4, 23.5_

  - [ ] 9.6 Implement print-friendly view
    - Create print stylesheet
    - Remove navigation and interactive elements for print
    - Format layout for A4 paper size
    - Include date range and filter information in header
    - Add print button to dashboard
    - Trigger browser print dialog
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

  - [ ] 9.7 Implement database indexing for performance
    - Create indexes on Sale table: docDate, branchCode, employeeCode, category, brand, itemType
    - Create composite indexes: (docDate, branchCode), (docDate, employeeCode)
    - Create indexes on aggregate tables
    - Create indexes on User table: email, employeeCode, branchCode
    - Create indexes on Branch table: rm, am, bm
    - Run migration to add indexes
    - _Requirements: 25.3_

  - [ ] 9.8 Implement caching strategy
    - Create in-memory cache utility (Map-based)
    - Implement getCached and setCache functions
    - Cache branch list for 5 minutes
    - Cache user list for 5 minutes
    - Cache frequently accessed KPI configurations
    - Implement cache invalidation on data import
    - _Requirements: 25.5_

  - [ ] 9.9 Optimize query performance with aggregate tables
    - Implement shouldUseAggregate function (check if date range > 90 days)
    - Create queryFromAggregates function
    - Modify sales query API to use aggregates for long ranges
    - Ensure aggregate tables are updated after imports
    - _Requirements: 25.4_

  - [ ] 9.10 Implement connection pooling
    - Configure Prisma connection pool (limit: 20)
    - Test concurrent user support
    - Monitor connection usage
    - _Requirements: 25.6, 26.1, 26.2, 26.3, 26.4_

  - [ ] 9.11 Optimize file processing for large files
    - Ensure chunk size is 1000 rows
    - Implement streaming for files up to 300 MB
    - Test with 500,000 row file
    - Verify import completes within 10 minutes
    - _Requirements: 27.1, 27.2, 27.3, 27.4_

  - [ ] 9.12 Add loading states and performance indicators
    - Add loading spinners to all data-fetching components
    - Implement skeleton screens for dashboards
    - Show "Loading..." states during calculations
    - Ensure initial dashboard load < 3 seconds
    - Ensure filter changes update < 3 seconds
    - _Requirements: 25.1, 25.2_

- [ ] 10. Checkpoint - Verify export and performance
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 11. Phase 6: User Management, Testing & Deployment
  - [ ] 11.1 Implement user management UI for Admin
    - Create /app/(dashboard)/admin/users/page.tsx
    - Display list of all users with role and status
    - Add "Create User" button and modal
    - Implement user creation form with role-specific fields
    - Add "Edit User" functionality
    - Add "Delete User" functionality with confirmation
    - Add "Grant/Revoke KPI Permission" toggle
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2_

  - [ ]* 11.2 Write property test for role assignment validation
    - **Property 6: Role assignment validates role-specific requirements**
    - **Validates: Requirements 2.6, 2.7, 2.8, 2.9**

  - [ ] 11.3 Implement user CRUD API endpoints
    - Create POST /api/users route for user creation
    - Create GET /api/users route to list users
    - Create PUT /api/users/[id] route to update user
    - Create DELETE /api/users/[id] route to delete user
    - Validate role-specific required fields (RM: regions/AMs, AM: areas/branches, BM: branch, Staff: employeeCode/branch)
    - Hash passwords with bcrypt
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6, 2.7, 2.8, 2.9_

  - [ ] 11.4 Create file upload page for Admin
    - Create /app/(dashboard)/admin/upload/page.tsx
    - Add tabs for "Sales Data" and "Branch Data"
    - Integrate FileUploader component
    - Integrate ColumnMapper component
    - Display upload history and job status
    - Show progress for ongoing imports
    - _Requirements: 4.1, 4.5, 5.1_

  - [ ] 11.5 Create import job status page
    - Create /app/(dashboard)/admin/jobs/page.tsx
    - Display list of all import jobs with status
    - Show progress for running jobs
    - Display error logs for failed jobs
    - Provide download link for error logs
    - Implement auto-refresh for job status
    - _Requirements: 6.2, 28.2, 28.3_

  - [ ] 11.6 Write comprehensive unit tests for authentication
    - Test valid credentials authentication
    - Test invalid credentials rejection
    - Test empty password handling
    - Test session creation and expiry
    - Test password hashing with bcrypt
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 11.7 Write comprehensive unit tests for file upload
    - Test file size validation
    - Test file format validation
    - Test streaming upload
    - Test progress tracking
    - Test error handling
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ] 11.8 Write comprehensive unit tests for column mapping
    - Test preview generation (first 20 rows)
    - Test required field validation
    - Test template save and load
    - Test auto-apply of templates
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ] 11.9 Write comprehensive unit tests for data import
    - Test chunk processing
    - Test data validation
    - Test error logging
    - Test transaction rollback
    - Test aggregate generation
    - Test completion notification
    - _Requirements: 6.1-6.8, 28.1-28.5_

  - [ ] 11.10 Write comprehensive unit tests for RBAC
    - Test scope calculation for each role
    - Test query filtering by scope
    - Test unauthorized access handling
    - Test drill-down permissions
    - _Requirements: 9.1-9.6_

  - [ ] 11.11 Write comprehensive unit tests for KPI system
    - Test KPI creation validation
    - Test filter application
    - Test aggregation calculations
    - Test calculation operations (division, subtraction, multiplication)
    - Test division by zero handling
    - Test result formatting
    - Test benchmark comparison
    - _Requirements: 7.1-7.14, 8.1-8.11, 19.1-19.5_

  - [ ] 11.12 Write comprehensive unit tests for filtering
    - Test date range filtering
    - Test category filtering
    - Test inventory type filtering
    - Test branch and employee filtering
    - Test filter combination logic (AND/OR)
    - Test time period aggregation
    - _Requirements: 14.1-14.7, 15.1-15.5, 16.1-16.8, 17.1-17.5, 18.1-18.5_

  - [ ] 11.13 Write comprehensive unit tests for export
    - Test Excel export generation
    - Test CSV export generation
    - Test chart export to PNG
    - Test chart export to PDF
    - Test print-friendly view
    - Test scope filtering in exports
    - _Requirements: 22.1-22.7, 23.1-23.5, 24.1-24.5_

  - [ ] 11.14 Write integration tests for complete workflows
    - Test complete upload and import flow
    - Test dashboard data loading flow
    - Test KPI creation and calculation flow
    - Test export flow with filters
    - Test user creation and login flow
    - _Requirements: All_

  - [ ] 11.15 Set up error handling and logging
    - Implement error response format
    - Create error logging utility
    - Set up Vercel logging integration
    - Implement user-friendly error messages in Thai
    - Add error boundaries to React components
    - _Requirements: 28.1, 28.2, 28.3_

  - [ ] 11.16 Configure environment variables and secrets
    - Set up DATABASE_URL for PostgreSQL
    - Configure NEXTAUTH_SECRET
    - Configure NEXTAUTH_URL
    - Set up Vercel Blob Storage credentials
    - Configure email service for notifications
    - Create .env.example file

  - [ ] 11.17 Create deployment configuration
    - Configure vercel.json for deployment
    - Set up build scripts in package.json
    - Configure Prisma for production
    - Set up database migrations for production
    - Configure serverless function timeouts

  - [ ] 11.18 Deploy to Vercel staging environment
    - Push code to Git repository
    - Connect repository to Vercel
    - Configure environment variables in Vercel
    - Run database migrations
    - Deploy to staging
    - Test all features in staging

  - [ ] 11.19 Perform load testing
    - Test with 80 concurrent users
    - Test with 300 MB file upload
    - Test with 500,000 row import
    - Verify dashboard load time < 3 seconds
    - Verify filter update time < 3 seconds
    - Verify import completion < 10 minutes
    - _Requirements: 25.1, 25.2, 26.1, 26.2, 26.3, 27.1, 27.2, 27.3_

  - [ ] 11.20 Create user documentation
    - Write Admin user guide (user management, file upload, column mapping)
    - Write RM/AM/BM user guide (dashboard navigation, filters, drill-down)
    - Write Staff user guide (personal dashboard, KPI interpretation)
    - Write KPI Builder guide (creating custom KPIs, filters, benchmarks)
    - Document export features
    - Create troubleshooting guide

  - [ ] 11.21 Deploy to production
    - Review all tests passing
    - Review staging environment validation
    - Deploy to production environment
    - Run smoke tests on production
    - Monitor error logs and performance
    - Notify stakeholders of deployment

- [ ] 12. Final Checkpoint - Production readiness verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation at the end of each phase
- All code examples use TypeScript as specified in the design document
- The implementation follows Next.js 14 App Router patterns with server and client components
- Background jobs use Vercel serverless functions for scalability
- Database uses PostgreSQL with Prisma ORM for type safety
- Authentication uses NextAuth.js with bcrypt password hashing
- File storage uses Vercel Blob Storage for large file handling
- Charts use Recharts library for visualization
- UI components use shadcn/ui with Tailwind CSS
