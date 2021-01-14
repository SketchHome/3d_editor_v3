import { setMouse, setTarget } from './_target'
import { setDragTarget } from './_drag';
import { set2DMODE, set3DMODE, setZoomMode, setDragMode } from './_mode';
export const setMouseEvent = (width, height,
                              mouse, camera, scene, raycaster,
                              target, drag_target) => {

    // normal click event - set target 		
    window.addEventListener('mousedown', (event) => {
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setTarget(intersects, target, drag_target);
        // console.log('target: ', target);
    }, false);

    // special click event - set drag target 		
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setDragTarget(intersects, target, drag_target);
        // console.log('drag target: ', drag_target);
    }, false);
};

export const setButtonEvent = (view_mode, camera, controls, scene) => {
    document.getElementById("2D_MODE_btn").addEventListener("click", () => {
        set2DMODE(camera, controls, scene);
        view_mode = 2;
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("3D_MODE_btn").addEventListener("click", () => {
        set3DMODE(camera, controls, scene);
        view_mode = 3;
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("DRAG_MODE_btn").addEventListener("click", () => {
        setDragMode(controls);
        document.getElementById("mode_name").innerHTML = "edit";
    });

    document.getElementById("ZOOM_MODE_btn").addEventListener("click", () => {
        setZoomMode(controls, view_mode);
        document.getElementById("mode_name").innerHTML = "view";
    });
}