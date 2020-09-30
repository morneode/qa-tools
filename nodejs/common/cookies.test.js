const {
  parseUIDFromCookies,
  tamperWithCookie,
  editSpecificCookieEntry,
  cutOutFirstPartOfCookie
} = require('./cookies');
const { assert } = require('./assert');
const testCookie = [
  {
    name: 'sessionId',
    value: 'b445d9af-d8e3-4112-b9fc-daeb064a21c6',
    path: '/',
    domain: '.companyx.com',
    secure: true,
    httpOnly: true
  },
  {
    name: 'companysess',
    value:
      'deadbeef-somkey=somevalue&userid=5f1543f199b73d1c53b943c6&csg=false',
    path: '/',
    domain: 'companyy.com',
    secure: true,
    httpOnly: true
  }
];

assert(
  parseUIDFromCookies(testCookie) === '5f1543f199b73d1c53b943c6',
  'parse the UID from productxsess'
);

assert(
  cutOutFirstPartOfCookie('1234-5678') === '5678',
  'cutOutFirstPartOfCookie should cut out first part'
);
assert(
  cutOutFirstPartOfCookie('1234-5678-1111') === '5678-1111',
  'cutOutFirstPartOfCookie should cut out first part'
);
assert(
  cutOutFirstPartOfCookie('1234-5678-1111-2222') === '5678-1111-2222',
  'cutOutFirstPartOfCookie should cut out first part'
);
assert(
  cutOutFirstPartOfCookie('1234-other') === 'other',
  'cutOutFirstPartOfCookie should cut out first part'
);

assert(
  editSpecificCookieEntry(
    '12345&someKEYType=productx&78900123',
    'omeKEYType',
    'OIDC'
  ) === '12345&someKEYType=OIDC&78900123',
  "editSpecificCookieEntry should replace SessionType cookie's value with OIDC"
);

assert(
  editSpecificCookieEntry(
    '12345&someType=productx&someKEY=78900123',
    'someKEY',
    'newToken'
  ) === '12345&someType=productx&someKEY=newToken',
  "editSpecificCookieEntry should replace someKEY cookie's value with newToken"
);

assert(
  tamperWithCookie(
    '679b762c8d1a751ca38de269d98f08ed2d11f730-disc=true&sessionType=productx&a=1&b=2&c=3',
    'sessionType',
    'producty'
  ) ===
    '983065036b8a47dc42e09bd4c544a4f1806bb2da-disc=true&sessionType=producty&a=1&b=2&c=3',
  'tamperWithCookie should modify signature and change sessiontype'
);
