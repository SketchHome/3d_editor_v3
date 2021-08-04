export const setDragTarget = (intersects, target, drag_target, edit_mode) => {
    if (intersects.length === 0 || target.length === 0) return;
    switch (edit_mode) {
        case 'room':
            if (intersects[0].object.name !== 'floor') return;
            const temp_target = intersects[0].object.parent.parent;
            if (drag_target.length === 0 && target[0].object.name === temp_target.name) {
                addDragRoomTarget(drag_target, temp_target);
            }
            break
        case 'item':
            if (drag_target.length === 0 && target[0].object.uuid === intersects[0].object.uuid) {
                addDragItemTarget(drag_target, intersects[0].object);
            }
            break
        default:
            break
    }
};

export const removeDragTarget = (target) => {
    target.pop();
};

const addDragRoomTarget = (drag_target, object) => {
    drag_target.push(object);
    document.getElementById("target_name").innerHTML = object.name + " (drag)";
}

const addDragItemTarget = (drag_target, object) => {
    switch (object.name.split("_")[0]) {
        case "window":
            drag_target.push(object);
            break;
        case "door":
            drag_target.push(object);
            break;
        case "load":
            drag_target.push(object.parent);
            break;
        default:
            break;
    }

    document.getElementById("target_name").innerHTML = object.name + " (drag)";
};


export const relocateDragTarget = (target, view_mode) => {
    if (view_mode === 2) {
        if (target.name === "group_item") {
            target.obj_position.x = target.position.x;
            target.obj_position.z = target.position.z;
        }
        else if (target.name.split("_")[0] === "window") {
            relocateWindow_2D(target);
        }
        else if (target.name.split("_")[0] === "door") {
            relocateDoor_2D(target);
        }
        else if (target.name.split("_")[1] === "room") {
            relocateRoom_2D(target)
        }
    }
    else if (view_mode === 3) {
        if (target.name === "group_item") {
            target.position.x = target.obj_position.x;
            target.position.z = target.obj_position.z;
            target.obj_position.y = target.position.y;
        }
        else if (target.name.split("_")[0] === "window") {
            relocateWindow_3D(target);
        }
    }
}

const relocateRoom_2D = (target) => {

}

const relocateWindow_2D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {
            let min, max;
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; // fixed z axis

                    // move x axis
                    min = -(obj.scale.x / 2 - target.window_size.x / 2);
                    max = (obj.scale.x / 2 - target.window_size.x / 2);
                    if (min < target.position.x && target.position.x < max)
                        target.window_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > 0) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = -(obj.scale.z / 2 - target.window_size.x / 2);
                    max = (obj.scale.z / 2 - target.window_size.x / 2);
                    if (min < target.position.z && target.position.z < max)
                        target.window_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > 0) ? max : min;
                    break;
                default:
                    break;
            }
        }
    });
}

const relocateDoor_2D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {
            let min, max;
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; // fixed z axis

                    // move x axis
                    min = -(obj.scale.x / 2 - target.door_size.x / 2);
                    max = (obj.scale.x / 2 - target.door_size.x / 2);
                    if (min < target.position.x && target.position.x < max)
                        target.door_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > 0) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = -(obj.scale.z / 2 - target.door_size.x / 2);
                    max = (obj.scale.z / 2 - target.door_size.x / 2);
                    if (min < target.position.z && target.position.z < max)
                        target.door_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > 0) ? max : min;
                    break;
                default:
                    break;
            }
        }
    });
}

const relocateWindow_3D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {
            // fixed x, z axis
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z;
                    target.position.x = target.window_position.x;
                    break;
                case "vertical":
                    target.position.x = obj.position.x;
                    target.position.z = target.window_position.z;
                    break;
                default:
                    break;
            }

            // move z axis
            const min = target.window_size.y/2;
            const max = (obj.scale.y - target.window_size.y/2);
            if (min < target.position.y && target.position.y < max)
                target.window_position.y = target.position.y;
            else 
                target.position.y = (target.position.y > min) ? max : min;
        }
    });
}