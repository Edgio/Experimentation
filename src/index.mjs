/**
 * @param {string} cookieValue
 * @returns {Record<string, string>}
 */
export function parseExperimentationInfo(cookieValue) {
    if (typeof cookieValue !== 'string') {
        throw new Error('Cookie must be a string');
    }

    return JSON.parse(decodeURIComponent(cookieValue))
}
