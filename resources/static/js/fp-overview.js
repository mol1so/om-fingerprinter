const canvasElementName = "om-fingerprinter-client-canvas";
const webglElementName = "om-fingerprinter-client-webgl";

const fingerprintOutputElement = document.getElementById("fpOutput1");
const fingerprintAttributesOutputElement = document.getElementById("fpOutput2");

function showData(fpSubmitResponse) {
    const fingerprint = fpSubmitResponse.fingerprint;
    delete fpSubmitResponse.fingerprint;

    fingerprintOutputElement.textContent = fingerprint;

    const formatted = JSON.stringify(fpSubmitResponse, null, 2);
    fingerprintAttributesOutputElement.textContent = formatted;

    document.getElementById(canvasElementName).style.display = "block";
    document.getElementById(webglElementName).style.display = "block";
}

// Run
window.addEventListener("om-fingerprinter-client.js finished", () => {
    fpSubmitResponse = window.fpSubmitResponse;
    showData(fpSubmitResponse);
});