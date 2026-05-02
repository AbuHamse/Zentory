// --- 👤 Identity & CRM ---
export * from './identity/users.schema';
export * from './identity/warehouse_users.schema';
export * from './identity/operators.schema';
export * from './identity/customers.schema';
export * from './identity/customer_overviews.schema';

// --- 🚚 Logistics & Supply Chain ---
export * from './logistics/inventory.schema';
export * from './logistics/inbound_shipments.schema';
export * from './logistics/outbound_shipments.schema';
export * from './logistics/orders.schema';
export * from './logistics/logistics_meta.schema';
export * from './logistics/payees.schema';
export * from './logistics/returns.schema';

// --- 📈 Business Intelligence & Audit ---
export * from './intelligence/transactions.schema';
export * from './intelligence/alerts.schema';
export * from './intelligence/complaints.schema';
export * from './intelligence/feedback_reports.schema';
export * from './intelligence/report_summaries.schema';
export * from './intelligence/business_state.schema';
export * from './intelligence/product_reports.schema';
export * from './intelligence/report_configs.schema';
export * from './intelligence/time_period_reports.schema';
export * from './intelligence/trend_data.schema';