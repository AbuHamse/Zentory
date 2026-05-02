import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from './schema';

dotenv.config();

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});
const db = drizzle(pool, { schema });

// Helper: Breaks large arrays into smaller chunks for Supabase
const chunkArray = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

async function seed() {
  console.log('🌱 Zentory Bulk Seed Initializing...');

  try {
    const dataPath = path.join(__dirname, '../../../client/public/data');

    // --- 1. SEED WAREHOUSE USERS ---
    const userData = JSON.parse(fs.readFileSync(path.join(dataPath, 'warehouse-users.json'), 'utf-8'));
    console.log(`👤 Processing ${userData.length} Staff Records...`);
    
    for (const chunk of chunkArray(userData, 100)) {
      await db.insert(schema.warehouseUsers).values(chunk).onConflictDoNothing();
    }

    // --- 2. SEED CUSTOMERS ---
    // Primary table for Customer Overviews
    const customersData = JSON.parse(fs.readFileSync(path.join(dataPath, 'customers.json'), 'utf-8'));
    console.log(`🏢 Seeding ${customersData.length} Customers...`);
    const mappedCustomers = customersData.map((c: any) => ({
      ...c,
      joinDate: new Date(c.joinDate)
    }));
    for (const chunk of chunkArray(mappedCustomers, 100)) {
      await db.insert(schema.customers).values(chunk).onConflictDoNothing();
    }

    // --- 3. SEED SHIPMENTS (The Router) ---
    const shipmentData = JSON.parse(fs.readFileSync(path.join(dataPath, 'shippments.json'), 'utf-8'));
    console.log(`🚚 Routing ${shipmentData.length} Shipment Records...`);

    const inbound = shipmentData.filter((s: any) => s.type === 'INBOUND').map((s: any) => ({
      id: s.id,
      carrier: s.carrier,
      status: s.status.toUpperCase(),
      eta: new Date(s.eta),
      dockDoor: 'PENDING',
      manifest: [],
      trailerId: s.tracking
    }));

    const outbound = shipmentData.filter((s: any) => s.type === 'OUTBOUND').map((s: any) => ({
      id: s.id,
      carrier: s.carrier,
      status: s.status.toUpperCase(),
      scheduledDeparture: new Date(s.eta),
      dockDoor: 'PENDING',
      manifest: [],
      trailerId: s.tracking
    }));

    for (const chunk of chunkArray(inbound, 100)) {
      await db.insert(schema.inboundShipments).values(chunk).onConflictDoNothing();
    }
    for (const chunk of chunkArray(outbound, 100)) {
      await db.insert(schema.outboundShipments).values(chunk).onConflictDoNothing();
    }

    // --- 4. RETURNS ---
    const returnsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'returns.json'), 'utf-8'));
    console.log('🔄 Seeding Returns...');
    const mappedReturns = returnsData.map((r: any) => ({
      ...r,
      dateReceived: new Date(r.dateReceived)
    }));
    for (const chunk of chunkArray(mappedReturns, 100)) {
      await db.insert(schema.returns).values(chunk).onConflictDoNothing();
    }

    // --- 5. BUSINESS INTELLIGENCE (Composite File) ---
    const businessData = JSON.parse(fs.readFileSync(path.join(dataPath, 'business-summary.json'), 'utf-8'));
    console.log('📊 Seeding Business Intelligence & State...');

    if (businessData.ZentoryBusinessState) {
      const mappedState = businessData.ZentoryBusinessState.map((s: any) => ({
        lastUpdated: new Date(s.lastUpdated),
        activeStorageUtilization: s.activeStorageUtilization ?? 0,
        summary: s.summary,
        insights: s.insights || []
      }));
      
      for (const chunk of chunkArray(mappedState, 50)) {
        await db.insert(schema.zentoryBusinessState).values(chunk).onConflictDoNothing();
      }
    }

    if (businessData.ReportSummary) {
      for (const chunk of chunkArray(businessData.ReportSummary, 50)) {
        await db.insert(schema.reportSummaries).values(chunk).onConflictDoNothing();
      }
    }

    // --- 6. CUSTOMER OVERVIEWS (Identity) ---
    const customerOverviewData = JSON.parse(
      fs.readFileSync(path.join(dataPath, 'customeroverviews.json'), 'utf-8')
    );
    console.log(`👤 Seeding ${customerOverviewData.length} Customer Overview records...`);

    const mappedOverviews = customerOverviewData.map((co: any) => ({
      ...co,
      behavior: {
        ...co.behavior,
        lastOrderDate: co.behavior.lastOrderDate 
      }
    }));

    for (const chunk of chunkArray(mappedOverviews, 100)) {
      await db.insert(schema.customerOverviews).values(chunk).onConflictDoNothing();
    }

    // --- 7. SEED INVENTORY ---
    const inventoryData = JSON.parse(
      fs.readFileSync(path.join(dataPath, 'inventory.json'), 'utf-8')
    );
    console.log(`📦 Seeding ${inventoryData.length} Inventory Items...`);

    const mappedInventory = inventoryData.map((item: any) => ({
      ...item,
      lastCounted: item.lastCounted ? new Date(item.lastCounted) : null
    }));

    for (const chunk of chunkArray(mappedInventory, 100)) {
      await db.insert(schema.inventory).values(chunk).onConflictDoNothing();
    }

    // --- 8. MONTHLY TRENDS (Intelligence Composite) ---
    const trendsFile = path.join(dataPath, 'monthly-trends.json');
    if (fs.existsSync(trendsFile)) {
      const trendsData = JSON.parse(fs.readFileSync(trendsFile, 'utf-8'));
      console.log('📈 Seeding Monthly Trends & Period Reports...');

      // A. Time Period Reports
      if (trendsData.TimePeriodReport) {
        for (const chunk of chunkArray(trendsData.TimePeriodReport, 50)) {
          await db.insert(schema.timePeriodReports).values(chunk).onConflictDoNothing();
        }
      }

      // B. Trend Data
      if (trendsData.TrendData) {
        for (const chunk of chunkArray(trendsData.TrendData, 50)) {
          await db.insert(schema.trendData).values(chunk).onConflictDoNothing();
        }
      }
    }

    console.log('✅ Zentory Database Seeded Successfully!');
  } catch (error) {
    console.error('❌ Seed Failed:', error);
  } finally {
    await pool.end();
  }
}

seed();