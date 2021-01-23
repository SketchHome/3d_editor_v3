import { setMouse, setTarget } from "./_target"
import { setDragTarget } from "./_drag";
import { set2DMODE, set3DMODE, setZoomMode, setDragMode } from "./_mode";
import { changeFloorColor, changeWallColor, removeObject, resizeRoom, rotateObjectHorizon, rotateObjectVertical, hexToRgb } from "./_common";
import { addDoor, addLoadObj, addWindow } from "./_addObject"

export const setMouseEvent = (width, height,
    mouse, camera, scene, raycaster,
    target, drag_target) => {

    // normal click event - set target 		
    window.addEventListener("mousedown", (event) => {
        if (event.target.tagName !== "CANVAS") return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setTarget(intersects, target, drag_target);
    }, false);

    // special click event - set drag target 		
    window.addEventListener("contextmenu", (event) => {
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

    document.getElementById("ROTATE_H_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        rotateObjectHorizon(target);
    });

    document.getElementById("ROTATE_V_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        rotateObjectVertical(target);
    });

    document.getElementById("Add_door_btn").addEventListener("click", () => {
        if (target.length === 0) return;
        if (target[0].object.name.split("_")[0] !== "wall") return;

        const wall = target[0].object;
        const door_id = "door_3021";
        const door_size = { "x": 1.5, "y": 2, "z": 0.3 };
        const door_position = { "x": 0 };
        addDoor(wall.parent, door_id, door_size, door_position, wall.wall_type, wall.position, view_mode);
    });

    document.getElementById("Add_window_btn").addEventListener("click", () => {
        if (target.length === 0) return;
        if (target[0].object.name.split("_")[0] !== "wall") return;

        const wall = target[0].object;
        const window_id = "window_3021";
        const window_size = { "x": 2, "y": 2, "z": 0.3 };
        const window_position = { "x": 0, "y": 1.7 };
        addWindow(wall.parent, window_id, window_size, window_position, wall.wall_type, wall.position, view_mode);
    });

    // 나중에 분리 필요
    const item_size_info = {
        "Zuccarello": { "x": 0.01, "y": 0.01, "z": 0.01 },
        "indoor_plant_02": { "x": 0.2, "y": 0.2, "z": 0.2 },
        "cat": { "x": 0.01, "y": 0.01, "z": 0.01 }
    };
    const elements = document.getElementsByClassName("Add_item_btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', (e) => {
            const item_name = e.target.getAttribute("item_name");
            const item_size = item_size_info[item_name];
            const item_position = { "x": 0, "y": 0, "z": 0 };
            const item_id = "item";

            addLoadObj(room, item_name, item_size, item_position, item_id, view_mode);
        }, false);
    }

    // change floor color
    const floor_color_radios = document.getElementsByName("floor_color");
    for (let i = 0, length = floor_color_radios.length; i < length; i++) {
        floor_color_radios[i].onclick = () => {
            if (floor_color_radios[i].checked) {
                const color = floor_color_radios[i].value;
                changeFloorColor(room, color);
                if (target.length !== 0 && target[0].object.name.split("_")[0] === "floor") {
                    target[0].color = hexToRgb(color);
                }
            }
        }
    }

    // change wall color
    const wall_color_radios = document.getElementsByName("wall_color");
    for (let i = 0, length = wall_color_radios.length; i < length; i++) {
        wall_color_radios[i].onclick = () => {
            if (target.length !== 0 && wall_color_radios[i].checked) {
                if (target[0].object.name.split("_")[0] === "wall") {
                    const wall = target[0].object;
                    const color = wall_color_radios[i].value;
                    changeWallColor(wall, color);
                    target[0].color = hexToRgb(color);
                }
            }
        }
    }
}

export const setInputEvent = (room) => {
    document.getElementById("resize_width").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(room, width, height);
    });

    document.getElementById("resize_height").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(room, width, height);
    });
}