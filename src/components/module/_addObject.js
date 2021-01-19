import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { } from "three/examples/jsm/geometries/ConvexGeometry.js"
import { createWallMesh, createWindowMesh, createDoorMesh } from './_createMesh'

export const addSquare = (scene) => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.name = "square";

    // const group1 = new THREE.Group();
    // const group2 = new THREE.Group();
    // group1.name = "parent_group";
    // group2.name = "child_group";

    // group2.add(cube);
    // group1.add(group2);
    // scene.add(group1);

    scene.add(cube);
};

export const addLoadObj = (room, file_name) => {
    const loader = new OBJLoader();
    loader.load(
        file_name,
        (object) => {
            object.scale.set(0.01, 0.0001, 0.01);
            object.name = "group_item_0";
            object.children.forEach(child => { child.name = "load_object_part"; });
            room.add(object);
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

export const addRoom = (room_group, room, dim) => {
    room.wall.forEach(wall => {
        const wall_group = new THREE.Group();
        wall_group.name = `group_${wall.id}`;

        const wall_mesh = createWallMesh(wall.id, wall.type, wall.direction, room.size, dim);
        wall_group.add(wall_mesh);

        if (wall.door.length !== 0) {
            wall.door.forEach(_door => {
                const door_mesh = createDoorMesh(_door.id, _door.size, _door.position, 
                                                 wall.type, wall_mesh.position, 
                                                 dim);
                wall_group.add(door_mesh);
            })
        }

        if (wall.window.length !== 0) {
            wall.window.forEach(_window => {
                const window_mesh = createWindowMesh(_window.id, _window.size, _window.position, 
                                                     wall.type, wall_mesh.position, 
                                                     dim);
                wall_group.add(window_mesh);
            })
        }

        room_group.add(wall_group);
    });
};