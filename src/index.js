/**
 * @param {string} cookieValue
 * @returns {Record<string, string>}
 */
function parseExperimentationInfo(cookieValue) {
    if (typeof cookieValue !== 'string') {
        throw new Error('Cookie must be a string');
    }

    const params = new URLSearchParams(decodeURIComponent(cookieValue));
    return Object.fromEntries(params);
}

module.exports = {
    parseExperimentationInfo,
}
