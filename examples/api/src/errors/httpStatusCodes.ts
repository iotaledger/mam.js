/**
 * Class to categorize http status codes.
 */
export class HttpStatusCodes {
    /**
     * Success.
     */
    public static SUCCESS: number = 200;

    /**
     * Created.
     */
    public static CREATED: number = 201;

    /**
     * Bad Request error code.
     */
    public static BAD_REQUEST: number = 400;

    /**
     * Unauthorized error code.
     */
    public static UNAUTHORIZED: number = 401;

    /**
     * Forbidden error code.
     */
    public static FORBIDDEN: number = 403;

    /**
     * Not found error code.
     */
    public static NOT_FOUND: number = 404;

    /**
     * Conflict error code.
     */
    public static CONFLICT: number = 409;

    /**
     * Unprocessable Entity error code.
     */
    public static UNPROCESSABLE_ENTITY: number = 422;

    /**
     * Service unavailable error code.
     */
    public static SERVICE_UNAVAILABLE: number = 503;
}
