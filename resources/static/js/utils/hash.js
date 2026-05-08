import jsSHA256 from './hash-sha256.mjs';

export function hash(input) {
    const shaObj = new jsSHA256("SHA-256", "TEXT");
    shaObj.update(input);  
    const hash = shaObj.getHash("HEX");
    return hash;
}