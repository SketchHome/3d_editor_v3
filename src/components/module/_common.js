export const removeObject = (scene, target, drag_target) => {
    let temp = target.pop().object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
        temp.parent.remove(temp);
        temp.traverse(child => {
            if (child.type === "Mesh") {
                child.geometry.dispose();
                // child.material.dispose();
            }
        })
    }
    else {
        temp.parent.remove(temp);
        temp.geometry.dispose();
        // temp.material.dispose();
    }

    temp = undefined;

    if (drag_target.length !== 0) drag_target.pop();
}

export const rotateObjectHorizon = (target) => {
    let temp = target[0].object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
    }

    let r_value = temp.rotation.y + (Math.PI / 2);
    if (r_value > 6) r_value = 0;
    temp.rotation.set(0, r_value, 0);
}

export const rotateObjectVertical = (target) => {
    let temp = target[0].object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
    }

    let r_value = temp.rotation.x + (Math.PI / 2);
    if (r_value > 6) r_value = 0;
    temp.rotation.set(r_value, 0, 0);
}

export const resizeRoom = (room, width, height) => {
    room.children.forEach(group => {
        switch (group.name.split("_")[1]) {
            case "wall":
                group.children.forEach(mesh => {
                    switch (mesh.name.split("_")[0]) {
                        case "wall":
                            resizeWall(mesh, width, height);
                            relocateWall(mesh, width, height);
                            break;
                        case "window":
                        case "door":
                            relocateObject(mesh);
                            break;
                        default:
                            break;
                    }
                });
                break;
            case "floor":
                group.children[0].scale.setX(width);
                group.children[0].scale.setZ(height);
                break;
            default:
                break;
        }
    });
}

const resizeWall = (wall, width, height) => {
    switch (wall.wall_type) {
        case "horizon":
            wall.scale.setX(width);
            break;
        case "vertical":
            wall.scale.setZ(height);
            break;
        default:
            break;
    }
}

const relocateWall = (wall, width, height) => {
    switch (wall.wall_direction) {
        case "top":
            wall.position.setZ(height / 2);
            break;
        case "bottom":
            wall.position.setZ(-height / 2);
            break;
        case "right":
            wall.position.setX(width / 2);
            break;
        case "left":
            wall.position.setX(-width / 2);
            break;
        default:
            break;
    }
}

const relocateObject = (object) => {
    object.parent.children.forEach(child => {
        if (child.name.split("_")[0] === "wall") {
            switch (child.wall_direction) {
                case "top":
                case "bottom":
                    object.position.setZ(child.position.z);
                    break;
                case "right":
                case "left":
                    object.position.setX(child.position.x);
                    break;
                default:
                    break;
            }
        }
    });
}

export const changeFloorColor = (room, color) => {
    room.children.forEach(child => {
        if (child.name.split("_")[1] === 'floor') {
            const floor_mesh = child.children[0];
            floor_mesh.material.color.set(color);
        }
    });
}

export const changeWallColor = (wall, color) => {
    wall.material.color.set(color);
}

export const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16)/255,
      g: parseInt(result[2], 16)/255,
      b: parseInt(result[3], 16)/255
    } : null;
}