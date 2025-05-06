const request = async (url, jsonData, method = "POST") => {
  var formBody = [];
  for (var property in jsonData) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(jsonData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const resp = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: formBody,
  });

  return resp.json();
};
module.exports = { request };
