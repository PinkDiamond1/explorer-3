import fetch from "node-fetch";

/**
 * Fetch from an endpoint.
 */
export class FetchHelper {
    /**
     * Fetch a payload from an endpoint.
     * @param baseUrl The base url for the api.
     * @param path The path for the endpoint.
     * @param method The method to send the request with.
     * @param payload The payload to send.
     * @param headers The headers to include in the fetch.
     * @param timeout Timeout for the request.
     * @returns The fetched payload.
     */
    public static async json<T, U>(
        baseUrl: string,
        path: string,
        method: "get" | "post" | "put" | "delete",
        payload?: T,
        headers?: { [id: string]: string },
        timeout?: number
    ): Promise<U> {
        let fullUrl = baseUrl;
        if (fullUrl.startsWith("/")) {
            fullUrl = fullUrl.slice(0, -1);
        }
        if (!path.startsWith("/")) {
            fullUrl += "/";
        }
        fullUrl += path;

        headers = headers ?? {};
        headers["Content-Type"] = "application/json";

        let controller: AbortController | undefined;
        let timerId: NodeJS.Timeout | undefined;

        if (timeout !== undefined) {
            controller = new AbortController();
            timerId = setTimeout(
                () => {
                    if (controller) {
                        controller.abort();
                    }
                },
                timeout);
        }

        try {
            const res = await fetch(
                fullUrl,
                {
                    method,
                    headers,
                    body: payload ? JSON.stringify(payload) : undefined,
                    signal: controller ? controller.signal : undefined
                });

            const json = await res.json();
            return json as U;
        } catch (err) {
            if (err.name === "AbortError") {
                throw new Error("Timeout");
            } else {
                throw err;
            }
        } finally {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }
}
