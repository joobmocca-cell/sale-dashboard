# Requirements Document

## Introduction

Sales Dashboard System เป็นเว็บแอปพลิเคชันสำหรับติดตามยอดขายและ KPI ของพนักงานในองค์กร โดยรองรับการนำเข้าข้อมูลจากไฟล์ Excel ขนาดใหญ่ (10-300 MB) และแสดงผลข้อมูลตาม role ของผู้ใช้งาน (Admin, RM, AM, BM, Staff) พร้อมระบบสร้าง Custom KPI แบบ dynamic

## Glossary

- **System**: Sales Dashboard System
- **Admin**: ผู้ดูแลระบบที่มีสิทธิ์เต็มในการจัดการ users และอัพโหลดข้อมูล
- **RM**: Regional Manager ผู้จัดการระดับภูมิภาค
- **AM**: Area Manager ผู้จัดการระดับพื้นที่
- **BM**: Branch Manager ผู้จัดการสาขา
- **Staff**: พนักงานขาย
- **Sales_Data_File**: ไฟล์ Excel ที่มีข้อมูลยอดขาย ขนาด 10-300 MB
- **Branch_Data_File**: ไฟล์ Excel ที่มีข้อมูลสาขาและผู้บริหาร
- **Column_Mapping**: การกำหนดความสัมพันธ์ระหว่าง column ในไฟล์ Excel กับ field ในระบบ
- **Custom_KPI**: ตัวชี้วัดที่ผู้ใช้สร้างขึ้นเองโดยกำหนด filters และการคำนวณ
- **Numerator**: ตัวเศษในการคำนวณ KPI
- **Denominator**: ตัวหารในการคำนวณ KPI
- **Benchmark**: เป้าหมายหรือค่ามาตรฐานของ KPI
- **Drill_Down**: การคลิกเพื่อดูรายละเอียดในระดับที่ลึกขึ้น
- **Inventory_Item**: สินค้าที่มีสต็อกจริง
- **Non_Inventory_Item**: รายการที่ไม่มีสต็อก เช่น โปรโมชั่น โค้ด
- **Background_Job**: กระบวนการที่ทำงานเบื้องหลังโดยไม่บล็อก UI
- **Aggregate_Table**: ตารางที่เก็บข้อมูลสรุปเพื่อเพิ่มความเร็วในการ query

## Requirements

### Requirement 1: User Authentication

**User Story:** As a user, I want to log in with email and password, so that I can access the dashboard securely

#### Acceptance Criteria

1. WHEN a user submits valid email and password, THE System SHALL authenticate the user and grant access to the dashboard
2. WHEN a user submits invalid credentials, THE System SHALL display an error message within 2 seconds
3. WHEN a user session expires after 24 hours, THE System SHALL require re-authentication
4. THE System SHALL encrypt passwords using bcrypt with minimum 10 salt rounds

### Requirement 2: User Management

**User Story:** As an Admin, I want to create and manage user accounts, so that I can control who has access to the system

#### Acceptance Criteria

1. WHERE the user is an Admin, THE System SHALL provide user creation functionality
2. WHERE the user is an Admin, THE System SHALL provide user editing functionality
3. WHERE the user is an Admin, THE System SHALL provide user deletion functionality
4. WHEN an Admin creates a user, THE System SHALL require email, password, role, and access scope
5. THE System SHALL support roles: Admin, RM, AM, BM, Staff
6. WHEN an Admin assigns RM role, THE System SHALL require selection of regions and AMs under management
7. WHEN an Admin assigns AM role, THE System SHALL require selection of areas and branches under management
8. WHEN an Admin assigns BM role, THE System SHALL require selection of branch
9. WHEN an Admin assigns Staff role, THE System SHALL require employee code and branch assignment

### Requirement 3: Custom KPI Permission Management

**User Story:** As an Admin, I want to grant Custom KPI creation permission to specific users, so that authorized users can create their own KPIs

#### Acceptance Criteria

1. WHERE the user is an Admin, THE System SHALL provide functionality to grant Custom KPI creation permission
2. WHERE the user is an Admin, THE System SHALL provide functionality to revoke Custom KPI creation permission
3. WHEN a user without permission attempts to access KPI Builder, THE System SHALL deny access and display permission error

### Requirement 4: Excel File Upload

