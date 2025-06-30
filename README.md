# Whop Applications Framework - Database

Database utilities and connection management for Whop applications using AWS RDS Data API and Drizzle ORM.

## Features

- 🚀 **AWS RDS Data API** integration with Drizzle ORM
- 🔄 **Connection pooling** for development with node-postgres
- 🛡️ **Automatic retry logic** for Aurora Serverless
- 🔧 **Development/Production** mode switching
- 📦 **TypeScript** support with full type safety
- 🔌 **Flexible schema** support

## Usage

### Basic Setup

```ts
import { getDatabasePoolHandler, rdsClient } from '@whoof/database'
import * as schema from './your-schema'

// Configure database connection
const dbPool = getDatabasePoolHandler({
  schema,
  databaseConfig: {
    database: 'your-database-name',
    secretArn: 'arn:aws:secretsmanager:region:account:secret:name',
    resourceArn: 'arn:aws:rds:region:account:cluster:cluster-name'
  },
  dev: {
    developmentMode: process.env.NODE_ENV === 'development',
    connectionString: process.env.DATABASE_URL // for development
  }
})

// Use the database
const result = await dbPool(async (db) => {
  return await db.select().from(schema.users)
})
```

### Production (AWS RDS Data API)

```ts
import { getDatabasePoolHandler } from '@whoof/database'

const dbPool = getDatabasePoolHandler({
  schema: yourSchema,
  databaseConfig: {
    database: process.env.DB_NAME,
    secretArn: process.env.DB_SECRET_ARN,
    resourceArn: process.env.DB_CLUSTER_ARN
  },
  dev: {
    developmentMode: false
  }
})

// Execute queries
const users = await dbPool(async (db) => {
  return await db.select().from(schema.users).limit(10)
})
```

### Development (Local PostgreSQL)

```ts
const dbPool = getDatabasePoolHandler({
  schema: yourSchema,
  databaseConfig: {
    database: 'local-db',
    secretArn: '', // not used in dev mode
    resourceArn: '' // not used in dev mode
  },
  dev: {
    developmentMode: true,
    connectionString: 'postgresql://user:password@localhost:5432/dbname'
  }
})
```

### Database Migrations

```ts
import { migrate } from '@whoof/database'

// Run migrations
await migrate({
  migrationsFolder: './migrations',
  // ... other migration config
})
```

## API Reference

### `getDatabasePoolHandler<T>(options)`

Creates a database connection pool handler with automatic retry logic.

**Parameters:**
- `schema`: Drizzle schema object
- `databaseConfig`: AWS RDS configuration
  - `database`: Database name
  - `secretArn`: AWS Secrets Manager ARN
  - `resourceArn`: AWS RDS cluster ARN
- `dev`: Development configuration
  - `developmentMode`: Boolean to enable local development
  - `connectionString`: PostgreSQL connection string (required in dev mode)

**Returns:** Database pool handler function

### `rdsClient`

Pre-configured AWS RDS Data API client.

### `withAuroraRetry(fn, context)`

Utility function that wraps database operations with retry logic for Aurora Serverless.

## Environment Variables

### Production
```env
DB_NAME=your-database-name
DB_SECRET_ARN=arn:aws:secretsmanager:region:account:secret:name
DB_CLUSTER_ARN=arn:aws:rds:region:account:cluster:cluster-name
```

### Development
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

To build:

```bash
bun run build
```

To check types:

```bash
bun run typecheck
```

## License

MIT

---

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
