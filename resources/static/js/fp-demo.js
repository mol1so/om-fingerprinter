const lastViewedSectionElementName = "last-viewed-section";
const lastViewedItemElementName = "last-viewed-item";
const requestServerPath = "/submitLV";

let latestClick = null;

function showLastViewedSection(fpSubmitResponse) {
	if (!fpSubmitResponse.lastItemViewed) {
		document.getElementById(lastViewedSectionElementName).style.display = "none";
		return;
	}

	// Get FP-Demo Items
    const items = document.querySelectorAll("main > .card-grid .card-link");

    // Index Conversion
    const index = fpSubmitResponse.lastItemViewed - 1;

	// Match FP-Demo Item -> Last Viewed Item
    const selectedCard = items[index];
    const href = selectedCard.getAttribute("href");
    const imgSrc = selectedCard.querySelector("img").getAttribute("src");
    const imgAlt = selectedCard.querySelector("img").getAttribute("alt");
    const title = selectedCard.querySelector(".card-title").textContent;

    // Update Last Viewed Item
    const lastViewedCard = document.getElementById(lastViewedItemElementName)
    lastViewedCard.setAttribute("href", href);
    lastViewedCard.querySelector("img").setAttribute("src", imgSrc);
    lastViewedCard.querySelector("img").setAttribute("alt", imgAlt);
    lastViewedCard.querySelector(".card-title").textContent = title;
	document.getElementById(lastViewedSectionElementName).style.display = "flex";
}

function sendLatestClick(fpSubmitResponse) {
	if (!latestClick) {
		return;
  	}

	const payload = { 
		fingerprint: fpSubmitResponse.fingerprint,
		href: latestClick
	};
	const dataString = JSON.stringify(payload);
	const blob = new Blob([dataString], { type: "application/json" });

	// Use "navigor.sendBeacon" if Browser Supports It
	if (navigator.sendBeacon) {
		navigator.sendBeacon(requestServerPath, blob);
	} else {
		fetch(requestServerPath, {
			method: "POST",
			headers: { 
				"Content-Type": "application/json"
			},
			body: dataString
		});
	}

	latestClick = null;
}

// Register Clicks on FP-Demo Items
document.querySelectorAll("a.card-link").forEach(link => {
	link.addEventListener("click", () => {
		latestClick = link.href;
	});
});

// Run
window.addEventListener("om-fingerprinter-client.js finished", () => {
    fpSubmitResponse = window.fpSubmitResponse;

	// Last Viewed Section
	showLastViewedSection(fpSubmitResponse)

	// Send Latest Click to Backend (Every Time Page Visibility Changes)
	document.addEventListener("visibilitychange", () => {
  		if (document.visibilityState === "hidden") {
			sendLatestClick(fpSubmitResponse);
		}
	});
});