**User Story:** As an Admin, I want to upload Excel files up to 300 MB, so that I can import sales and branch data into the system

#### Acceptance Criteria

1. WHERE the user is an Admin, THE System SHALL provide file upload functionality for Sales_Data_File and Branch_Data_File
2. WHEN an Admin uploads a file larger than 300 MB, THE System SHALL reject the upload and display size limit error
3. WHEN an Admin uploads a file, THE System SHALL validate file format is Excel (.xlsx or .xls)
4. WHEN an Admin uploads a file, THE System SHALL process the upload using streaming to prevent memory overflow
5. WHEN file upload begins, THE System SHALL display progress indicator showing percentage completed
6. WHEN file upload completes, THE System SHALL trigger Background_Job for data processing
7. WHILE Background_Job is processing, THE System SHALL allow Admin to continue using other features

### Requirement 5: Column Mapping Configuration

**User Story:** As an Admin, I want to map Excel columns to system fields, so that the system can correctly interpret imported data

#### Acceptance Criteria

1. WHEN an Admin uploads Sales_Data_File, THE System SHALL display Column_Mapping interface
2. THE System SHALL display first 20 rows of uploaded file as preview
3. THE System SHALL provide dropdown selectors for mapping each required field to Excel columns
4. FOR Sales_Data_File, THE System SHALL require mapping for: Amount (Column E), Quantity (Column C), Branch_Code (Column N), Doc_Date (Column R), Categories (Column J), Sub_Categories (Column K), Brand (Column L), Model (Column M), Employee_Code (Column AQ), Employee_Name (Column AR), Item_Type (Column AT)
5. FOR Branch_Data_File, THE System SHALL require mapping for: Branch_Code (Column A), Branch_Name (Column B), Unit (Column C), RM (Column D), AM (Column E), Sales_Channel (Column F), BM (Column G), Contact_Number (Column H)
6. WHEN an Admin completes mapping, THE System SHALL provide option to save mapping as template
7. WHEN an Admin uploads file with saved template, THE System SHALL auto-apply previous Column_Mapping
8. WHEN an Admin confirms mapping, THE System SHALL validate all required fields are mapped before proceeding

### Requirement 6: Data Import Processing

**User Story:** As an Admin, I want imported data to be processed efficiently, so that the system remains responsive during large imports

#### Acceptance Criteria

1. WHEN Column_Mapping is confirmed, THE System SHALL start Background_Job to import data
2. WHILE Background_Job is running, THE System SHALL update progress indicator every 5 seconds
3. WHEN Background_Job processes Sales_Data_File, THE System SHALL parse Doc_Date into date format
4. WHEN Background_Job processes Sales_Data_File, THE System SHALL convert Amount and Quantity to numeric values
5. WHEN Background_Job encounters invalid data row, THE System SHALL log error and continue processing remaining rows
6. WHEN Background_Job completes successfully, THE System SHALL display success notification with row count imported
7. WHEN Background_Job completes, THE System SHALL generate Aggregate_Table for daily, monthly, and yearly summaries
8. IF Background_Job fails, THEN THE System SHALL display error message with failure reason and rollback partial import

### Requirement 7: Custom KPI Builder

**User Story:** As an authorized user, I want to create custom KPIs with dynamic filters and calculations, so that I can track metrics specific to my business needs

#### Acceptance Criteria

1. WHERE user has Custom KPI creation permission, THE System SHALL provide KPI Builder interface
2. WHEN user creates Custom_KPI, THE System SHALL require KPI name input
3. THE System SHALL provide filter selection for Numerator with options: Categories, Sub_Categories, Brand, Model
4. THE System SHALL provide aggregation selection for Numerator with options: Sum Quantity, Sum Amount, Count
5. THE System SHALL provide filter selection for Denominator with options: Categories, Sub_Categories, Brand, Model
6. THE System SHALL provide aggregation selection for Denominator with options: Sum Quantity, Sum Amount, Count
7. THE System SHALL provide calculation type selection with options: Division, Subtraction, Multiplication
8. THE System SHALL provide display format selection with options: Percentage, Number, Currency
9. WHEN user sets display format to Percentage, THE System SHALL provide Benchmark input field
10. THE System SHALL provide role visibility selection to specify which roles can view the Custom_KPI
11. WHEN user saves Custom_KPI, THE System SHALL validate all required fields are completed
12. WHEN user saves Custom_KPI, THE System SHALL store configuration for reuse
13. WHERE user has Custom KPI creation permission, THE System SHALL provide functionality to edit existing Custom_KPI
14. WHERE user has Custom KPI creation permission, THE System SHALL provide functionality to delete Custom_KPI

