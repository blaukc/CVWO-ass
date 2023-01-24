import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
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
