import { hash } from "../utils/hash.js";

export function getWebGLImage(webglElementName, webglError) {
    // Setup
    let webglElement = document.getElementById(webglElementName);
    if (!webglElement) {
        webglElement = document.createElement("canvas");
        webglElement.id = webglElementName;
        webglElement.style.display = "none";
        document.body.appendChild(webglElement);
    }
    webglElement.width = 256;
    webglElement.height = 256;

    // Get WebGL Context (Prefer WebGL2)
    function getGL(webglElement) {
        return webglElement.getContext('webgl2') ||
            webglElement.getContext('webgl') ||
            webglElement.getContext('experimental-webgl') ||
            null;
    }

    // Vertex Shader
    const vertexShaderSrc = `
        attribute vec2 aPos;
        varying vec2 uv;
        void main() {
            uv = aPos * 0.5 + 0.5;
            gl_Position = vec4(aPos, 0.0, 1.0);
        }
    `;

    // Fragment Shader (Several Arithmetic Ops to Expose Precision/Driver Differences)
    const fragmentShaderSrc = `
        precision highp float;
        varying vec2 uv;
        void main() {
            float x = uv.x * 3.14159265358979323846;
            float y = uv.y * 1.61803398874989484820;
            float v = sin(x) * cos(y) + sqrt(x + 0.0001) - mod(x*y, 7.0);
            float r = fract(v * 1000.0);
            float g = fract(v * 10000.0);
            float b = fract(v * 100000.0);
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `;

    function compile(gl, type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);

        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            return webglError;
        }

        return s;
    }

    // Program
    const gl = getGL(webglElement);
    if (!gl) {
        return webglError;
    }

    // Setup
    const vert = compile(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const frag = compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (vert == webglError || frag == webglError) {
        return webglError;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        return webglError;
    }
    gl.useProgram(prog);

    // GPU
    const verts = new Float32Array([-1,-1,  3,-1, -1,3]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Render
    gl.viewport(0, 0, webglElement.width, webglElement.height);
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    // Finalize
    const webglData = webglElement.toDataURL();
    return hash(webglData);
}