### Requirement 8: Custom KPI Calculation

**User Story:** As a user, I want custom KPIs to be calculated accurately based on configured filters, so that I can trust the metrics displayed

#### Acceptance Criteria

1. WHEN Custom_KPI is displayed, THE System SHALL apply Numerator filters to sales data
2. WHEN Custom_KPI is displayed, THE System SHALL apply Denominator filters to sales data
3. WHEN Custom_KPI is displayed, THE System SHALL aggregate Numerator data according to configured aggregation method
4. WHEN Custom_KPI is displayed, THE System SHALL aggregate Denominator data according to configured aggregation method
5. WHEN calculation type is Division and Denominator equals zero, THE System SHALL display "N/A" instead of error
6. WHEN calculation type is Division, THE System SHALL compute result as (Numerator / Denominator)
7. WHEN calculation type is Subtraction, THE System SHALL compute result as (Numerator - Denominator)
8. WHEN calculation type is Multiplication, THE System SHALL compute result as (Numerator × Denominator)
9. WHEN display format is Percentage, THE System SHALL multiply result by 100 and append "%" symbol
10. WHEN display format is Currency, THE System SHALL format result with 2 decimal places and currency symbol
11. WHEN display format is Number, THE System SHALL format result with appropriate decimal places

### Requirement 9: Role-Based Data Access Control

**User Story:** As a user, I want to see only data I am authorized to access based on my role, so that data security is maintained

#### Acceptance Criteria

1. WHERE user role is Admin, THE System SHALL display all sales data across all branches and employees
2. WHERE user role is RM, THE System SHALL display sales data for regions, AMs, branches, and employees under RM management
3. WHERE user role is AM, THE System SHALL display sales data for areas, branches, and employees under AM management
4. WHERE user role is BM, THE System SHALL display sales data for assigned branch and employees in that branch
5. WHERE user role is Staff, THE System SHALL display sales data for the employee's own Employee_Code only
6. WHEN user attempts to access data outside authorized scope, THE System SHALL deny access and return empty result

### Requirement 10: RM Dashboard Display

**User Story:** As an RM, I want to view regional performance metrics and drill down to AM and branch details, so that I can monitor my region effectively

#### Acceptance Criteria

1. WHERE user role is RM, THE System SHALL display KPI overview showing total regional sales amount, total regional sales quantity, number of AMs, and number of branches
2. WHERE user role is RM, THE System SHALL display AM performance comparison table with columns: AM name, sales amount, sales quantity, number of branches
3. WHERE user role is RM, THE System SHALL display branch ranking showing top 10 and bottom 10 branches by sales amount
4. WHERE user role is RM, THE System SHALL display sales trend chart with daily, monthly, or yearly aggregation based on selected time period
5. WHERE user role is RM, THE System SHALL display all visible Custom_KPIs aggregated by AM
6. WHERE user role is RM, WHEN RM clicks on AM name, THE System SHALL drill down to show branches under that AM
7. WHERE user role is RM, WHEN RM clicks on branch name, THE System SHALL drill down to show employees in that branch
8. WHERE user role is RM, THE System SHALL apply selected date range filter to all displayed metrics

### Requirement 11: AM Dashboard Display

**User Story:** As an AM, I want to view area performance metrics and drill down to branch and staff details, so that I can manage my area effectively

#### Acceptance Criteria

1. WHERE user role is AM, THE System SHALL display KPI overview showing total area sales amount, total area sales quantity, and number of branches
2. WHERE user role is AM, THE System SHALL display branch performance comparison table with columns: branch name, sales amount, sales quantity, number of employees
3. WHERE user role is AM, THE System SHALL display staff ranking showing top 10 performers by sales amount across all branches
4. WHERE user role is AM, THE System SHALL display sales trend chart with daily, monthly, or yearly aggregation based on selected time period
5. WHERE user role is AM, THE System SHALL display all visible Custom_KPIs aggregated by branch
6. WHERE user role is AM, WHEN AM clicks on branch name, THE System SHALL drill down to show employees in that branch
7. WHERE user role is AM, THE System SHALL apply selected date range filter to all displayed metrics

