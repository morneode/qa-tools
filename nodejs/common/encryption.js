const CryptoJS = require('crypto-js');

exports.forgeSignature = cookieValue => {
  const stringToSign = cookieValue;
  const secret = 'ultrasecretkey';
  const signature = CryptoJS.HmacSHA1(stringToSign, secret);

  return signature.toString(CryptoJS.enc.Hex);
};
