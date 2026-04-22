window.onload = function () {
    const ghostContainer = document.createElement("div");
    ghostContainer.style.position = "fixed";
    ghostContainer.style.top = "0";
    ghostContainer.style.left = "0";
    ghostContainer.style.width = "100%";
    ghostContainer.style.height = "100%";
    ghostContainer.style.pointerEvents = "none";
    ghostContainer.style.zIndex = "9999";

    document.body.appendChild(ghostContainer);

    function createGhost() {
        const ghost = document.createElement("div");
        ghost.innerText = "👻";

        ghost.style.position = "absolute";
        ghost.style.left = Math.random() * window.innerWidth + "px";
        ghost.style.top = window.innerHeight + "px";
        ghost.style.fontSize = "24px";
        ghost.style.opacity = Math.random();

        ghostContainer.appendChild(ghost);

        let position = window.innerHeight;

        const interval = setInterval(() => {
            position -= 1;
            ghost.style.top = position + "px";

            if (position < -50) {
                ghost.remove();
                clearInterval(interval);
            }
        }, 20);
    }

    setInterval(createGhost, 800);
};