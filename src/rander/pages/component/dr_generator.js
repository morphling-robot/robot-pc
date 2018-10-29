module.exports = function (Blockly) {
  Blockly.Python['state_battery'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = 'origaker.get_electricity\nreturn origaker.get_electricity';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['state_attitude'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = 'origaker.get_attitude\nreturn origaker.get_attitude';
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
    var code = `origaker.go_forward(attitude=${dropdown_attitude}，length=${value_length}, height=${value_height}, speed=${value_speed}):`;
    return code;
  };
  
  Blockly.Python['goto_gecko'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_gecko_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['set_sensor'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_num = block.getFieldValue('num');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['get_sensor_get_distance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['light_on_rgb'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var number_r = block.getFieldValue('R');
    var number_g = block.getFieldValue('G');
    var number_b = block.getFieldValue('B');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['light_on_time'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['set_speed'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
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
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['turn_left'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['turn_right'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_gecko_take_acceleration'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_gecko_take_contractions'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_spider_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_puppy_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_insect_take_waving'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_number = Blockly.Python.valueToCode(block, 'leg_number', Blockly.Python.ORDER_ATOMIC);
    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_insect'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_puppy'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_spider'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_spider_take_acceleration'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_puppy_take_nodding'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_puppy_take_wagging'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_puppy_take_sitting'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['goto_insect_take_hance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['go_upstairs'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['go_downstairs'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['get_dancing'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['set_leg'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_num = block.getFieldValue('num');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['get_legcurrent'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_legstate'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_no_legstate'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_remora'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['start_introducing'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
  
  Blockly.Python['get_servo_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
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
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['set_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };
}