### Requirement 12: BM Dashboard Display

**User Story:** As a BM, I want to view branch performance metrics and staff details, so that I can manage my branch team effectively

#### Acceptance Criteria

1. WHERE user role is BM, THE System SHALL display KPI overview showing branch sales amount, branch sales quantity, and number of employees
2. WHERE user role is BM, THE System SHALL display staff performance table with columns: employee name, employee code, sales amount, sales quantity
3. WHERE user role is BM, THE System SHALL display category analysis showing sales breakdown by Categories
4. WHERE user role is BM, THE System SHALL display brand analysis showing sales breakdown by Brand
5. WHERE user role is BM, THE System SHALL display sales trend chart with daily, monthly, or yearly aggregation based on selected time period
6. WHERE user role is BM, THE System SHALL display all visible Custom_KPIs aggregated by employee
7. WHERE user role is BM, THE System SHALL apply selected date range filter to all displayed metrics

### Requirement 13: Staff Dashboard Display

**User Story:** As a Staff member, I want to view my personal performance metrics, so that I can track my own sales progress

#### Acceptance Criteria

1. WHERE user role is Staff, THE System SHALL display personal KPI overview showing employee sales amount, employee sales quantity, and number of transactions
2. WHERE user role is Staff, THE System SHALL display personal sales trend chart with daily, monthly, or yearly aggregation based on selected time period
3. WHERE user role is Staff, THE System SHALL display all visible Custom_KPIs for the employee
4. WHERE user role is Staff, THE System SHALL display category breakdown showing employee sales by Categories
5. WHERE user role is Staff, THE System SHALL display brand breakdown showing employee sales by Brand
6. WHERE user role is Staff, WHEN Custom_KPI has Benchmark configured, THE System SHALL display comparison between employee performance and Benchmark
7. WHERE user role is Staff, THE System SHALL apply selected date range filter to all displayed metrics

### Requirement 14: Date Range Filtering

**User Story:** As a user, I want to filter dashboard data by date range, so that I can analyze performance for specific time periods

#### Acceptance Criteria

1. THE System SHALL provide date range filter with preset options: Today, Yesterday, This Week, This Month, This Year
2. THE System SHALL provide custom date range selector allowing user to specify start date and end date
3. WHEN user selects date range, THE System SHALL filter all dashboard metrics to show data within Doc_Date range
4. WHEN user selects date range, THE System SHALL update all charts and tables within 3 seconds
5. THE System SHALL provide comparison toggle to compare selected period with previous period
6. WHEN comparison is enabled and period is "This Month", THE System SHALL display comparison with previous month
7. WHEN comparison is enabled and period is "This Year", THE System SHALL display comparison with previous year

### Requirement 15: Time Period Aggregation

**User Story:** As a user, I want to view sales data aggregated by day, month, or year, so that I can analyze trends at different time scales

#### Acceptance Criteria

1. THE System SHALL provide time period aggregation selector with options: Daily, Monthly, Yearly
2. WHEN user selects Daily aggregation, THE System SHALL group sales data by Doc_Date day
3. WHEN user selects Monthly aggregation, THE System SHALL group sales data by Doc_Date month
4. WHEN user selects Yearly aggregation, THE System SHALL group sales data by Doc_Date year
5. WHEN aggregation changes, THE System SHALL update trend charts within 2 seconds
6. THE System SHALL use Aggregate_Table to optimize query performance for Monthly and Yearly aggregations

### Requirement 16: Category and Product Filtering

**User Story:** As a user, I want to filter dashboard data by category, brand, and model, so that I can analyze specific product segments

#### Acceptance Criteria

1. THE System SHALL provide multi-select filter for Categories
2. THE System SHALL provide multi-select filter for Sub_Categories
3. THE System SHALL provide multi-select filter for Brand
4. THE System SHALL provide multi-select filter for Model
5. WHEN user selects category filters, THE System SHALL apply filters to all dashboard metrics
6. WHEN user selects multiple values in same filter, THE System SHALL use OR logic
7. WHEN user selects values across different filters, THE System SHALL use AND logic
8. WHEN filters change, THE System SHALL update dashboard within 3 seconds

### Requirement 17: Inventory Type Filtering

