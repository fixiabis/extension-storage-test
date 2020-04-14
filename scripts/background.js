(async function () {
    const variableNames = await new Promise(gotVariableNames =>
        chrome.storage.local.get(["__variableNames__"], ({ __variableNames__: variableNames }) => gotVariableNames(variableNames))
    ) || [];

    const temporaryStorage = await new Promise(gotStroage =>
        chrome.storage.local.get(variableNames, gotStroage)
    );

    chrome.runtime.onMessage.addListener(function (message, sender, callback) {
        switch (message.__type__) {
            case "STORAGE_GET":
                return callback(temporaryStorage[message.name]);

            case "STORAGE_SET":
                if (!variableNames.includes(message.name)) {
                    variableNames.push(message.name);
                }

                chrome.storage.local.set({
                    [message.name]: message.value,
                    "__variableNames__": variableNames,
                });

                return callback(temporaryStorage[message.name] = message.value);
        }
    });
})();
