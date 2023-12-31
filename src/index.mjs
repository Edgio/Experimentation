/**
 * @param {string} headerValue
 * @returns {Record<string, string>}
 */
function parseInfoFromValue(headerValue) {
    if (typeof headerValue !== 'string' || headerValue === '') {
        return {};
    }

    return JSON.parse(decodeURIComponent(headerValue));
}

/**
 * @param {string} relativeUrl
 * @param {boolean} matchQueryParams
 * @returns {Promise<undefined | Record<string, string>>}
 */
function getInfoForPath(relativeUrl, matchQueryParams = false) {
    return new Promise((resolve, reject) => {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const url = new URL(entry.name);
                // Skip events that aren't the required pathname
                if (matchQueryParams ? (url.pathname + url.search) !== relativeUrl : url.pathname !== relativeUrl) {
                    continue;
                }

                for (const serverEntry of entry.serverTiming) {
                    if (serverEntry.name === 'experiments') {
                        const info = parseInfoFromValue(serverEntry.description);
                        observer.disconnect();
                        resolve(info);
                    }
                }
            }
            observer.disconnect();
            resolve(undefined);
        });

        for (const type of ["navigation", "resource"]) {
            observer.observe({type, buffered: true});
        }
    });
}

export {
    parseInfoFromValue,
    getInfoForPath,
}
