import '/styles/global.css'
import type {AppProps} from 'next/app'
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {StepsStyleConfig as Steps} from 'chakra-ui-steps';

import Layout from "../components/Layout/Layout";
import React from 'react';
import {AuthUserProvider} from '../context/AuthUserContext';

const theme = extendTheme({
    components: {
        Steps,
    },
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AuthUserProvider>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </AuthUserProvider>
    )
}

export default MyApp