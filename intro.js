(function () {
    window.addEventListener("load", init);

    function init() {
        id("second").addEventListener("click", loadText);
    }


    function loadText() {
        let l = id("lang");
        let lang = l.options[l.selectedIndex].value;
        id("warning").classList.add("hidden");
        if(lang !== "s") {
            id(lang).classList.remove("hidden");
            id(lang).classList.add("modify_text");
        }
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