const { assert } = require('./assert');
const { forgeSignature } = require('./encryption');

assert(
  forgeSignature('blahblah') === '11c5207d5c5630eba8a23cb2b4aefd68f9d9368a',
  `forgeSignature should return encryption`
);
