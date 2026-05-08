import { hash } from "../utils/hash.js";

export function getCanvas(canvasElementName, canvasError) {
    // Setup
    let canvasElement = document.getElementById(canvasElementName);
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
        canvasElement.id = canvasElementName;
        canvasElement.style.display = "none";
        document.body.appendChild(canvasElement);
    }
    canvasElement.width = 400;
    canvasElement.height = 200;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
        return canvasError;
    }

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 400, 200);
    grad.addColorStop(0, "#fff0f0");
    grad.addColorStop(1, "#e0f7ff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Circles 
    ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.arc(80, 60, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 128, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(120, 80, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 255, 100, 0.4)";
    ctx.beginPath();
    ctx.arc(100, 110, 35, 0, Math.PI * 2);
    ctx.fill();

    // Squares
    ctx.save();
    ctx.translate(200, 80);
    ctx.rotate(Math.PI / 10);
    ctx.fillStyle = "rgba(255, 165, 0, 0.45)";
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();

    ctx.save();
    ctx.translate(240, 110);
    ctx.rotate(-Math.PI / 12);
    ctx.fillStyle = "rgba(0, 0, 255, 0.35)";
    ctx.fillRect(-20, -20, 40, 40);
    ctx.restore();

    // Triangles
    ctx.fillStyle = "rgba(128, 0, 128, 0.5)";
    ctx.beginPath();
    ctx.moveTo(300, 50);
    ctx.lineTo(340, 110);
    ctx.lineTo(260, 110);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.beginPath();
    ctx.moveTo(310, 90);
    ctx.lineTo(350, 160);
    ctx.lineTo(270, 160);
    ctx.closePath();
    ctx.fill();

    // Text 1
    ctx.textBaseline = "top";
    ctx.font = "bold 24px 'Arial'";
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillText("Canvas123!@#", 50, 130);

    ctx.font = "italic 24px 'Times New Roman'";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("Canvas123!@#", 52, 132);

    // Text 2
    ctx.save();
    ctx.translate(200, 100);
    ctx.rotate(-Math.PI / 6);
    ctx.font = "bold 26px 'Courier New'";
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.fillText("ΔΩβπ12345%^&*", -120, 0);
    ctx.restore();

    // Text 3
    ctx.save();
    ctx.translate(320, 160);
    ctx.scale(-1, 1);
    ctx.rotate(Math.PI / 12);
    ctx.font = "20px 'Verdana'";
    ctx.fillStyle = "rgba(0,0,255,0.4)";
    ctx.fillText("Mirror$Text!?", -70, -25);
    ctx.restore();

    // Intersecting Grid Lines
    ctx.beginPath();
    for (let i = 0; i <= 400; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(400 - i / 2, 200);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Finalize
    const canvasData = canvasElement.toDataURL();
    return hash(canvasData);
}