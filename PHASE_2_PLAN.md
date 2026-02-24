# 📋 Phase 2 Implementation Plan

## Overview

Phase 2 จะเพิ่ม functionality ที่สำคัญให้กับระบบ โดยเน้นที่การทำงานจริงของ file upload, data processing, และการแสดงผลข้อมูล

## 🎯 Goals

1. ทำให้ระบบสามารถนำเข้าข้อมูลจาก Excel ได้จริง
2. แสดงข้อมูลยอดขายใน dashboard
3. สร้าง charts และ visualizations
4. Implement user management API

## 📦 Features to Implement

### 1. User Management API (Priority: High)

**Tasks:**
- [ ] Create POST /api/users - สร้าง user ใหม่
- [ ] Create GET /api/users - list users
- [ ] Create PUT /api/users/[id] - update user
- [ ] Create DELETE /api/users/[id] - delete user
- [ ] Implement role-specific validation
- [ ] Connect to User Management UI

**Estimated Time:** 1-2 days

**Files to Create:**
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `lib/validations/user.ts` (Zod schemas)

### 2. File Upload & Processing (Priority: High)

**Tasks:**
- [ ] Set up Vercel Blob Storage
- [ ] Create POST /api/upload/sales - upload sales file
- [ ] Create POST /api/upload/branches - upload branch file
- [ ] Implement streaming file upload
- [ ] Parse Excel files with xlsx library
- [ ] Validate file data
- [ ] Store parsed data in database

**Estimated Time:** 3-4 days

**Files to Create:**
- `app/api/upload/sales/route.ts`
- `app/api/upload/branches/route.ts`
- `lib/upload/parser.ts`
- `lib/upload/validator.ts`

### 3. Background Job System (Priority: High)

**Tasks:**
- [ ] Create job queue system
- [ ] Implement ImportJob tracking
- [ ] Create POST /api/jobs - start import job
- [ ] Create GET /api/jobs/[id] - get job status
- [ ] Implement progress tracking
- [ ] Handle errors and logging
- [ ] Generate aggregates after import

**Estimated Time:** 2-3 days

**Files to Create:**
- `app/api/jobs/route.ts`
- `app/api/jobs/[id]/route.ts`
- `lib/jobs/import-worker.ts`
- `lib/jobs/aggregate-generator.ts`

### 4. Sales Data API (Priority: High)

**Tasks:**
- [ ] Create GET /api/sales - query sales data
- [ ] Implement RBAC middleware
- [ ] Support date range filtering
- [ ] Support category/brand filtering
- [ ] Support aggregation (daily/monthly/yearly)
- [ ] Return summary statistics

**Estimated Time:** 2 days

**Files to Create:**
- `app/api/sales/route.ts`
- `lib/rbac/scope.ts`
- `lib/rbac/middleware.ts`

### 5. Dashboard Data Integration (Priority: High)

**Tasks:**
- [ ] Connect Admin dashboard to real data
- [ ] Connect RM dashboard to real data
- [ ] Connect AM dashboard to real data
- [ ] Connect BM dashboard to real data
- [ ] Connect Staff dashboard to real data
- [ ] Add loading states
- [ ] Add error handling

**Estimated Time:** 2-3 days

**Files to Update:**
- `app/(dashboard)/admin/page.tsx`
- `app/(dashboard)/rm/page.tsx`
- `app/(dashboard)/am/page.tsx`
- `app/(dashboard)/bm/page.tsx`
- `app/(dashboard)/staff/page.tsx`

### 6. Charts & Visualizations (Priority: Medium)

**Tasks:**
- [ ] Create KPICard component
- [ ] Create TrendChart component (line chart)
- [ ] Create BarChart component
- [ ] Create PieChart component
- [ ] Add tooltips and interactions
- [ ] Implement responsive charts

**Estimated Time:** 2-3 days

**Files to Create:**
- `components/charts/KPICard.tsx`
- `components/charts/TrendChart.tsx`
- `components/charts/BarChart.tsx`
- `components/charts/PieChart.tsx`

### 7. Filtering System (Priority: Medium)

**Tasks:**
- [ ] Create DateRangePicker component
- [ ] Create MultiSelect component
- [ ] Create FilterPanel component
- [ ] Implement filter state management
- [ ] Connect filters to API calls
- [ ] Add preset date ranges

**Estimated Time:** 2 days

**Files to Create:**
- `components/filters/DateRangePicker.tsx`
- `components/filters/MultiSelect.tsx`
- `components/filters/FilterPanel.tsx`

### 8. Data Tables (Priority: Medium)

