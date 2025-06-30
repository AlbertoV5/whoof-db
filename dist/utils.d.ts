export declare const withAuroraRetry: <T>(operation: () => Promise<T>, context?: string) => Promise<T>;
export declare const executeWithRetry: <T>(queryOperation: () => Promise<T>, operationName?: string) => Promise<T>;
