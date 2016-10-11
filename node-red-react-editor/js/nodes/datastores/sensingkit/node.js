import React from 'react';
import composeNode from '../../../utils/composeNode';
import Textfield from '../../../components/form/Textfield';
import Textarea from '../../../components/form/Textarea';
import Select from '../../../components/form/Select';
import Cell from '../../../components/Cell';
import Cells from '../../../components/Cells';
import '../../../../style/sass/code.scss';

class Node extends React.Component {
	
		componentDidMount(){
		
	   		if (this.props.values.subtype){
	   			this.props.updateDescription(this.props.values.subtype);
	   			this.props.updateOutputSchema(this.props.values.subtype);
	   		}
	   	}
	   	
      	render() {
       		
         	const nameprops = {	
								value: 	this.props.values.name || "",
				 				id: "name",
								onChange:(property, event)=>{
                  					 this.props.updateNode(property, event.target.value);
              					}
							}
							
        	const nameinput = <div className="centered">
							<Textfield {...nameprops}/>												
						  </div>

			const subtypeprops = {
				options: [
					                {name: 'bluetooth', value: 'bluetooth'},
					                {name: 'audio-level', value: 'audio-level'},
					                {name: 'accelerometer', value: 'accelerometer'},
					                {name: 'linear-acceleration', value: 'linear-acceleration'},
					                {name: 'magnetometer', value: 'magnetometer'},
					                {name: 'light', value: 'light'},
									{name: 'rotation', value: 'rotation'},
									{name: 'gravity', value: 'gravity'},
									{name: 'gyroscope', value: 'gyroscope'},
									{name: 'battery', value: 'battery'},
					     ],
					     
				onSelect: (event)=>{
					this.props.updateDescription(event.target.value);
					this.props.updateOutputSchema(event.target.value);
					this.props.updateNode("subtype", event.target.value);
				},
				style: {width: '100%'},
				value: this.props.values.subtype || "",
			}
			
			const subtypeinput = <div className="centered">
							<Select {...subtypeprops}/>												
						  </div>

			
          
        	return <Cells>									
						<Cell title={"name"} content={nameinput}/>
						<Cell title={"subtype"} content={subtypeinput}/>
          			</Cells>
          		
          
       }
}

