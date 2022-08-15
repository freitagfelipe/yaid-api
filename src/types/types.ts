export interface Result {
    count: number;
    urls: string[];
}

export interface APIError {
    statusCode: number;
    message: string;
}

export interface APICheckResult {
    failed: boolean;
    error?: APIError;
}
