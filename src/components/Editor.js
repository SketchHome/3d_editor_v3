import React, { Component } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

import { setMouseEvent, setButtonEvent, setInputEvent, setKeyboardEvent } from "./module/_event";
import { addLight, addLoadObj, addRoom } from "./module/_addObject";

import Detailer from "./Detailer/Detailer"

import room_data from "../data/room_1_data.json";

class Editor extends Component {
	componentDidMount() {
		// === THREE.JS CODE START ===

		// scene setting
		const width = this.mount.clientWidth
		const height = this.mount.clientHeight
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();

		renderer.setClearColor("#ffffff")
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		camera.position.y = 10;
		this.mount.appendChild(renderer.domElement);

		//var ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
		//scene.add( ambientLight );

		let target = [];
		let drag_target = [];
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const viewControls = new PointerLockControls(camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;
		dragControls.enabled = false;

		const light = new THREE.Group();
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		light.add(ambientLight);
		addLight(light, {x : 0, y : 3, z : 0}, 0.3);
		light.name = 'light_group';
		scene.add(light);

		// grid helper
		//const helper = new THREE.GridHelper(1000, 1000);
		//scene.add(helper);


		// add something
		const room = new THREE.Group();
		room.view_mode = 2;
		room.is_zoom_mode = true;
		room.is_edit_mode = false;
		room.edit_mode = 'None';
		room.is_person_view_mode = false;
		room.name = "room";
		room_data.room.forEach(_room => {
			const room_group = new THREE.Group();
			room_group.name = `group_${_room.id}`;
			room_group.size = _room.size;
			room_group.room_position = _room.position;
			addRoom(room_group, _room, 2);
			_room.item.forEach(item => {
				addLoadObj(room_group, item.name, item.size, item.position, item.id, 2);
			});
			room.add(room_group)
		})
		scene.add(room);
		
		// set event
		setKeyboardEvent(viewControls, controls, raycaster, camera, scene, room);
		setMouseEvent(width, height, mouse, viewControls, camera, scene, raycaster, target, drag_target, dragControls, room);
		setButtonEvent(camera, viewControls, controls, scene, target, drag_target, room, light);
		setInputEvent(room, target);

		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<div>
				<div
					className="Scene"
					style={{ width: "900px", height: "400px" }}
					ref={(mount) => { this.mount = mount }} />
				<Detailer />
			</div>
		)
	}
}

export default Editor