export default composeNode(Node, 'sensingkit', 
                            {
                                category: 'datastores',      
                                color: '#ffcc00',
                              
                                
                                defaults: {             
                                    name: {value:""}, 
            						type: {value:"sensingkit"},
            						subtype: {value: "light"},
                                },
                                
                                schema: (subtype)=>{
                                	
                                	
                                	switch (subtype){
                                	
                                		case "bluetooth":
                                			return {
                                					output:{
                                						name:  {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                						id: {type: 'string', description: 'the unique id of the sending node: [id]'},
                                						type:  {type: 'string', description: '\'sensingkit\''},
                                						payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
                                										ts: {type:'time', description: 'a unix timestamp'},
                                										name:  {type:'string', description: 'user assigned name of the device, \`none\' if not provided'},
                                										address: {type:'string', description: 'the mac address of the device in the form aa:bb:cc:dd:ee:ff'},
                                										rssi: {type:'numeric', description: 'received signal strength indicator (a measure of the signal strength measured by the scanning device)'},	
                                									}
                                						}
                                					}
                                			};
                                			
                                		
                                		case "accelerometer":
                                		case "linear-acceleration":
                                		case "magnetometer":
                                		case "gravity":
                                		case "gyroscope":
                                			return {
                                					output:{
                                						name:  {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                						type:  {type: 'string', description: '\'sensingkit\''},
                                						id: {type: 'string', description: 'the unique id of the sending node: [id]'},
                                						payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
																		ts: {type:'time',  description: 'a unix timestamp'},
																		x:  {type:'numeric', description: 'the x axis value'},
																		y:  {type:'numeric', description: 'the y axis value'},
																		z:  {type:'numeric',description: 'the z axis value'},	
																	}
														}
													}
                                			};
                                		
                                		case "rotation":
                                			return {
                                					output:{
                                						name:  {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                						type:  {type: 'string', description: '\'sensingkit\''},
                                						id: {type: 'string', description: 'the unique id of the sending node: [id]'},
                                						payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
																		ts: {type:'time',  description: 'a unix timestamp'},
																		x:  {type:'numeric', description: 'rotation axis xcomponent*sin(theta/2) where theta is the angle of rotation'},
																		y:  {type:'numeric', description: 'rotation axis ycomponent*sin(theta/2) where theta is the angle of rotation'},
																		z:  {type:'numeric', description: 'rotation axis zcomponent*sin(theta/2) where theta is the angle of rotation'},	
																		cos:  {type:'numeric', description: 'cosine of the angle of rotation'},	
																		headingAccuracy:  {type:'numeric', description: 'estimated accuracy in radians'},	
																	}
														}
                                					}
                                			};
                                			
                                		
                                		case "battery":
                                			return {
                                					output:{
                                						name:  {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                						type:  {type: 'string', description: '\'sensingkit\''},
                                						id: {type: 'string', description: 'the unique id of the sending node: [id]'},
                                						payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
																		ts: {type:'time',  description: 'a unix timestamp'},
																		charge:  {type:'numeric', description: 'is a number from 0 to maximum battery level'}, 
																		temperature:  {type:'numeric', description: 'is the current battery temperature'},
																		voltage:  {type:'numeric', description: 'current battery voltage'},	
																		plugged:  {type:'string', description: 'possible values: [usb, ac, wireless,unknown]'},	
																		status:  {type:'string', description: 'possible values: [charging, discharging, full, not charging, unknown,unsupported]'},
																		health: {type:'string', description: 'possible values: [cold, dead, good, over heat, over voltage, unknown, failure, unsupported]'},
																	}
														}	
                                					}
                                			};
                                			
                                		case "audio-level":
                                			return {
                                						output:{
                                							name: {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                							type:  {type: 'string', description: '\'sensingkit\''},
                                							id: {type: 'string', description: 'the unique id of the sending node: [id]'},
                                							payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
																		ts:  {type:'time',  description: 'a unix timestamp'},
																		value: {type:'numeric', description: 'the audio level captured by the phone microphone'},
																	}
															}
                                						}
                                					};
                                			
                                		default:
                                			return  {
                                						output:{
                                							name:  {type: 'string', description: 'the name of the node, defaults to \'sensingkit\''},
                                							type:  {type: 'string', description: '\'sensingkit\''},
                                							id: {type: 'strong', description: 'the unique id of the sending node: [id]'},
                                							payload: { 
                                									type:'object', 
                                									description: 'the message payload', 
                                									schema: {
                                										subtype: {type:'string', description: `the sensor type: \'${subtype}\'`},
																		ts:  {type:'time',  description: 'a unix timestamp'},
																		value: {type:'numeric', description: 'ambient light in lux captured by a phone camera'},
                                									}
                                							}
                                						}
                                					};
                                	}
                                },
                                
                                inputs:0,               
                                outputs:1,             
                               
                                icon: "fa-android",
                                unicode: '\uf17b',     
                                label: function() {     
                                    return this.name||"sensingkit";
                                },
                                labelStyle: function() { 
                                    return this.name?"node_label_italic":"";
                                },
                                description: (subtype)=>{
                                	
                                	const core = "<strong>android mobile sensingkit</strong><hr/>";
                                	
                                	if (subtype){
                                		const chosen = `<p> the current chosen sensor is <strong>${subtype}</strong>.</p>`
                                		switch (subtype){
                                
                                			case 'light':
                                				return `${core} ${chosen} <p> This will return the ambient light in lux captured by a phone camera.</p>`;
                                			case 'bluetooth':
                                				return `${core} ${chosen} <p> This will return the outcomes from periodic bluetooth scans.</p>`;
                                
                                			case 'accelerometer':
                                			case 'linear-acceleration':
                                			case 'magnetometer':
                                			case 'gravity':
                                			case 'gyroscope':
                                			case 'rotation':
                                			case 'battery':
                                			case 'audio-level':
                                				return `${core} ${chosen} <p>This will return the device ${subtype} data</p>`;
                    					                   			 
                                			default:
                                				return `${core} ${chosen}`
                                		}
                                	}
                                	return core;
                                	
                                }


                            }
                          );