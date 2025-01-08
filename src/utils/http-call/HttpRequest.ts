interface HttpResponse<T> {
  json: T;
  status: number;
  responseHeaders: Headers;
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
    | null; // Allow various body types (JSON, FormData, etc.)
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

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Error parsing response" }));
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || response.statusText
        }`
      );
    }

    const jsonData = (await response.json()) as T;

    return {
      json: jsonData,
      status: response.status,
      responseHeaders: response.headers,
    };
  } catch (error) {
    console.error("Error during HTTP request:", error);
    return {
      json: {} as T,
      status: 500,
      responseHeaders: new Headers(),
    };
  }
}

export default sendHttpRequest;
