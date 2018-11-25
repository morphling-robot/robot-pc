module.exports = function (Blockly) {
  Blockly.Python['state_battery'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_electricity
    return origaker.get_electricity
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['state_attitude'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_attitude
    return origaker.get_attitude
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['go_forward'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.go_forward(attitude=${dropdown_attitude}，length=${value_length}, height=${value_height}, speed=${value_speed}):
    `;
    return code;
  };
  
  Blockly.Python['goto_gecko'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_gecko()
    `;
    return code;
  };
  
  Blockly.Python['goto_gecko_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_gecko.take_waving(leg_number=${value_leg_number}，speed=${value_speed})
    `;
    return code;
  };
  
  Blockly.Python['set_sensor'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_num = block.getFieldValue('num');
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_sensor(num=${dropdown_num})
    `;
    return code;
  };
  
  Blockly.Python['get_sensor_get_distance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_sensor.get_distance()
    return get_distance()
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['light_on_rgb'] = function(block) {
    var number_r = block.getFieldValue('R');
    var number_g = block.getFieldValue('G');
    var number_b = block.getFieldValue('B');
    // TODO: Assemble Python into code variable.
    var code = `origaker.light_on(R=${number_r},G=${number_g},B=${number_b})
    `
    return code;
  };
  
  Blockly.Python['light_on_time'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.light_on(time=${value_time})`;
    return code;
  };
  
  Blockly.Python['set_speed'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker. set_speed(id_num=${value_id_num}, angle=${value_angle},speed=${value_speed})
    `;
    return code;
  };
  
  Blockly.Python['set_body'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_part = block.getFieldValue('part');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['go_backward'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `from robot import origaker
    origaker.go_backward(attitude=${dropdown_attitude}，length=${value_length}, height=${value_height}, speed=${value_speed}):
    `;
    return code;
  };
  
  Blockly.Python['turn_left'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.turn_left(attitude=${dropdown_attitude}，angle=${value_angle}, height=${value_height}, speed=${value_speed}):
    `;
    return code;
  };
  
  Blockly.Python['turn_right'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.turn_right(attitude=${dropdown_attitude}，angle=${value_angle}, height=${value_height}, speed=${value_speed}):
    `;
    return code;
  };
  
  Blockly.Python['goto_gecko_take_acceleration'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_ gecko.take_acceleration()
    `;
    return code;
  };
  
  Blockly.Python['goto_gecko_take_contractions'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_gecko.take_contractions()
    `;
    return code;
  };
  
  Blockly.Python['goto_spider_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_spider.take_waving(leg_number=${value_leg_number}，speed=${value_speed})
    `;
    return code;
  };
  
  Blockly.Python['goto_puppy_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_puppy.take_waving(leg_number=${value_leg_number}，speed=${value_speed})
    `;
    return code;
  };
  
  Blockly.Python['goto_insect_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_insect.take_waving(leg_number=${value_leg_number}，speed=${value_speed})
    `;
    return code;
  };
  
  Blockly.Python['goto_insect'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_insect()
    `;
    return code;
  };
  
  Blockly.Python['goto_puppy'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_puppy()
    `;
    return code;
  };
  
  Blockly.Python['goto_spider'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_spider()
    `;
    return code;
  };
  
  Blockly.Python['goto_spider_take_acceleration'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_gecko.take_acceleration()
    `;
    return code;
  };
  
  Blockly.Python['goto_puppy_take_nodding'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_puppy.take_nodding()
    `;
    return code;
  };
  
  Blockly.Python['goto_puppy_take_wagging'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_puppy.take_wagging()
    `;
    return code;
  };
  
  Blockly.Python['goto_puppy_take_sitting'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_puppy.take_sitting()
    `;
    return code;
  };
  
  Blockly.Python['goto_insect_take_hance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_insect.take_hance()
    `;
    return code;
  };
  
  Blockly.Python['go_upstairs'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.go_upstairs()
    `;
    return code;
  };
  
  Blockly.Python['go_downstairs'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.go_downstairs()
    `;
    return code;
  };
  
  Blockly.Python['get_dancing'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_dancing()
    `;
    return code;
  };
  
  Blockly.Python['set_leg'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_num = block.getFieldValue('num');
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_leg(num=${dropdown_num})
    `;
    return code;
  };
  
  Blockly.Python['get_legcurrent'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_legcurrent()
    return get_current()
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_legstate'] = function(block) {
    var dropdown_true = block.getFieldValue('true');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_legstate()
    return ${dropdown_true}
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_remora'] = function(block) {
    var dropdown_true = block.getFieldValue('true');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_sensor.get_distance()
    return ${dropdown_true}
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['start_introducing'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.start_introducing()`;
    return code;
  };
  
  Blockly.Python['get_servo_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_state(id_num=0, para_num=0)
    return get_state()
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['set_servo_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['set_servo_speed'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['get_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_angle(id_num=0)
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_mode(id_nun=0,mode="")
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['set_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_mode(id_nun=${value_id_num},mode=${dropdown_mode})
    `;
    return code;
  };

  Blockly.Python['start_talking'] = function(block) {
    var dropdown_string = block.getFieldValue('string');
    // TODO: Assemble Python into code variable.
    var code = `origaker.start_talking(string=${dropdown_string})
    `;
    return code;
  };
}