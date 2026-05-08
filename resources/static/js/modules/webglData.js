export function getWebGLData(webglElementName, webglError) {
    // Setup
    let webglElement = document.getElementById(webglElementName);
    if (!webglElement) {
        webglElement = document.createElement("canvas");
        webglElement.id = webglElementName;
        webglElement.width = 256;
        webglElement.height = 256;
        webglElement.style.display = "none";
        document.body.appendChild(webglElement);
    }

    // Get WebGL Context (Prefer WebGL2)
    function getGL(webglElement) {
        return webglElement.getContext('webgl2') ||
            webglElement.getContext('webgl') ||
            webglElement.getContext('experimental-webgl') ||
            null;
    }

    // Get Unmasked Vendor/Renderer Info
    function getUnmaskedInfo(gl) {
        try {
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (!ext) {
                return { vendor: null, renderer: null };
            }
            return {
                vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
            };
        } catch {
            return { vendor: null, renderer: null };
        }
    }

    // Program
    const gl = getGL(webglElement);
    if (!gl) {
        return webglError;
    }

    // WebGL Parameters
    const webglData = {
        glVersion: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        unmasked: getUnmaskedInfo(gl),
        extensions: gl.getSupportedExtensions ? gl.getSupportedExtensions() : []
    };

    // Return
    return webglData;
}