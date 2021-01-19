import React, { Component } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { setMouseEvent, setButtonEvent, setInputEvent } from "./module/_event";
import { addLoadObj, addRoom } from "./module/_addObject";

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
		addLoadObj(room, "Zuccarello.obj");

		scene.add(room);

		// set event
		setMouseEvent(width, height, mouse, camera, scene, raycaster, target, drag_target);
		setButtonEvent(view_mode, camera, controls, scene, target, drag_target, room);
		setInputEvent(scene);

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
						<div>mode: <span id="mode_name"></span></div>
						<button id="2D_MODE_btn" style={{width:"120px"}}>2D MODE</button>
						<button id="3D_MODE_btn" style={{width:"120px"}}>3D MODE</button>
						<br/>
						<button id="EDIT_MODE_btn" style={{width:"120px"}}>EDIT MODE</button>
						<button id="ZOOM_MODE_btn" style={{width:"120px"}}>ZOOM MODE</button>
					</div>
					<br/>
					<div>
						<div>target: <span id="target_name"></span></div>
						<button id="REMOVE_btn" style={{width:"120px"}}>REMOVE</button>
						<button id="ROTATE_btn" style={{width:"120px"}}>ROTATE</button>
					</div>
					<br/>
					<div>
						Show Room Size
						<table>
							<tbody>
								<tr>
									<td>width: </td>
									<td><input id="resize_width" style={{width:"100px"}} type="range" step="0.1" min="3" max="20" defaultValue="11"/></td>
								</tr>
								<tr>
									<td>height: </td>
									<td><input id="resize_height" style={{width:"100px"}} type="range" step="0.1" min="3" max="20" defaultValue="7"/></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Editor