**User Story:** As a user, I want to filter data by inventory type, so that I can analyze sales of physical products separately from non-inventory items

#### Acceptance Criteria

1. THE System SHALL provide Inventory Type toggle with options: All, Inventory Items Only, Non-Inventory Items Only
2. WHEN user selects "Inventory Items Only", THE System SHALL filter to show only rows where Item_Type equals "inventory item"
3. WHEN user selects "Non-Inventory Items Only", THE System SHALL filter to show only rows where Item_Type equals "non inventory item"
4. WHEN user selects "All", THE System SHALL display data for all Item_Type values
5. WHEN Inventory Type changes, THE System SHALL update all dashboard metrics within 2 seconds

### Requirement 18: Branch and Employee Filtering

**User Story:** As a user with appropriate permissions, I want to filter data by branch and employee, so that I can focus on specific organizational units

#### Acceptance Criteria

1. WHERE user role is Admin or RM, THE System SHALL provide multi-select filter for branches within authorized scope
2. WHERE user role is Admin, RM, or AM, THE System SHALL provide multi-select filter for employees within authorized scope
3. WHEN user selects branch filter, THE System SHALL display only data for selected branches
4. WHEN user selects employee filter, THE System SHALL display only data for selected employees
5. WHERE user role is BM, THE System SHALL not display branch filter
6. WHERE user role is Staff, THE System SHALL not display branch or employee filters

### Requirement 19: KPI Benchmark Visualization

**User Story:** As a user, I want to see visual indicators when KPIs meet or exceed benchmarks, so that I can quickly identify performance status

#### Acceptance Criteria

1. WHEN Custom_KPI has Benchmark configured and result exceeds Benchmark, THE System SHALL display value in green color
2. WHEN Custom_KPI has Benchmark configured and result is within 10% below Benchmark, THE System SHALL display value in yellow color
3. WHEN Custom_KPI has Benchmark configured and result is more than 10% below Benchmark, THE System SHALL display value in red color
4. WHEN Custom_KPI does not have Benchmark configured, THE System SHALL display value in default color
5. THE System SHALL display Benchmark value alongside actual value for comparison

### Requirement 20: Chart Visualizations

**User Story:** As a user, I want to view data in various chart formats, so that I can understand trends and patterns visually

#### Acceptance Criteria

1. THE System SHALL display KPI cards showing key metrics with large numbers and trend indicators
2. THE System SHALL display bar charts for comparing performance across AMs, branches, or employees
3. THE System SHALL display line charts for showing sales trends over time periods
4. THE System SHALL display pie charts for showing category or brand distribution
5. THE System SHALL display donut charts as alternative to pie charts for percentage breakdowns
6. WHEN user hovers over chart element, THE System SHALL display tooltip with detailed values
7. THE System SHALL render all charts within 2 seconds of data load

### Requirement 21: Data Table Display

**User Story:** As a user, I want to view detailed data in table format, so that I can see exact values and sort by different columns

#### Acceptance Criteria

1. THE System SHALL display performance data in sortable tables
2. WHEN user clicks column header, THE System SHALL sort table by that column in ascending order
3. WHEN user clicks same column header again, THE System SHALL sort table in descending order
4. THE System SHALL display pagination controls when table has more than 50 rows
5. THE System SHALL display 50 rows per page by default
6. WHEN user navigates to next page, THE System SHALL load next 50 rows within 1 second

### Requirement 22: Data Export

**User Story:** As a user, I want to export filtered dashboard data, so that I can perform additional analysis in external tools

#### Acceptance Criteria

1. THE System SHALL provide export button on dashboard
2. WHEN user clicks export button, THE System SHALL display format options: Excel, CSV
3. WHEN user selects Excel format, THE System SHALL generate .xlsx file containing filtered data with current date range and filters applied
4. WHEN user selects CSV format, THE System SHALL generate .csv file containing filtered data with current date range and filters applied
5. THE System SHALL include column headers in exported files
6. WHEN export file is ready, THE System SHALL trigger browser download within 5 seconds
7. THE System SHALL limit export to data within user's authorized scope based on role

### Requirement 23: Chart Export

**User Story:** As a user, I want to export charts as images, so that I can include them in presentations and reports

#### Acceptance Criteria

