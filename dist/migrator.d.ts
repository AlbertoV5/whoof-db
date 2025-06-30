import type { PgSchema, PgTableWithColumns } from "drizzle-orm/pg-core";
import { Relations } from "drizzle-orm";
export declare function getMigratorHandler<T extends Record<string, PgTableWithColumns<any> | PgSchema | Relations>>({ schema, operationalDatabase, databaseConfig, }: {
    schema: T;
    operationalDatabase: string;
    databaseConfig: {
        database: string;
        secretArn: string;
        resourceArn: string;
    };
}): () => Promise<{
    statusCode: number;
    body: string;
}>;
