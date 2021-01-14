import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { createWallMesh, createWindowMesh, createDoorMesh } from './_createMesh'

export const addSquare = (scene) => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.name = "square";
    scene.add(cube);
};

export const addLoadObj = (scene, file_name) => {
    const loader = new OBJLoader();
    loader.load(
        file_name,
        (object) => {
            object.scale.set(0.01, 0.01, 0.01);
            object.name = "group";
            object.children.forEach(child => { child.name = "load_object"; });
            scene.add(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log('An error happened');
            console.log(error);
        }
    );
};

export const addWalls = (scene, wall_info, dimension) => {
    wall_info.forEach(wall => {
        const wall_mesh = createWallMesh(dimension, wall.type, wall.length, wall.position)
        scene.add(wall_mesh);
    });
};

export const addWindows = (scene, windows_info, dimension) => {
    windows_info.forEach(window => {
        const window_mesh = createWindowMesh(dimension, window.type, window.length, window.position)
        scene.add(window_mesh);
    });
}

export const addDoors = (scene, doors_info, dimension) => {
    doors_info.forEach(door => {
        const door_mesh = createDoorMesh(dimension, door.type, door.length, door.position)
        scene.add(door_mesh);
    });
}