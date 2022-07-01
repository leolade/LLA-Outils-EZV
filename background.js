function isTabAuthorized(tab) {
    if (!tab) {
        return false;
    }

    const authorizedUrls = ["https://b.oxymo.soprasteria.com/", "https://oxymo.soprasteria.com/", "http://oxymo-backoffice.soprasteria.com/"]
    if (authorizedUrls.some(url => {
        return tab.url.startsWith(url);
    })) {
        return true;
    }
    return false;
}

function runScripts(tabId) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ["autocomplete-i22.js"]
    });
}

function executeScriptsIfOxymo(tab, tabId) {
    if (isTabAuthorized(tab)) {
        runScripts(tabId);
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    executeScriptsIfOxymo(tab, tabId);
});