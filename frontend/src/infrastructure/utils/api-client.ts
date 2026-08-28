const DEFAULT_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? DEFAULT_BASE_URL;
  }

  private async buildHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "GET",
      headers: await this.buildHeaders(),
    });
    return this.handleResponse<T>(response);
  }


  async post<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "POST",
      headers: await this.buildHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "PUT",
      headers: await this.buildHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "PATCH",
      headers: await this.buildHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "DELETE",
      headers: await this.buildHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
