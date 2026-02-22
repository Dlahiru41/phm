/**
 * API client for NCVMS backend. Uses relative /api/v1 so requests go through
 * the same origin (Vite proxy in dev, BFF in production) – backend URL is never exposed to the client.
 */
const BASE = '/api/v1';

function getToken(): string | null {
  return sessionStorage.getItem('token');
}

export interface ApiError {
  code?: string;
  message: string;
  details?: Array<{ field?: string; message?: string }>;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let body: any = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      // ignore
    }
  }

  if (!res.ok) {
    const message =
      (body?.error?.message) ||
      (Array.isArray(body?.error?.details) && body.error.details[0]?.message) ||
      text ||
      `Request failed (${res.status})`;
    const err: ApiError = { message, code: body?.error?.code, details: body?.error?.details };
    if (res.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('userRole');
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    throw err;
  }

  return body !== null && body !== '' ? (body as T) : (undefined as T);
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { params?: Record<string, string> } = {}
): Promise<T> {
  const { params, ...rest } = options;
  let url = path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  if (params && Object.keys(params).length > 0) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== '' && v !== undefined) search.set(k, v);
    });
    const q = search.toString();
    if (q) url += (url.includes('?') ? '&' : '?') + q;
  }
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((rest.headers as Record<string, string>) || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...rest, headers });
  return handleResponse<T>(res);
}

export const api = {
  get: <T>(path: string, params?: Record<string, string>) =>
    apiRequest<T>(path, { method: 'GET', params }),
  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
};
