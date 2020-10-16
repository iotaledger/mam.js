export interface IResponse {
    /**
     * A message for the response.
     */
    error?: string;

    /**
     * Alternative response code.
     */
    status?: number;

    /**
     * Additional response headers.
     */
    headers?: { [id: string]: string };
}
