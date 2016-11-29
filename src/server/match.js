import url from 'url'
import path from 'path'

const emptyObject = {}
//const pattern = '/pages/profile/:username/show'
//const url = '/pages/profile/ryan/show?message=55'

export default function match(urlToMatch = '/') {
    const { pathname, search } = url.parse(urlToMatch)

    /*for(let i in paths) {
        const part = paths[i]
        if (part.indexOf('?') > -1) {
            const query = part.split('?')
            paths[i] = routeParts[0]
            query.push(routeParts[1])
        }
    }

    console.log(query)
    console.log(paths, mapSearchParams(query.join('&')))*/
    return {
        route: path.join(__dirname, '../pages', pathname + '.js'),
        params: null //mapSearchParams(search.join('&'))
    }
}

/**
 * Maps a querystring to an object
 * Supports arrays and utf-8 characters
 * @param search
 * @returns {any}
 */
function mapSearchParams(search) {
    if (search === '') {
        return emptyObject;
    }

    // Create an object with no prototype
    const map = {};
    const fragment = search.split('&');

    for (let i = 0; i < fragment.length; i++) {
        const [k, v] = fragment[i].split('=').map(mapFragment);

        if (map[k]) {
            map[k] = Array.isArray(map[k]) ? map[k] : [map[k]];
            map[k].push(v);
        } else {
            map[k] = v;
        }
    }
    return map;
}

/**
 * Helper function for parsing querystring arrays
 */
function mapFragment(p, isVal) {
    return decodeURIComponent(isVal | 0 ? p : p.replace('[]', ''));
}

/**
 * Remove element from array
 * @param arr
 * @param value
 */
function remove(arr, value) {
    if (arr.indexOf(value) !== -1) {
        arr.splice(arr.indexOf(value), 1);
    }
}

/**
 * Remove a character from the beginning
 * @param character
 * @param string
 * @returns {*}
 */
function trimStart(character, string) {
    let startIndex = 0;

    while (string[startIndex] === character) {
        startIndex++;
    }

    return string.substr(startIndex);
}
