import { AwsDataApiPgDatabase } from "drizzle-orm/aws-data-api/pg";
import type { DrizzleAwsDataApiPgConfig } from "drizzle-orm/aws-data-api/pg/driver";
import type { PgSchema, PgTableWithColumns } from "drizzle-orm/pg-core";
import type { Relations } from "drizzle-orm";
export declare function getDatabasePoolHandler<T extends Record<string, PgTableWithColumns<any> | PgSchema | Relations>>({ schema, databaseConfig, dev, }: {
    schema: T;
    databaseConfig: {
        database: string;
        secretArn: string;
        resourceArn: string;
    } & DrizzleAwsDataApiPgConfig<T>;
    dev: {
        connectionString?: string;
        developmentMode: boolean;
    };
}): <Action extends (client: AwsDataApiPgDatabase<T>) => Promise<unknown>>(action: Action) => Promise<Awaited<ReturnType<Action>>>;
