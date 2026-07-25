const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.message || (
      Array.isArray(data.errors)
        ? data.errors.map((error) => error.msg || error.message).join(', ')
        : 'Request failed'
    );
    throw new Error(errorMessage);
  }

  return data;
};

export const authApi = {
  register: (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getMe: () => request('/auth/me'),
  updateProfile: (payload) => request('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
};

export const directoryApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/directory${query ? `?${query}` : ''}`);
  }
};

export const eventsApi = {
  getAll: () => request('/events'),
  rsvp: (id) => request(`/events/${id}/rsvp`, { method: 'POST' })
};

export const jobsApi = {
  getAll: () => request('/jobs')
};

export const mentorshipApi = {
  getAll: () => request('/mentorship'),
  requestMentorship: (id) => request(`/mentorship/${id}/request`, { method: 'POST' })
};
