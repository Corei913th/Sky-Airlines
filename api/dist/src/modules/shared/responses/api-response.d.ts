export declare class ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    warning?: string;
    timestamp: string;
    constructor(success: boolean, message?: string, data?: T, warning?: string);
    static success<T>(data?: T, message?: string, warning?: string): ApiResponse<T>;
    static error<T>(message: string, data?: T): ApiResponse<T>;
}
