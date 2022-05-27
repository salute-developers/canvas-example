/* eslint-disable @typescript-eslint/no-var-requires */
const { getRedirect, uaListByPlatform } = require('./common');

async function redirects() {
    const matches = [];

    for (const [platform, uaList] of Object.entries(uaListByPlatform)) {
        const uaListString = uaList.join('|');
        const matchingValue = `.*(${uaListString}).*`;

        matches.push(getRedirect('/', `/sber/@${platform}`, matchingValue));

        for (const character of ['sber', 'joy', 'eva']) {
            matches.push(getRedirect(`/${character}`, `/${character}/@${platform}`, matchingValue));
        }
    }

    return matches;
}

module.exports = { redirects };
