import Document, { Html as NextHtml, Head as NextHead, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { usePlatform } from '../utils/platform';

class ProductionHead extends NextHead {
    getScripts(files: Parameters<NextHead['getScripts']>[0]) {
        const scripts = super.getScripts(files);
        // для IE 11 надо загружать react после полифиллов и webpack-[hash].js
        scripts.splice(
            1,
            0,
            // используем статику с CDN так как она кешируется и ускоряет последующие загрузки приложения
            <script src="https://cdn-app.sberdevices.ru/shared-static/0.0.0/js/react/react-17.0.2.min.js" defer />,
            <script
                src="https://cdn-app.sberdevices.ru/shared-static/0.0.0/js/react-dom/react-dom-17.0.2.min.js"
                defer
            />,
        );

        return scripts;
    }
}
const Head = process.env.NODE_ENV === 'development' ? NextHead : ProductionHead;

const Html = ({ asPath }: { asPath: string }) => {
    const { isMobile } = usePlatform({ asPath });

    return (
        <NextHtml>
            <Head>
                {isMobile && (
                    <link
                        rel="stylesheet"
                        href="https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css"
                        crossOrigin="anonymous"
                    />
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </NextHtml>
    );
};

// Для корректной работы styled-components в nextjs
// https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.js
export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return <Html asPath={this.props.dangerousAsPath} />;
    }
}
