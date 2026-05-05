import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as schema from '../../db/schema';

export const DRIZZLE = 'DRIZZLE';

export const databaseProvider = {
  provide: DRIZZLE,
  useFactory: () => {
    // We use 'pg' (node-postgres) as it handles connection pooling 
    // for enterprise apps much better than standard scripts.
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Supabase/AWS requires SSL for external connections
      ssl: {
        rejectUnauthorized: false,
      },
      max: 20, // Max number of concurrent connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    return drizzle(pool, { schema });
  },
};