import { ApiProperty } from '@nestjs/swagger';

/**
 * Uniform API Response structure for consistent communication with consumers.
 */
export class ApiResponse<T> {
  @ApiProperty({ example: true, description: 'Operation success status' })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully', required: false })
  message?: string;

  @ApiProperty({ description: 'The payload of the response', required: false })
  data?: T;

  @ApiProperty({ example: 'Optional warning for non-fatal issues', required: false })
  warning?: string;

  @ApiProperty({ example: '2023-10-01T12:00:00.000Z' })
  timestamp: string;

  constructor(success: boolean, message?: string, data?: T, warning?: string) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.warning = warning;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Helper to create a success response.
   */
  static success<T>(data?: T, message?: string, warning?: string): ApiResponse<T> {
    return new ApiResponse(true, message, data, warning);
  }

  /**
   * Helper to create an error response.
   * Note: Exceptions are usually handled by global filter, but this can be used for manual returns.
   */
  static error<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(false, message, data);
  }
}
