import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/images/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/images/favicon-16x16.png"
                />
                {/* <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                /> */}
            </Head>
            <body style={{ margin: 0 }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
