/**
 * Verify GET /children API with auth.
 * Run: node scripts/verify-children-api.js [baseUrl] [username] [password]
 * Example: node scripts/verify-children-api.js http://localhost:8080/api/v1 dlahiru412@outlook.com dilshan123
 */
const baseUrl = process.argv[2] || 'http://localhost:8080/api/v1';
const username = process.argv[3] || 'dlahiru412@outlook.com';
const password = process.argv[4] || 'dilshan123';

async function request(method, path, body = null, token = null) {
  const url = path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const text = await res.text();
  let data = null;
  if (text) try { data = JSON.parse(text); } catch (_) {}
  if (!res.ok) throw { status: res.status, data };
  return data;
}

async function main() {
  console.log('Base URL:', baseUrl);
  console.log('Login:', username, '***\n');

  const loginRes = await request('POST', '/auth/login', { usernameOrEmail: username, password });
  const token = loginRes?.token;
  if (!token) {
    console.error('Login failed: no token');
    process.exit(1);
  }
  const phmId = loginRes?.user?.phmId || loginRes?.user?.userId;
  console.log('1. Login OK. User:', loginRes?.user?.name, '| userId/phmId:', phmId);

  console.log('\n2. GET /children?page=1&limit=20 (no phmId) – may require MOH:');
  try {
    const r1 = await request('GET', '/children?page=1&limit=20', null, token);
    console.log('   Response:', JSON.stringify(r1, null, 2).split('\n').slice(0, 15).join('\n'));
  } catch (e) {
    console.log('   Status:', e.status, '|', e.data?.error?.message || e.data?.error?.code || '');
  }

  console.log('\n3. GET /children?registeredBy=...&page=1&limit=20:');
  try {
    const r2 = await request('GET', '/children?registeredBy=' + encodeURIComponent(phmId) + '&page=1&limit=20', null, token);
    const total = r2?.total ?? (Array.isArray(r2) ? r2.length : (r2?.data?.length ?? 0));
    const data = r2?.data ?? (Array.isArray(r2) ? r2 : []);
    console.log('   total:', total, '| data length:', Array.isArray(data) ? data.length : (data ? 1 : 0));
    if (Array.isArray(data) && data.length > 0) {
      console.log('   First child:', data[0]?.firstName, data[0]?.lastName, '|', data[0]?.registrationNumber);
    } else {
      console.log('   (no children for this user)');
    }
  } catch (e) {
    console.log('   Status:', e.status, '|', e.data?.error?.message || '');
  }

  console.log('\nDone.');
}

main().catch((err) => { console.error(err); process.exit(1); });
