(function () {
    window.addEventListener("load", init);

    const INTRO_URL = "intro.php?lang=";

    function init() {
        id("second").addEventListener("click", loadText);
    }


    function loadText() {
        let l = id("lang");
        let lang = l.options[l.selectedIndex].value;
        fetch(INTRO_URL + lang)
        .then(checkStatus)
        .then(populateDiv)
        .catch(console.error)
    }

    function populateDiv(data) {
        id("warning").classList.add("hidden");
        let board = id("main");
        let textArea = document.createElement("div");
        textArea.id = "content";
        let text = document.createElement("article");
        let texts = data.split("\n");
        for(let line of texts) {
            let br = document.createElement("br");
            let textNode = document.createTextNode(line);
            text.appendChild(textNode);
            text.appendChild(br);
        }
        textArea.appendChild(text);
        board.appendChild(textArea);
    }

    /**
     *  checks if the response is OK
     *  @param {Object} response a Promise object representing the response
     *  @returns {Object} a json file if the response is "OK", a Promise object
     *  representing "rejection" if the response has error
     */
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response.text();
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    /**
    * @param {string} target the tag/class/id of the target
    * @returns {Element} the selected element
    */
    function qs(target) {
        return document.querySelector(target);
    }

    /**
    * @param {string} target the tag/class/id of the target
    * @returns {Element} selected elements as an array
    */
    function qsa(target) {
        return document.querySelectorAll(target);
    }

    /**
    * @param {string} target the tag/class/id of the target
    * @returns {Element} the selected element
    */
    function id(target) {
        return document.getElementById(target);
    }
})();