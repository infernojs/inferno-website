/**
 * This is our overly complicated isomorphic "request"
 * @param state
 * @returns {Function}
 */
export default (hostname) => {
  return function(url, body, postForm = false) {
    const requestOptions = {
      credentials: 'include',
      headers: {}
    };
    if (body && postForm) {
      let formData = new FormData();
      Object.keys(body).forEach(field => {
        formData.append(field, body[field]);
      });
      requestOptions.method = 'POST';
      requestOptions.body = formData;
    } else if (body) {
      requestOptions.method = 'POST';
      requestOptions.body = JSON.stringify(body);
      requestOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    }

    return fetch(createURL(hostname, url), requestOptions).then(handleResponse);
  };
};

/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(hostname, path) {
  if (process.env.BROWSER) {
    return '/' + path.trimLeft('/');
  } else {
    return `http://${hostname}/` + path.trimLeft('/');
  }
}

/**
 * Parse response
 * @param resp
 * @returns {Promise}
 * @private
 */
function handleResponse(resp) {
  const redirect = resp.headers.get('Location');
  if (redirect) {
    if (process.env.BROWSER) {
      window.location.replace(redirect);
    }
    return Promise.reject({ redirect });
  }

  const contentType = resp.headers && resp.headers.get('Content-Type');
  const isJSON = contentType && contentType.includes('json');
  const response = resp[isJSON ? 'json' : 'text']();

  return resp.ok ? response : response.then(err => {
    throw err;
  });
}
