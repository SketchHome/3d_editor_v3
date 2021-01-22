import React from "react";

const Detailer = () => {
    return (
        <div>
            <div>
                <div>mode: <span id="mode_name"></span></div>
                <button id="2D_MODE_btn" style={{ width: "120px" }}>2D MODE</button>
                <button id="3D_MODE_btn" style={{ width: "120px" }}>3D MODE</button>
                <br />
                <button id="EDIT_MODE_btn" style={{ width: "120px" }}>EDIT MODE</button>
                <button id="ZOOM_MODE_btn" style={{ width: "120px" }}>ZOOM MODE</button>
            </div>
            <br />
            <div>
                <div>target: <span id="target_name"></span></div>
                <button id="REMOVE_btn" style={{ width: "120px" }}>REMOVE</button>
                <br/>
                <button id="ROTATE_H_btn" style={{ width: "120px" }}>ROTATE(H)</button>
                <button id="ROTATE_V_btn" style={{ width: "120px" }}>ROTATE(V)</button>
            </div>
            <br />
            <div>
                room Size
						<table>
                    <tbody>
                        <tr>
                            <td>width: </td>
                            <td><input id="resize_width" style={{ width: "100px" }} type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                        </tr>
                        <tr>
                            <td>height: </td>
                            <td><input id="resize_height" style={{ width: "100px" }} type="range" step="0.1" min="3" max="20" defaultValue="7" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                item list
						<table>
                    <tbody>
                        <tr>
                            <td>person</td>
                            <td><button className="Add_item_btn" item_name="Zuccarello">add</button></td>
                        </tr>
                        <tr>
                            <td>plant</td>
                            <td><button className="Add_item_btn" item_name="indoor_plant_02">add</button></td>
                        </tr>
                        <tr>
                            <td>cat</td>
                            <td><button className="Add_item_btn" item_name="cat">add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                door, window list
						<table>
                    <tbody>
                        <tr>
                            <td>door</td>
                            <td><button id="Add_door_btn" item_name="window">add</button></td>
                        </tr>
                        <tr>
                            <td>window</td>
                            <td><button id="Add_window_btn" item_name="door">add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>floor color:</td>
                            <td>
                                <input type="radio" id="floor_color_1" name="floor_color" value="#e6e6e6" defaultChecked /><label style={{ "backgroundColor": "#e6e6e6", "color": "#e6e6e6" }} htmlFor="floor_color_1">clr</label>
                                <input type="radio" id="floor_color_2" name="floor_color" value="#ffeebb" /><label style={{ "backgroundColor": "#ffeebb", "color": "#ffeebb" }} htmlFor="floor_color_2">clr</label>
                                <input type="radio" id="floor_color_3" name="floor_color" value="#f8dc81" /><label style={{ "backgroundColor": "#f8dc81", "color": "#f8dc81" }} htmlFor="floor_color_3">clr</label>
                                <input type="radio" id="floor_color_4" name="floor_color" value="#008891" /><label style={{ "backgroundColor": "#008891", "color": "#008891" }} htmlFor="floor_color_4">clr</label>
                                <input type="radio" id="floor_color_5" name="floor_color" value="#a9294f" /><label style={{ "backgroundColor": "#a9294f", "color": "#a9294f" }} htmlFor="floor_color_5">clr</label>
                            </td>
                        </tr>
                        <tr>
                            <td>wall color:</td>
                            <td>
                                <input type="radio" id="wall_color_1" name="wall_color" value="#c5a880" defaultChecked /><label style={{ "backgroundColor": "#c5a880", "color": "#c5a880" }} htmlFor="wall_color_1">clr</label>
                                <input type="radio" id="wall_color_2" name="wall_color" value="#f88f01" /><label style={{ "backgroundColor": "#f88f01", "color": "#f88f01" }} htmlFor="wall_color_2">clr</label>
                                <input type="radio" id="wall_color_3" name="wall_color" value="#48426d" /><label style={{ "backgroundColor": "#48426d", "color": "#48426d" }} htmlFor="wall_color_3">clr</label>
                                <input type="radio" id="wall_color_4" name="wall_color" value="#487e95" /><label style={{ "backgroundColor": "#487e95", "color": "#487e95" }} htmlFor="wall_color_4">clr</label>
                                <input type="radio" id="wall_color_5" name="wall_color" value="#e9b0df" /><label style={{ "backgroundColor": "#e9b0df", "color": "#e9b0df" }} htmlFor="wall_color_5">clr</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Detailer;