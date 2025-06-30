import type { PgSchema, PgTableWithColumns } from "drizzle-orm/pg-core";
import type { Relations } from "drizzle-orm";
import { Pool } from "pg";
export declare function getDatabaseConnectionHandler<T extends Record<string, PgTableWithColumns<any> | PgSchema | Relations>>({ schema, databaseConfig, dev, }: {
    schema: T;
    databaseConfig: {
        database: string;
        secretArn: string;
        resourceArn: string;
    };
    dev?: {
        connectionString?: string;
        developmentMode: boolean;
    };
}): (dbName?: string) => (import("drizzle-orm/aws-data-api/pg").AwsDataApiPgDatabase<T> & {
    $client: import("@aws-sdk/client-rds-data").RDSDataClient;
}) | (import("drizzle-orm/node-postgres").NodePgDatabase<T> & {
    $client: Pool;
});
