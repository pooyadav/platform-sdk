
import React, { Component, PropTypes } from 'react';

export default class Inputs extends Component {
  
  constructor(props){
    super(props);
    this._portMouseDown = this._portMouseDown.bind(this);
    this._portMouseUp = this._portMouseUp.bind(this);
    this._portMouseOver = this._portMouseOver.bind(this);
    this._portMouseOut = this._portMouseOut.bind(this);
  }

  _portMouseDown(d,portType,portIndex,e){
   	console.log("port mouse down!");
    console.log(d);
    console.log(e);
    /*
    	mousedown_node = d;
        selected_link = null;
        mouse_mode = RED.state.JOINING;
        mousedown_port_type = portType;
        mousedown_port_index = portIndex || 0;
        document.body.style.cursor = "crosshair";
        d3.event.preventDefault();
     */
  }

  _portMouseUp(d,portType,portIndex,e){
    console.log("port mouse up!");
    console.log(d);
    console.log(e);
    /*var i;
    document.body.style.cursor = "";
    if (mouse_mode == RED.state.JOINING && drag_lines.length > 0) {
        if (typeof TouchEvent != "undefined" && d3.event instanceof TouchEvent) {
            RED.nodes.eachNode(function(n) {
                if (n.z == RED.workspaces.active()) {
                    var hw = n.w/2;
                    var hh = n.h/2;
                    if (n.x-hw<mouse_position[0] && n.x+hw> mouse_position[0] &&
                        n.y-hh<mouse_position[1] && n.y+hh>mouse_position[1]) {
                            mouseup_node = n;
                            portType = mouseup_node.inputs>0?1:0;
                            portIndex = 0;
                    }
                }
            });
        } else {
            mouseup_node = d;
        }
        var addedLinks = [];
        var removedLinks = [];

        for (i=0;i<drag_lines.length;i++) {
            if (drag_lines[i].link) {
                removedLinks.push(drag_lines[i].link)
            }
        }
        for (i=0;i<drag_lines.length;i++) {
            if (portType != drag_lines[i].portType && mouseup_node !== drag_lines[i].node) {
                var drag_line = drag_lines[i];
                var src,dst,src_port;
                if (drag_line.portType === 0) {
                    src = drag_line.node;
                    src_port = drag_line.port;
                    dst = mouseup_node;
                } else if (drag_line.portType == 1) {
                    src = mouseup_node;
                    dst = drag_line.node;
                    src_port = portIndex;
                }
                var existingLink = RED.nodes.filterLinks({source:src,target:dst,sourcePort: src_port}).length !== 0;
                if (!existingLink) {
                    var link = {source: src, sourcePort:src_port, target: dst};
                    RED.nodes.addLink(link);
                    addedLinks.push(link);
                }
            }
        }
        if (addedLinks.length > 0 || removedLinks.length > 0) {
            var historyEvent = {
                t:'add',
                links:addedLinks,
                removedLinks: removedLinks,
                dirty:RED.nodes.dirty()
            };
            if (activeSubflow) {
                var subflowRefresh = RED.subflow.refresh(true);
                if (subflowRefresh) {
                    historyEvent.subflow = {
                        id:activeSubflow.id,
                        changed: activeSubflow.changed,
                        instances: subflowRefresh.instances
                    }
                }
            }
            RED.history.push(historyEvent);
            updateActiveNodes();
            RED.nodes.dirty(true);
        }
        resetMouseVars();
        hideDragLines();
        selected_link = null;
        redraw();
    }*/
  }

  _portMouseOver(d,e){
  	console.log("port mouse over!");
   	console.log(d);
   	console.log(e);
  	//var port = d3.select(this); 
  	//port.classed("port_hovered",(mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== 1) ));
  }

  _portMouseOut(d,e){
   	console.log("port mouse out!");
   	console.log(d);
   	console.log(e);
  	//var port = d3.select(this); port.classed("port_hovered",false);}
  }

  render() {
          const {d} = this.props;

          const gprops = {
          	transform: `translate(-5,${( (d.h/2)-5)})`,
          }

          const portprops = {
          	rx:3,
          	ry:3,
          	width:10,
          	height:10,
          	onMouseDown: this._portMouseDown.bind(this, d, 1, 0),
          	onTouchStart: this._portMouseDown.bind(this, d, 1, 0),
          	onMouseUp:this._portMouseUp.bind(this, d, 1, 0),
          	onTouchEnd:this._portMouseUp.bind(this, d, 1, 0),
          	onMouseOver: this._portMouseOver.bind(this,d),
          	onMouseOut: this._portMouseOut.bind(this,d),
          }
          

          return (<g className="port_input" {...gprops}>
                  	<rect className="port" {...portprops}></rect>
                 </g>)                
  }
}