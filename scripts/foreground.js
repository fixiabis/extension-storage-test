const extensionStorage = new Proxy({}, {
    get: (_, name) => new Promise(gotValue =>
        chrome.runtime.sendMessage({ __type__: "STORAGE_GET", name }, gotValue)
    ),
    set: (_, name, value) => (
        chrome.runtime.sendMessage({ __type__: "STORAGE_SET", name, value })
    )
});

!async function () {
    console.log(await extensionStorage.test);
    console.log(extensionStorage.test = 12);
}();
