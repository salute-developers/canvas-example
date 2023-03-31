function getRedirect(source, destination, userAgentRegexp) {
    return {
        source,
        has: [
            {
                type: 'header',
                key: 'User-Agent',
                value: userAgentRegexp,
            },
        ],
        destination,
        permanent: true,
    };
}

const uaListByPlatform = {
    sberbox: ['sberbox', 'satellite', 'tv'],
    portal: ['sberportal', 'stargate'],
    mobile: ['.*'],
};

module.exports = {
    uaListByPlatform,
    getRedirect,
};
