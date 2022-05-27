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
    sberbox: [
        'sberbox; SberBox',
        'satellite1; SberBox',
        'satellite1; SMART BOX',
        'satellite; Satellite',
        'tv; TV',
        'satellite; SberBox Top',
        'huawei-tv; Huawei TV',
        'sberboxtime; SberBox Time',
    ],
    portal: ['stargate; SberPortal', 'stargate'],
    mobile: ['.*'],
};

module.exports = {
    uaListByPlatform,
    getRedirect,
};
