import 'dotenv/config'
import { WebSocket } from 'ws'
import { neon, neonConfig } from '@neondatabase/serverless'

neonConfig.webSocketConstructor = WebSocket
neonConfig.poolQueryViaFetch = true

async function prepare() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment variable not found.')
  const sql = neon(process.env.DATABASE_URL)
  await Promise.all([
    sql`CREATE TABLE IF NOT EXISTS nodes (id TEXT PRIMARY KEY, expiry TIMESTAMP WITHOUT TIME ZONE NOT NULL);`,
    sql`CREATE TABLE IF NOT EXISTS outbox (sequence_id  serial PRIMARY KEY, mutation_id  TEXT NOT NULL, channel TEXT NOT NULL, name TEXT NOT NULL, rejected boolean NOT NULL DEFAULT false, data JSONB, headers JSONB, locked_by TEXT, lock_expiry TIMESTAMP WITHOUT TIME ZONE, processed BOOLEAN NOT NULL DEFAULT false);`,
  ])
  await sql`CREATE OR REPLACE FUNCTION public.outbox_notify() RETURNS trigger AS $$ BEGIN PERFORM pg_notify('ably_adbc'::text, ''::text); RETURN NULL; EXCEPTION WHEN others THEN RAISE WARNING 'unexpected error in %s: %%', SQLERRM; RETURN NULL; END; $$ LANGUAGE plpgsql;`
  await sql`CREATE OR REPLACE TRIGGER public_outbox_trigger AFTER INSERT ON public.outbox FOR EACH STATEMENT EXECUTE PROCEDURE public.outbox_notify();`
  console.log('Database schema set up succesfully.')
}

prepare()
