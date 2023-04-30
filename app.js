const keyboard = {

    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        onimput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {

    },

    _crreateKeys() {

    },

    _triggerEvent(HandlerName) {
        console.log("YES!" + HandlerName);
    },

    _toggleCapsLock() {
        console.log("YES! CAPS LOCK");
    }
};
