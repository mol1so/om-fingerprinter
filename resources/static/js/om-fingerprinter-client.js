// Setup
import { getAudio } from "./modules/audio.js";
import { getCanvas } from "./modules/canvas.js";
import { getJsAttributes } from "./modules/jsAttributes.js";
import { getScreenResolution } from "./modules/screenResolution.js";
import { getWebGLData } from "./modules/webglData.js";
import { getWebGLImage } from "./modules/webglImage.js";

const canvasElementName = "om-fingerprinter-client-canvas";
const webglElementName = "om-fingerprinter-client-webgl";
const canvasError = "Canvas not supported/error.";
const webglError = "WebGL not supported/error.";

const requestServerPath = "/submitFP";

// Get Fingerprint Data (Attributes)
async function getFingerprintData() {
    const audio = await getAudio();
    const canvas = getCanvas(canvasElementName, canvasError);
    const jsAttributes = await getJsAttributes();
    const screenResolution = getScreenResolution();
    const webglImage = getWebGLImage(webglElementName, webglError);
    const webglData = getWebGLData(webglElementName, webglError);

    const originPage = window.location.pathname;
    const combinedData = {
        originPage,
        audio,
        canvas,
        jsAttributes,
        screenResolution,
        webglImage,
        webglData
    };
    const dataString = JSON.stringify(combinedData);
    return dataString; 
}

// Send Fingerprint Data to Backend
async function sendFingerprintData(dataString) {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000); // 10 seconds

    try {
        const response = await fetch(requestServerPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataString,
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(response.status);
        }

        // Save Server Response to "fpSubmitResponse" Window Global Variable
        const result = await response.json();
        window.fpSubmitResponse = result;
    } catch (e) {
        if (e.name === "AbortError") {
            console.error("Fingerprint data request timed out");
        } else {
            console.error("Fingerprint data request failed:", e);
        }
    }
}

// Run
window.onload = async () => {
    const fingerprintData = await getFingerprintData();
    await sendFingerprintData(fingerprintData);

    window.dispatchEvent(new Event("om-fingerprinter-client.js finished"));
    console.log("Client side om-fingerprinter process finished");
}