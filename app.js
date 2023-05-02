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
        this.elements.keysContainer.appendChild(this._crreateKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.title.textContent = "RSS Виртуальная клавиатура";
        document.body.appendChild(this.elements.container);
        this.elements.descr.textContent = "OS Windows / Language Change:  ctrl + alt";
        this.elements.textArea.autofocus = true;
        
        document.querySelectorAll(".text-in").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _crreateKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",

        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",  "[", "]", "∖", "del",

        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",

        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "▲", "∕",

        "ctrl", "win", "alt", "space", "◄", "▼", "►",
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const isertLineBreak = ["backspace", "del", "enter", "∕",].indexOf(key) !== -1;

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

                case "del":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("delete")

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length + 1);
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

                case "enter":
                    keyElement.classList.add("keyboard__key-widht");
                    keyElement.innerHTML = createIconHTML("keyboard_return")

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key-space");
                    keyElement.innerHTML = createIconHTML("space_bar")

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift":
                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add("keyboard__key-widht");
                    keyElement.innerHTML = "shift";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (isertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    }

};

window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
    }
);

window.onload = function() {
    document.querySelector(".text-in").focus();
};