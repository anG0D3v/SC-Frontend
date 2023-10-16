const Endpoint = (prefix) => (endpoint) => prefix + endpoint;

const AdminEndpoints = Endpoint('/api/admin/');
const AuthEndpoints = Endpoint('/api/auth/');
const PublicEndpoints = Endpoint('/api/public/');

export { AdminEndpoints, AuthEndpoints, PublicEndpoints };
