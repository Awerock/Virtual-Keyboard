const keyboard = {

    elements: {
        container: null,
        title: null,
        textArea: null,
        main: null,
        keysContainer: null,
        keys: [],
        descr: null
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.container = document.createElement("div");
        this.elements.title = document.createElement("h1");
        this.elements.textArea = document.createElement("textarea");
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.descr = document.createElement("p");

        this.elements.container.classList.add("container");
        this.elements.title.classList.add("title");
        this.elements.textArea.classList.add("text-in");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.descr.classList.add("descr");

        this.elements.container.appendChild(this.elements.title);
        this.elements.container.appendChild(this.elements.textArea);
        this.elements.container.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.container.appendChild(this.elements.descr);

        this.elements.title.textContent = "RSS Виртуальная клавиатура";
        document.body.appendChild(this.elements.container);
        this.elements.descr.textContent = "OS Windows / Language Change:  ctrl + alt";
    },

    _crreateKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",

        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",  "[", "]", "∖", "del",

        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",

        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "∕", "▲", "shiftR",

        "ctrl", "win", "alt", "space", "alt", "◄", "▼", "►", "ctrl"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="materila-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const isertLineBreak = ["backspace", "del", "enter", "shiftR",].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key-widht");
                    keyElement.innerHTML = createIconHTML("backspace")

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "caps":
                    keyElement.classList.add("keyboard__key-widht");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock")

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key-active", this.properties.capsLock);
                    });

                    break;
            }
        });
    },

    _triggerEvent(HandlerName) {
        console.log("YES!" + HandlerName);
    },

    _toggleCapsLock() {
        console.log("YES! CAPS LOCK");
    }
};

window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
    }
)