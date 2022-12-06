/* eslint-disable @typescript-eslint/no-var-requires */
const { getRedirect, uaListByPlatform } = require('./common');

async function redirects() {
    const matches = [];

    for (const [platform, uaList] of Object.entries(uaListByPlatform)) {
        const uaListString = uaList.join('|');
        const matchingValue = `.*(${uaListString}).*`;

        matches.push(getRedirect('/', `/@${platform}`, matchingValue));
    }

    return matches;
}

module.exports = { redirects };
