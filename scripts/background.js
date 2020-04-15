chrome.runtime.onMessage.addListener(function (message, sender) {
    const { __type__, name, value } = message;

    switch (__type__) {
        case "STORAGE_GET":
            return chrome.storage.local.get([name], function ({ [name]: value }) {
                chrome.tabs.sendMessage(sender.tab.id, { __type__, name, value });
            });

        case "STORAGE_SET":
            return chrome.storage.local.set({
                [name]: value,
            });
    }
});
