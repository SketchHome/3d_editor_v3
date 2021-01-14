import React, { Component } from "react"

import * as THREE from "three"
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { setMouseEvent, setButtonEvent } from "./module/_event";
import { addLoadObj, addWalls, addWindows, addDoors } from "./module/_addObject"

import room_data from "../data/room_1_data.json"

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
		addWalls(scene, room_data.showroom.wall, 2);
		addWindows(scene, room_data.showroom.window, 2);
		addDoors(scene, room_data.showroom.door, 2);
		addLoadObj(scene, "Zuccarello.obj");
		// addSquare(scene);

		// set event
		setMouseEvent(width, height, mouse, camera, scene, raycaster, target, drag_target);
		setButtonEvent(view_mode, camera, controls, scene);

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
				<div>
					<div>
						<div>target: <span id="target_name"></span></div>
						<div>mode: <span id="mode_name"></span></div>
					</div>
					<div>
						<button id="2D_MODE_btn">2D MODE</button>
						<button id="3D_MODE_btn">3D MODE</button>
						<button id="DRAG_MODE_btn">DRAG MODE</button>
						<button id="ZOOM_MODE_btn">ZOOM MODE</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Editor