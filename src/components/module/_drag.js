export const setDragTarget = (intersects, target, drag_target) => {
    if (intersects.length === 0 || target.length === 0) return;

    if (drag_target.length === 0 && target[0].object.uuid === intersects[0].object.uuid) {
        addDragTarget(drag_target, intersects[0].object);
    }
};

export const removeDragTarget = (target) => {
    target.pop();
};

const addDragTarget = (drag_target, object) => {
    switch (object.name.split("_")[0]) {
        case "window":
            drag_target.push(object);
            object.material.color.set("blue");
            break;
        case "door":
            drag_target.push(object);
            object.material.color.set("blue");
            break;
        case "load":
            drag_target.push(object.parent);
            break;
        default:
            break;
    }

    document.getElementById("target_name").innerHTML = object.name + " (drag)";
};

