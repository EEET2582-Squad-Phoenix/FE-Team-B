interface HttpResponse<T> {
  json: T;
  status: number;
  responseHeaders: Headers;
  error?: string;
}

interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?:
    | string
    | FormData
    | Blob
    | ArrayBuffer
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  headers?: HeadersInit;
}

async function sendHttpRequest<T>(
  url: string,
  options?: HttpRequestOptions
): Promise<HttpResponse<T | object>> {
  const defaultOptions: HttpRequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, {
      method: mergedOptions.method,
      body: mergedOptions.body,
      headers: mergedOptions.headers,
    });

    let jsonData: T | object;

    try {
      // Attempt to parse JSON response
      jsonData = await response.json();
    } catch {
      // If JSON parsing fails, return a structured error response
      return {
        json: {} as T,
        status: response.status,
        responseHeaders: response.headers,
        error: `Failed to parse response: ${response.statusText}`,
      };
    }

    if (!response.ok) {
      // Return structured error response for non-200 status codes
      return {
        json: jsonData,
        status: response.status,
        responseHeaders: response.headers,
        error:
          (jsonData as { message?: string })?.message || response.statusText,
      };
    }

    // Success case
    return {
      json: jsonData as T,
      status: response.status,
      responseHeaders: response.headers,
    };
  } catch (error) {
    // Network or other errors
    return {
      json: {} as T,
      status: 500,
      responseHeaders: new Headers(),
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export default sendHttpRequest;
