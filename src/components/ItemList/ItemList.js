import React, { Component } from "react";

import './ItemList.css';

import box from '../../image/box.png';
import item1 from '../../image/item1.png';

const item_list = [ 
    { key: 'box_0', image_src: box, name: 'Box' }, 
    { key: 'item1_0', image_src: item1, name: 'Item 1' }, 
    { key: 'item1_1', image_src: item1, name: 'Item 1' },
    { key: 'box_1', image_src: box, name: 'Box' }, 
    { key: 'item1_2', image_src: item1, name: 'Item 1' },
    { key: 'box_2', image_src: box, name: 'Box' }, 
    { key: 'box_3', image_src: box, name: 'Box' }, 
    { key: 'item1_3', image_src: item1, name: 'Item 1' },
    { key: 'item1_4', image_src: item1, name: 'Item 1' }, 
]

/*
 * 위 컴포넌트는 아이템 리스트입니다. 
 */
class ItemList extends Component {
    dragStart(e) { 
        console.log('yes')
    }

    dragEnd(e) { 
        console.log('no')
    }

    render() {
        return (
            <div className="item_list_wrapper">
                <table>
                    <tbody>
                        {item_list.map(item => 
                            <tr key={item.key}>
                                <td className="td_image">
                                    <div><img 
                                    draggable='true'
                                    onDragStart={this.dragStart.bind(this)}
                                    onDragEnd={this.dragEnd.bind(this)}
                                    src={item.image_src} alt={item.key}/></div>
                                </td>
                                <td className="td_name">
                                    <div>{item.name}</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ItemList;
