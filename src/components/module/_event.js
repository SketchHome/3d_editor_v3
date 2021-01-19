import { setMouse, setTarget } from './_target'
import { setDragTarget } from './_drag';
import { set2DMODE, set3DMODE, setZoomMode, setDragMode } from './_mode';
import { removeObject, resizeRoom, rotateObject } from './_common';

export const setMouseEvent = (width, height,
                              mouse, camera, scene, raycaster,
                              target, drag_target) => {

    // normal click event - set target 		
    window.addEventListener('mousedown', (event) => {
        if (event.target.tagName !== "CANVAS") return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setTarget(intersects, target, drag_target);
        console.log(scene.children);
    }, false);

    // special click event - set drag target 		
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (event.target.tagName !== "CANVAS") return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setDragTarget(intersects, target, drag_target);
    }, false);
};

export const setButtonEvent = (view_mode, camera, controls, scene, target, drag_target, room) => {
    document.getElementById("2D_MODE_btn").addEventListener("click", () => {
        set2DMODE(camera, controls, room);
        view_mode = 2;
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("3D_MODE_btn").addEventListener("click", () => {
        set3DMODE(camera, controls, room);
        view_mode = 3;
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("EDIT_MODE_btn").addEventListener("click", () => {
        setDragMode(controls);
        document.getElementById("mode_name").innerHTML = "edit";
    });

    document.getElementById("ZOOM_MODE_btn").addEventListener("click", () => {
        setZoomMode(controls, view_mode);
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("REMOVE_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        removeObject(scene, target, drag_target);
        document.getElementById("target_name").innerHTML = "";
    }, false);

    document.getElementById("ROTATE_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        rotateObject(target);
    })
}

export const setInputEvent = (scene) => {
    document.getElementById("resize_width").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);
        
        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(scene, width, height);
    });

    document.getElementById("resize_height").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(scene, width, height);
    });
}