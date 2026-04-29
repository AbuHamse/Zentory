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
    const dataPath = path.join(__dirname, '../../public');

    // --- 1. SEED WAREHOUSE USERS ---
    const userData = JSON.parse(fs.readFileSync(path.join(dataPath, 'warehouse-users.json'), 'utf-8'));
    console.log(`👤 Processing ${userData.length} Staff Records...`);
    
    for (const chunk of chunkArray(userData, 100)) {
      await db.insert(schema.warehouseUsers).values(chunk).onConflictDoNothing();
    }

    // --- 2. SEED SHIPMENTS (The Router) ---
    const shipmentData = JSON.parse(fs.readFileSync(path.join(dataPath, 'shippments.json'), 'utf-8'));
    console.log(`🚚 Routing ${shipmentData.length} Shipment Records...`);

    const inbound = shipmentData.filter((s: any) => s.type === 'INBOUND').map((s: any) => ({
      id: s.id,
      carrier: s.carrier,
      status: s.status.toUpperCase(),
      eta: new Date(s.eta),
      dockDoor: 'PENDING', // Defaulting as not in JSON
      manifest: [], // Defaulting empty array
      trailerId: s.tracking // Using tracking as fallback
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

    console.log('✅ Phase 1 Seeding Complete.');
  } catch (error) {
    console.error('❌ Seed Error:', error);
  } finally {
    await pool.end();
  }
}

// --- 3. RETURNS ---
    const returnsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'returns.json'), 'utf-8'));
    console.log('🔄 Seeding Returns...');
    const mappedReturns = returnsData.map((r: any) => ({
      ...r,
      dateReceived: new Date(r.dateReceived)
    }));
    for (const chunk of chunkArray(mappedReturns, 100)) {
      await db.insert(schema.returns).values(chunk).onConflictDoNothing();
    }

    console.log('✅ Seeding Phase Complete!');
  } catch (error) {
    console.error('❌ Seed Failed:', error);
  } finally {
    await pool.end();
  }
}

seed();