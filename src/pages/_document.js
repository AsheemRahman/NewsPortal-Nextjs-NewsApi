import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#3B82F6" />
                </Head>
                <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;