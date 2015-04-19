HTTP(S)-GET shim
================

Request-like module for HTTP(S) gets. Only contains the bare minimum for gets.

The requested url can be a string or an option, as the node [http core api](http://nodejs.org/api/http.html#http_http_request_options_callback) goes, the only added option is the maximum number of redirects the request can make, which you can add to the options-object as the property `maxRedirects` and a `Number` as the value (defaults to 5).

Automatically selects http or https based on the requested url, or the options object.

Usage
-----
Install: `npm install http-get-shim`

Require: `var httpGet = require('http-get-shim');`

Example:

```js
httpGet('http://google.com', function (err, response, data) {
    if (!err && response.statusCode === 200) {
        console.log(data);
    } else {
        console.log(response.statusCode, err);
    }
});
```

License
-------
MIT: [http://ok.mit-license.org](http://ok.mit-license.org)
