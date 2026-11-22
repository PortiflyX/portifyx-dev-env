// Database initialization script for PortifyX Database-per-Service Architecture

// 1. Database: portifyx_portfolio
print("--> Initializing database: portifyx_portfolio");
db = db.getSiblingDB('portifyx_portfolio');

db.createCollection('user_portfolios');
db.user_portfolios.createIndex({ user_id: 1 }, { unique: true });

db.createCollection('holding_snapshots');
db.holding_snapshots.createIndex({ user_id: 1, created_at: -1 });

db.createCollection('daily_balances');
db.daily_balances.createIndex({ user_id: 1, date: -1 }, { unique: true });

// Seed initial demo portfolio
db.user_portfolios.updateOne(
  { user_id: "user_demo" },
  {
    $set: {
      user_id: "user_demo",
      total_net_worth_thb: "2078600.00",
      total_net_worth_usd: "59388.60",
      change_24h_percent: "4.25",
      change_24h_thb: "92540.00",
      holdings: [
        {
          exchange: "Bitkub",
          asset: "BTC",
          amount: "0.45280000",
          price_thb: "3250000.00",
          price_usd: "92850.00",
          value_thb: "1471600.00",
          value_usd: "42042.48"
        },
        {
          exchange: "Bitkub",
          asset: "THB",
          amount: "154200.00",
          price_thb: "1.00",
          price_usd: "0.0285",
          value_thb: "154200.00",
          value_usd: "4394.70"
        },
        {
          exchange: "Binance",
          asset: "ETH",
          amount: "3.85000000",
          price_thb: "118000.00",
          price_usd: "3370.00",
          value_thb: "454300.00",
          value_usd: "12974.50"
        },
        {
          exchange: "Binance",
          asset: "SOL",
          amount: "24.50000000",
          price_thb: "6400.00",
          price_usd: "182.00",
          value_thb: "156800.00",
          value_usd: "4459.00"
        }
      ],
      allocations: [
        { asset: "BTC", percentage: "70.80", value_thb: "1471600.00" },
        { asset: "ETH", percentage: "21.85", value_thb: "454300.00" },
        { asset: "SOL", percentage: "7.54", value_thb: "156800.00" },
        { asset: "THB", percentage: "7.42", value_thb: "154200.00" }
      ],
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  { upsert: true }
);

// 2. Database: portifyx_exchange
print("--> Initializing database: portifyx_exchange");
db = db.getSiblingDB('portifyx_exchange');
db.createCollection('connected_exchanges');
db.connected_exchanges.createIndex({ user_id: 1, exchange_id: 1 });
db.createCollection('exchange_credentials_encrypted');
db.exchange_credentials_encrypted.createIndex({ connection_id: 1 }, { unique: true });
db.createCollection('connection_audit_logs');
db.connection_audit_logs.createIndex({ connection_id: 1, timestamp: -1 });

// 3. Database: portifyx_marketdata
print("--> Initializing database: portifyx_marketdata");
db = db.getSiblingDB('portifyx_marketdata');
db.createCollection('crypto_tickers');
db.crypto_tickers.createIndex({ symbol: 1 }, { unique: true });
db.createCollection('forex_rates');
db.forex_rates.createIndex({ currency_pair: 1 }, { unique: true });
db.createCollection('price_candles');
db.price_candles.createIndex({ symbol: 1, interval: 1, timestamp: -1 });

// 4. Database: portifyx_sync
print("--> Initializing database: portifyx_sync");
db = db.getSiblingDB('portifyx_sync');
db.createCollection('sync_jobs');
db.sync_jobs.createIndex({ job_id: 1 }, { unique: true });
db.createCollection('sync_checkpoints');
db.sync_checkpoints.createIndex({ user_id: 1, exchange: 1 });
db.createCollection('sync_failures_dlq');
db.sync_failures_dlq.createIndex({ status: 1, created_at: -1 });

print("--> Successfully initialized all PortifyX databases and indexes.");