1. THE System SHALL provide export button on each chart
2. WHEN user clicks chart export button, THE System SHALL display format options: PNG, PDF
3. WHEN user selects PNG format, THE System SHALL generate PNG image of chart at 1920x1080 resolution
4. WHEN user selects PDF format, THE System SHALL generate PDF document containing chart
5. WHEN export file is ready, THE System SHALL trigger browser download within 3 seconds

### Requirement 24: Print-Friendly View

**User Story:** As a user, I want to print dashboard reports, so that I can share physical copies in meetings

#### Acceptance Criteria

1. THE System SHALL provide print button on dashboard
2. WHEN user clicks print button, THE System SHALL generate print-friendly layout removing navigation and interactive elements
3. WHEN user clicks print button, THE System SHALL trigger browser print dialog
4. THE System SHALL format printed output to fit standard A4 paper size
5. THE System SHALL include date range and filter information in printed header

### Requirement 25: Performance Optimization

**User Story:** As a user, I want the dashboard to load quickly even with large datasets, so that I can work efficiently

#### Acceptance Criteria

1. WHEN user opens dashboard, THE System SHALL display initial view within 3 seconds
2. WHEN user changes filters, THE System SHALL update dashboard within 3 seconds
3. THE System SHALL create database indexes on Branch_Code, Employee_Code, and Doc_Date columns
4. THE System SHALL use Aggregate_Table for queries spanning more than 90 days
5. THE System SHALL cache frequently accessed data for 5 minutes
6. THE System SHALL support 80 concurrent users without performance degradation

### Requirement 26: Concurrent User Support

**User Story:** As a system administrator, I want the system to handle multiple simultaneous users, so that all team members can access dashboards concurrently

#### Acceptance Criteria

1. THE System SHALL support minimum 20 concurrent users
2. THE System SHALL support maximum 80 concurrent users
3. WHEN 80 users are active simultaneously, THE System SHALL maintain dashboard load time under 5 seconds
4. THE System SHALL use connection pooling to manage database connections efficiently

### Requirement 27: File Size Support

**User Story:** As an Admin, I want to upload large Excel files containing historical sales data, so that I can analyze long-term trends

#### Acceptance Criteria

1. THE System SHALL support Sales_Data_File uploads from 10 MB to 300 MB
2. THE System SHALL support Sales_Data_File containing 50,000 to 500,000 rows
3. WHEN processing file with 500,000 rows, THE System SHALL complete import within 10 minutes
4. THE System SHALL process files in chunks of 1,000 rows to prevent memory overflow

### Requirement 28: Error Handling and Logging

**User Story:** As an Admin, I want to see detailed error messages when imports fail, so that I can correct data issues and retry

#### Acceptance Criteria

1. WHEN Background_Job encounters error during import, THE System SHALL log error message with row number and error description
2. WHEN import completes with errors, THE System SHALL display summary showing total rows processed, successful rows, and failed rows
3. WHERE user is Admin, THE System SHALL provide download link for error log file
4. IF database connection fails during import, THEN THE System SHALL retry connection 3 times before failing
5. IF import fails after retries, THEN THE System SHALL send email notification to Admin

### Requirement 29: Session Management

**User Story:** As a user, I want my session to remain active while I'm working, so that I don't lose my work due to timeout

#### Acceptance Criteria

1. WHEN user logs in, THE System SHALL create session valid for 24 hours
2. WHEN user performs any action, THE System SHALL extend session expiry by 24 hours from that action
3. WHEN session expires, THE System SHALL redirect user to login page
4. WHEN session expires, THE System SHALL display message indicating session timeout
5. THE System SHALL store session data securely using HTTP-only cookies

### Requirement 30: Data Parsing and Validation

**User Story:** As an Admin, I want the system to validate imported data, so that invalid data doesn't corrupt the database

#### Acceptance Criteria

1. WHEN parsing Amount column, THE System SHALL validate value is numeric
2. WHEN parsing Quantity column, THE System SHALL validate value is numeric and non-negative
3. WHEN parsing Doc_Date column, THE System SHALL validate value is valid date format
4. WHEN parsing Employee_Code column, THE System SHALL validate value is not empty
5. WHEN parsing Branch_Code column, THE System SHALL validate value exists in Branch_Data_File
6. IF validation fails for any row, THEN THE System SHALL skip that row and log validation error
7. WHEN parsing completes, THE System SHALL display count of skipped rows due to validation errors
