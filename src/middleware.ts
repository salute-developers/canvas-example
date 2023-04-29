import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

const characters = ['sber', 'joy', 'eva'];

const regExpByPlatform = {
    sberbox: /\b(?:sberbox|satellite|tv)\b/i,
    portal: /\b(?:sberportal|stargate)\b/i,
    mobile: /./,
};

const regExpToPathnames = new Map<RegExp, string[]>();

for (const [platform, regExp] of Object.entries(regExpByPlatform)) {
    regExpToPathnames.set(
        regExp,
        characters.map((character) => `/${character}/@${platform}`),
    );
}

export function middleware(req: NextRequest) {
    const { ua } = userAgent(req);
    const url = req.nextUrl.clone();
    const trimmedPathname = url.pathname.substring(1);

    for (const [regExp, pathnames] of regExpToPathnames) {
        if (regExp.test(ua)) {
            const path = pathnames.find((pathname) => pathname.includes(trimmedPathname));

            url.pathname = path ?? pathnames[0];

            return NextResponse.redirect(url, {
                status: process.env.NODE_ENV === 'development' ? 307 : 308,
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    /**
     * The matcher values need to be constants so they can be statically analyzed at build-time.
     * Dynamic values such as variables will be ignored.
     */
    matcher: ['/', '/sber', '/joy', '/eva'],
};
