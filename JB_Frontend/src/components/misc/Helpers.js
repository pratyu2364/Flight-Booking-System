export function parseJwt(token) {
  if (!token) { return }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
//   const base64 = base64Url.replace('/-/g', '+').replace('/_/g', '/')
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// }).join(''));
// return jsonPayload;
  return JSON.parse(window.atob(base64));

}

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
}