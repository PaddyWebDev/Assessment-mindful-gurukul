import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
export default function HeadSection() {
    return (
        <>
            <Head>
                <title>New Proj</title>
            </Head>
            <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js' async defer />
        </>
    )
}