**Tasks:**
- [ ] Create DataTable component
- [ ] Implement sorting
- [ ] Implement pagination
- [ ] Add search functionality
- [ ] Make responsive

**Estimated Time:** 1-2 days

**Files to Create:**
- `components/tables/DataTable.tsx`
- `components/tables/Pagination.tsx`

## 📅 Timeline

### Week 1-2: Core APIs
- User Management API
- File Upload API
- Background Job System

### Week 3: Data Integration
- Sales Data API
- RBAC Implementation
- Dashboard Data Integration

### Week 4: UI Components
- Charts & Visualizations
- Filtering System
- Data Tables

### Week 5: Testing & Polish
- Integration testing
- Bug fixes
- Performance optimization
- Documentation updates

**Total Estimated Time:** 4-5 weeks

## 🔧 Technical Decisions

### File Storage
**Decision:** Use Vercel Blob Storage
**Reason:** 
- Seamless integration with Vercel
- Automatic CDN
- Simple API
- Cost-effective

### Background Jobs
**Decision:** Use Vercel serverless functions
**Reason:**
- No additional infrastructure needed
- Scales automatically
- Simple implementation
- Good for MVP

**Alternative for Production:** Consider Inngest or BullMQ for more complex job management

### Charts Library
**Decision:** Use Recharts
**Reason:**
- React-native
- Good documentation
- Customizable
- Already installed

### State Management
**Decision:** Use React hooks + SWR
**Reason:**
- Simple for MVP
- Built-in caching
- Automatic revalidation
- Good TypeScript support

## 📊 Success Metrics

### Functionality
- [ ] Can upload Excel files successfully
- [ ] Data appears in dashboards
- [ ] Charts display correctly
- [ ] Filters work as expected
- [ ] All roles see appropriate data

### Performance
- [ ] File upload < 30 seconds for 100MB file
- [ ] Dashboard loads < 3 seconds
- [ ] Filter updates < 1 second
- [ ] Charts render < 2 seconds

### User Experience
- [ ] Clear error messages
- [ ] Loading states everywhere
- [ ] Responsive on all devices
- [ ] Intuitive navigation

## 🧪 Testing Strategy

### Unit Tests
- API route handlers
- Data parsers
- Validators
- RBAC logic

### Integration Tests
- File upload flow
- Data import flow
- Dashboard data loading
- Filter application

### E2E Tests
- Complete upload workflow
- Dashboard navigation
- User management workflow

## 📝 Documentation Updates

- [ ] Update README with new features
- [ ] Add API documentation
- [ ] Update deployment guide
- [ ] Create user guide for file upload
- [ ] Document error codes

## 🚀 Deployment Strategy

### Staging
1. Deploy to staging environment
2. Test with sample data
3. Verify all features work
4. Performance testing

### Production
1. Database backup
2. Deploy during low-traffic period
3. Monitor error logs
4. Gradual rollout to users

## 💡 Nice-to-Have (Optional)

- [ ] Real-time progress updates (WebSocket)
- [ ] Email notifications for import completion
- [ ] Bulk user import
- [ ] Export templates
- [ ] Advanced search
- [ ] Saved filters
- [ ] Dashboard customization

## 🔄 After Phase 2

### Phase 3: Custom KPI System
- KPI Builder interface
- KPI calculation engine
- Benchmark visualization
- KPI sharing

### Phase 4: Export & Advanced Features
- Excel/CSV export
- Chart export (PNG/PDF)
- Print-friendly views
- Advanced filtering
- Performance optimization

### Phase 5: Polish & Scale
- Caching strategy
- Database optimization
- Load testing
- Security audit
- User feedback implementation

## 📞 Questions to Resolve

1. **File Size Limits:** Confirm 300MB is acceptable for production
2. **Data Retention:** How long to keep imported files?
3. **Error Handling:** What happens to failed imports?
4. **Notifications:** Email or in-app notifications?
5. **Permissions:** Who can delete users? Who can delete data?

## 🎯 Definition of Done

Phase 2 is complete when:
- [ ] All high-priority features implemented
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] User acceptance testing passed
- [ ] Performance metrics met
- [ ] No critical bugs
- [ ] Code reviewed and approved

## 📈 Next Meeting Agenda

1. Demo Phase 1 (MVP)
2. Review Phase 2 plan
3. Prioritize features
4. Assign tasks
5. Set deadlines
6. Discuss technical decisions
7. Address questions

---

**Ready to start Phase 2?** 🚀

Review this plan, adjust priorities, and let's build the next iteration!
