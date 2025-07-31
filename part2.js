document.querySelector('.stage-header_stage-menu-wrapper_oLSb9').innerHTML = "" // remove buttons

let stage = document.querySelector('.stage-wrapper_stage-canvas-wrapper_C8yio .stage_stage-wrapper_fu9p- .stage_stage_yEvd4');
console.log("Stage element:", stage);

const socket = io("http://10.0.0.10:8000");
socket.on("image", (data) => {
    console.log("Server sent image URL.");

    if (!stage) {
        console.warn("Stage element not found!");
        return;
    }

    let img = stage.querySelector("#image");

    if (!img) {
        // If the image doesn't exist yet, create it once
        img = document.createElement("img");
        img.id = "image";
		img.style.width = "100%";
		img.style.height = "100%";
        stage.innerHTML = "";
        stage.appendChild(img);
    }

    // Replace the src of the existing image to load the new one
    img.src = data.message;
});

window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e"].includes(key)) {
        socket.emit("key_press", key);
        console.log("Sent key:", key);
    }
});
