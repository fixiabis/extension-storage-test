const extensionStorage = new Proxy({}, {
    get: (_, name) => new Promise(gotValue => {
        chrome.runtime.onMessage.addListener(message => {
            if (message.__type__ === "STORAGE_GET" && message.name === name) {
                chrome.runtime.onMessage.removeListener(arguments.callee);
                gotValue(message.value);
            }
        });

        chrome.runtime.sendMessage({ __type__: "STORAGE_GET", name });
    }),
    set: (_, name, value) => {
        chrome.runtime.sendMessage({ __type__: "STORAGE_SET", name, value });
    }
});

!async function () {
    console.log(await extensionStorage.test);
    console.log(extensionStorage.test = 12);
}();
