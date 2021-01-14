import * as THREE from 'three'

export const createWallMesh = (dimension, type, length, position) => {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const wall_mesh = new THREE.Mesh(geometry, material);

    const height = (dimension === 2) ? 0.0001 : 2;
    const y_position = (dimension === 2) ? 0 : height / 2;

    switch (type) {
        case 'horizon':
        default:
            wall_mesh.scale.set(length, height, 0.1);
            wall_mesh.position.set(0, y_position, position);
            break;
        case 'vertical':
            wall_mesh.scale.set(0.1, height, length);
            wall_mesh.position.set(position, y_position, 0);
            break;
    }

    wall_mesh.name = "wall";

    return wall_mesh;
};

export const createWindowMesh = (dimension, type, length, position) => {
    const material = new THREE.MeshBasicMaterial({ color: '#006633' });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const window_mesh = new THREE.Mesh(geometry, material);

    const height = (dimension === 2) ? 0.0001 : 1;
    const y_position = (dimension === 2) ? 0 : 1;

    switch (type) {
        case 'horizon':
        default:
            window_mesh.scale.set(length, height, 0.3);
            window_mesh.position.set(0, y_position, position);
            break;
        case 'vertical':
            window_mesh.scale.set(0.3, height, length);
            window_mesh.position.set(position, y_position, 0);
            break;
    }

    window_mesh.name = "window";

    return window_mesh;
}

export const createDoorMesh = (dimension, type, length, position) => {
    const material = new THREE.MeshBasicMaterial({ color: '#6600CC' });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const door_mesh = new THREE.Mesh(geometry, material);

    const height = (dimension === 2) ? 0.0001 : 2;
    const y_position = (dimension === 2) ? 0 : height / 2;

    switch (type) {
        case 'horizon':
        default:
            door_mesh.scale.set(length, height, 0.3);
            door_mesh.position.set(0, y_position, position);
            break;
        case 'vertical':
            door_mesh.scale.set(0.3, height, length);
            door_mesh.position.set(position, y_position, 0);
            break;
    }

    door_mesh.name = "door";

    return door_mesh;
}