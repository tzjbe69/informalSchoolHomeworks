/*global getCookies*/
/*global User*/

function logOutFunction(event) {
    event.preventDefault();
    let cookies = getCookies();
    let user = new User();
    user.logOutFunction();
    document.cookie = "accessCookie="+ cookies.accessCookie + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.location.href = "home.html";
}