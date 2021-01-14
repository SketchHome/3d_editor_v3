export const set2DMODE = (camera, controls, scene) => {
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
    setZoomMode(controls, 2);
    setObjectDim(2, scene)
};

export const set3DMODE = (camera, controls, scene) => {
    camera.position.set(5, 10, 5);
    camera.lookAt(0, 0, 0);
    setZoomMode(controls, 3);
    setObjectDim(3, scene)
};

export const setZoomMode = (controls, mode) => {
    switch (mode) {
        case 2:
            controls.enabled = true;
            controls.enableDamping = false;
            controls.enableKeys = false;
            controls.enablePan = false;
            controls.enableRotate = false;
            controls.enableZoom = true;
            break;
        case 3:
            controls.enabled = true;
            controls.enableDamping = true;
            controls.enableKeys = true;
            controls.enablePan = true;
            controls.enableRotate = true;
            controls.enableZoom = true;
            break;
        default:
            break;
    }
};

export const setDragMode = (controls) => {
    controls.enabled = false;
};

const setObjectDim = (dim, scene) => {
    scene.children.forEach(object => {
        switch(object.name) {
            case "wall":
                object.scale.y = (dim === 2) ? 0.0001 : 2;
			    object.position.y = (dim === 2) ? 0 : object.scale.y / 2;
                break;
            case "window":
                object.scale.y = (dim === 2) ? 0.0001 : 1;
			    object.position.y = (dim === 2) ? 0 : 1;
                break;
            case "door":
                object.scale.y = (dim === 2) ? 0.0001 : 2
			    object.position.y = (dim === 2) ? 0 : object.scale.y / 2
                break;
            case "group":
                break;
            default:
                break;
        }
    })
}