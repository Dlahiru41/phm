/**
 * Verify API calls against localhost:8080 (login, register child, list children).
 * Run: node scripts/verify-api.js [baseUrl] [username] [password]
 * Default: baseUrl=http://localhost:8080/api/v1, username=dlahiru412@outlook.com, password=dilshan123
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
  console.log('API base:', baseUrl);
  console.log('Login:', username, '***\n');

  let token, loginRes;
  try {
    loginRes = await request('POST', '/auth/login', { usernameOrEmail: username, password });
    token = loginRes?.token;
    if (!token) throw new Error('No token in response');
    console.log('1. Login: OK');
    console.log('   User:', loginRes?.user?.name || loginRes?.user?.email, '| Role:', loginRes?.user?.role);
    if (loginRes?.user?.phmId) console.log('   PHM ID:', loginRes.user.phmId);
    if (loginRes?.user?.userId) console.log('   User ID:', loginRes.user.userId);
  } catch (e) {
    if (e.status === 401) console.log('1. Login: FAILED (401)', e.data?.error?.message || 'Invalid credentials');
    else console.log('1. Login: FAILED', e.status || e.message, e.data || '');
    process.exit(1);
  }

  const phmIdForList = loginRes?.user?.phmId || loginRes?.user?.userId || 'phm-001';
  const areaCode = loginRes?.user?.areaCode;

  let childId, registrationNumber;
  try {
    const registerBody = {
      firstName: 'API',
      lastName: 'Verify',
      dateOfBirth: '2024-01-15',
      gender: 'male',
      birthWeight: 3.0,
      birthHeight: 49.0,
      motherName: 'Test Mother',
      motherNIC: '999999999V',
      fatherName: 'Test Father',
      fatherNIC: '888888888V',
      district: 'Colombo',
      dsDivision: 'Colombo West',
      gnDivision: 'Colombo 01',
      address: '123 Test St',
      phmId: phmIdForList,
      ...(areaCode && { areaCode }),
    };
    const regRes = await request('POST', '/children', registerBody, token);
    registrationNumber = regRes?.registrationNumber ?? regRes?.registration_number;
    childId = regRes?.childId ?? regRes?.child_id;
    if (!registrationNumber) throw new Error('No registrationNumber in response');
    console.log('2. Register child: OK');
    console.log('   Registration #:', registrationNumber);
    console.log('   Child ID:', childId || '(not returned)');
  } catch (e) {
    if (e.status) console.log('2. Register child: FAILED', e.status, e.data?.error?.message || e.data || '');
    else console.log('2. Register child: FAILED', e.message);
  }

  if (childId) {
    try {
      const one = await request('GET', '/children/' + encodeURIComponent(childId), null, token);
      console.log('2b. GET child by ID: OK', one?.firstName, one?.lastName);
    } catch (e) {
      if (e.status) console.log('2b. GET child by ID: FAILED', e.status);
    }
  }

  try {
    const listPath = '/children?phmId=' + encodeURIComponent(phmIdForList) + '&page=1&limit=10';
    const listRes = await request('GET', listPath, null, token);
    const arr = Array.isArray(listRes) ? listRes : listRes?.data;
    const total = typeof listRes?.total === 'number' ? listRes.total : (arr?.length ?? 0);
    console.log('3. GET children (PHM area): OK');
    console.log('   Total:', total);
    if (Array.isArray(arr) && arr.length > 0) {
      const first = arr[0];
      console.log('   First child:', first?.firstName, first?.lastName, '| Reg#:', first?.registrationNumber);
    }
  } catch (e) {
    if (e.status) console.log('3. GET children: FAILED', e.status, e.data?.error?.message || e.data || '');
    else console.log('3. GET children: FAILED', e.message);
  }

  console.log('\nDone.');
}

main().catch((err) => { console.error(err); process.exit(1); });
