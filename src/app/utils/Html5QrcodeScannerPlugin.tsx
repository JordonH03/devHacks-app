// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner, QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode'
import { useEffect } from 'react'

const qrcodeRegionId = "html5qr-code-full-region"

interface Html5QrcodePluginProps {
    fps?: number,
    qrbox?: number,
    aspectRatio?: number,
    disableFlip?: boolean,
    verbose?: boolean,
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void,
    qrCodeErrorCallback?: (errorMessage: string) => void
}

// Creates the configuration object for Html5QrcodeScanner.
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const createConfig = (props: any) => {
    const config: any = {}
    
    if (props.fps) {
        config.fps = props.fps
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip
    }
    return config
}

const Html5QrcodePlugin = (props: any) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props)
        const verbose = props.verbose === true
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback."
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error)
            })
        }
    }, [])

    return (
        <div id={qrcodeRegionId} />
    )
}

export default Html5QrcodePlugin