import { removeDragTarget } from './_drag'

export const setMouse = (event, width, height, mouse) => {
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = - (event.clientY / height) * 2 + 1;
};

export const setTarget = (intersects, target, drag_target) => {
    if (target.length === 0 && intersects.length > 0) {
        addTarget(target, intersects[0].object);
    }
    else if (target.length !== 0 && intersects.length === 0) {
        removeTarget(target);
        removeDragTarget(drag_target);
        document.getElementById("target_name").innerHTML = '';
    }
    else if (target.length !== 0 && intersects.length > 0) {
        if (target[0].object.uuid !== intersects[0].object.uuid) {
            removeTarget(target);
            removeDragTarget(drag_target);
            addTarget(target, intersects[0].object);
        }
    }
};

const addTarget = (target, object) => {
    const color = {
        r: object.material.color.r,
        g: object.material.color.g,
        b: object.material.color.b
    };

    target.push({ object: object, color: color });
    object.material.color.set('red');

    document.getElementById("target_name").innerHTML = object.name;
}

const removeTarget = (target) => {
    const temp_target = target.pop();
    temp_target.object.material.color.r = temp_target.color.r;
    temp_target.object.material.color.g = temp_target.color.g;
    temp_target.object.material.color.b = temp_target.color.b;
}