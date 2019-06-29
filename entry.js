(function () {
    window.addEventListener("load", init);

    let record = 0;
    const MAX_WIDTH = window.innerWidth;
    const MAX_HEIGHT = window.innerHeight;
    const TIME_SPAN = 10;
    const DISPLACEMENT = 1;
    const RADIUS = 92;

    function init() {
        qs("#start p").addEventListener("click", toggleBubbles);
    }

    function toggleBubbles() {
        id("start").classList.add("hidden");
        generateBubble();
        moveBubbles();
    }

    function generateBubble() {
        let bubbles = qsa(".bubble");
        for (let bubble of bubbles) {
            let newLeft = Math.ceil(Math.random() * 1000);
            let newTop = Math.ceil(Math.random() * 700);
            bubble.style.left = newLeft + "px";
            bubble.style.top = newTop + "px";
            bubble.classList.remove("hidden");
        }
    }

    function moveBubbles() {
        let bubbles = qsa(".bubble");
        for (bubble of bubbles) {
            let leftIndex = generateDirectionIndex();
            let topIndex = generateDirectionIndex();
            (function (bubble) {
                setInterval(function () {
                    (function(bubble) {
                        let indexes;
                        if (record > 1000) {
                            indexes = changeDirec(leftIndex, topIndex);
                            record = 0;
                        }
                        if (reachBoundary(bubble)) {
                            indexes = changeDirec(leftIndex, topIndex);
                        }
                        if (indexes) {
                            leftIndex = indexes[0];
                            topIndex = indexes[1];
                        }
                        moveBubble(bubble, leftIndex, topIndex);
                    })(bubble);
                }, TIME_SPAN);
            })(bubble);

        }
        record++;
    }

    function moveBubble(bubble, leftIndex, topIndex) {
        let compStyle = window.getComputedStyle(bubble);
        let currentLeft = parseInt(compStyle.left);
        let currentTop = parseInt(compStyle.top);
        if (leftIndex === 0) {
            bubble.style.left = currentLeft + DISPLACEMENT + "px";
        } else {
            bubble.style.left = currentLeft - DISPLACEMENT + "px";
        }
        if (topIndex === 0) {
            bubble.style.top = currentTop + DISPLACEMENT + "px";
        } else {
            bubble.style.top = currentTop - DISPLACEMENT + "px";
        }
    }

    function changeDirec(leftIndex, topIndex) {
        if (leftIndex === 0) {
            leftIndex = 1;
        } else {
            leftIndex = 0;
        }
        if (topIndex === 0) {
            topIndex = 1;
        } else {
            topIndex = 0;
        }
        return [leftIndex, topIndex];
    }

    function reachBoundary(bubble) {
        let compStyle = window.getComputedStyle(bubble);
        let l = parseInt(compStyle.left);
        let t = parseInt(compStyle.top);
        if (l <= 0 || l > MAX_WIDTH - RADIUS) {
            return true;
        }
        if (t <= 0 || t > MAX_HEIGHT - RADIUS) {
            return true;
        }
    }

    function generateDirectionIndex() {
        return Math.floor(Math.random() * 2);
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