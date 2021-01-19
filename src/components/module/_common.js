export const removeObject = (scene, target, drag_target) => {
    let temp = target.pop().object;

    if (temp.name === 'load_object') {
        temp = temp.parent;
        temp.parent.remove(temp);
        temp.traverse(child => {
            if (child.type === 'Mesh') {
                child.geometry.dispose();
                child.material.dispose();
            }
        })
    }
    else {
        temp.parent.remove(temp);
        temp.geometry.dispose();
        temp.material.dispose();
    }

    temp = undefined;

    if (drag_target.length !== 0) drag_target.pop();
}

export const rotateObject = (target) => {
    let temp = target[0].object;

    if (temp.name === 'load_object_part') {
        temp = temp.parent;
    }

    let r_value = temp.rotation.y + (Math.PI / 2);
    if (r_value > 6) r_value = 0;
    temp.rotation.set(0, r_value, 0);
}

export const resizeRoom = (scene, width, height) => {
    const room = scene.children[0];

    room.traverse(wall => {
        const type = wall.name.split("_")[1];
        const idx = wall.name.split("_")[2];

        switch (type) {
            case "h":
                if (idx === "0") wall.position.z = (height / 2);
                else if (idx === "1") wall.position.z = -1 * (height / 2);
                wall.scale.x = width;
                break;
            case "v":
                if (idx === "0") wall.position.x = (width / 2);
                else if (idx === "1") wall.position.x = -1 * (width / 2);
                wall.scale.z = height;
                break;
            default:
                break;
        }

    });
}