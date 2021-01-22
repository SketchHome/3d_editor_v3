import React, { Component } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { setMouseEvent, setButtonEvent, setInputEvent } from "./module/_event";
import { addLoadObj, addRoom } from "./module/_addObject";

import Detailer from "./Detailer"

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
		camera.position.y = 10;
		this.mount.appendChild(renderer.domElement);


		let target = [];
		let drag_target = [];
		let view_mode = 2;
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;

		// add something
		const room = new THREE.Group();
		room.name = "room";
		addRoom(room, room_data.room, 2);
		room_data.room.item.forEach(item => {
			addLoadObj(room, item.name, item.size, item.position, item.id, 2);
		});
		scene.add(room);

		// set event
		setMouseEvent(width, height, mouse, camera, scene, raycaster, target, drag_target);
		setButtonEvent(view_mode, camera, controls, scene, target, drag_target, room);
		setInputEvent(room);

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