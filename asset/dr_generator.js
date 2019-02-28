module.exports = function (Blockly) {
  Blockly.Python['state_battery'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_electricity()`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['state_attitude'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_attitude()`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
//  Blockly.Python['go_forward'] = function(block) {
//    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
//    var dropdown_attitude = block.getFieldValue('attitude');
//    var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
//    var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
//    var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
//    // TODO: Assemble Python into code variable.
//    var code = `origaker.go_forward(attitude=${dropdown_attitude}, length=${value_length}, height=${value_height}, speed=${value_speed}):
//    `;
//    return code;
//  };

 Blockly.Python['go_forward'] = function(block) {
  Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
  var dropdown_attitude = block.getFieldValue('attitude');
  var number_length = block.getFieldValue('length');
  var number_height = block.getFieldValue('height');
  var number_speed = block.getFieldValue('speed');
  // TODO: Assemble Python into code variable.
  var code = `origaker.go_forward(attitude=${dropdown_attitude}, length=${number_length}, height=${number_height}, speed=${number_speed})
`;
  return code;
 };


 Blockly.Python['go_backward'] = function(block) {
  Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
  var dropdown_attitude = block.getFieldValue('attitude');
  var number_length = block.getFieldValue('length');
  var number_height = block.getFieldValue('height');
  var number_speed = block.getFieldValue('speed');
  // TODO: Assemble Python into code variable.
  var code = `origaker.go_backward(attitude=${dropdown_attitude}, length=${number_length}, height=${number_height}, speed=${number_speed})
`;
  return code;
 };


  Blockly.Python['turn_left'] = function(block) {
  Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
  var dropdown_attitude = block.getFieldValue('attitude');
  var number_angle = block.getFieldValue('angle');
  var number_height = block.getFieldValue('height');
  var number_speed = block.getFieldValue('speed');
  // TODO: Assemble Python into code variable.
  var code = `origaker.turn_left(attitude=${dropdown_attitude}, angle=${number_angle}, height=${number_height}, speed=${number_speed})
`;
  return code;
};

  Blockly.Python['turn_right'] = function(block) {
  Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
  var dropdown_attitude = block.getFieldValue('attitude');
  var number_angle = block.getFieldValue('angle');
  var number_height = block.getFieldValue('height');
  var number_speed = block.getFieldValue('speed');
  // TODO: Assemble Python into code variable.
  var code = `origaker.turn_right(attitude=${dropdown_attitude}, angle=${number_angle}, height=${number_height}, speed=${number_speed})
`;
  return code;
};


  Blockly.Python['rotate_pitch'] = function(block) {
  Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
  var dropdown_attitude = block.getFieldValue('attitude');
  var number_angle = block.getFieldValue('angle');
  var number_speed = block.getFieldValue('speed');
  // TODO: Assemble Python into code variable.
  var code = `origaker.rotate_pitch(attitude=${dropdown_attitude}, angle=${number_angle}, speed=${number_speed})
`;
  return code;
  };

  Blockly.Python['rotate_roll'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var number_angle = block.getFieldValue('angle');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.rotate_roll(attitude=${dropdown_attitude}, angle=${number_angle}, speed=${number_speed})
`;
    return code;
    };


    Blockly.Python['set_leg_position'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var number_x = block.getFieldValue('x');
      var number_y = block.getFieldValue('y');
      var number_z = block.getFieldValue('z');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.move_leg(leg_number=${dropdown_leg_number}, position=[${number_x}, ${number_y}, ${number_z}], speed=${number_speed})
`;
      return code;
    };
  
    Blockly.Python['set_leg_joints'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var value_joints = Blockly.Python.valueToCode(block, 'joints', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_leg_joints(leg_number=${dropdown_leg_number}, joints=[${value_joints}], speed=${number_speed})
`;
      return code;
    };


    Blockly.Python['change_gecko_shape'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var number_angle = block.getFieldValue('angle');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_gecko_shape(angle=${number_angle}, speed=${number_speed})
`;
      return code;
    };
  

    Blockly.Python['change_spider_shape'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var number_angle = block.getFieldValue('angle');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_spider_shape(angle=${number_angle}, speed=${number_speed})
`;
      return code;
    };


    Blockly.Python['change_stick_shape'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var number_angle = block.getFieldValue('angle');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_stick_shape(angle=${number_angle}, speed=${number_speed})
`;
      return code;
    };


  Blockly.Python['change_dog_shape'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var number_head_angle = block.getFieldValue('head_angle');
      var number_body_angle = block.getFieldValue('body_angle');
      var number_tail_angle = block.getFieldValue('tail_angle');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_dog_shape(angle_list=[${number_head_angle}, ${number_body_angle}, ${number_tail_angle}], speed=${number_speed})
`;
      return code;
    };


  Blockly.Python['goto_shape'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_attitude = block.getFieldValue('attitude');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.goto_shape(attitude=${dropdown_attitude}, speed=${number_speed})
`;
    return code;
    };

  Blockly.Python['gecko_show'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_action = block.getFieldValue('action');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.show_action(attitude=${"\"gecko\""}, action=${dropdown_action}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['spider_show'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_action = block.getFieldValue('action');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.show_action(attitude=${"\"spider\""}, action=${dropdown_action}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['stick_show'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_action = block.getFieldValue('action');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.show_action(attitude=${"\"stick\""}, action=${dropdown_action}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['dog_show'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_action = block.getFieldValue('action');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `origaker.show_action(attitude=${"\"dog\""}, action=${dropdown_action}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['dance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_dance_number = block.getFieldValue('dance_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.dance(dance_number=${dropdown_dance_number})
`;
    return code;
  };

  Blockly.Python['laser_distance'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_laser_id = Blockly.Python.valueToCode(block, 'laser_id', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_laser_distance(laser_id=${value_laser_id})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['laser_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_laser_id = Blockly.Python.valueToCode(block, 'laser_id', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_laser_state(laser_id=${value_laser_id})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['torque_value'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_torque_value(leg_number=${dropdown_leg_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['land_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_land_state(leg_number=${dropdown_leg_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };


  Blockly.Python['touch_type'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_trunk_number = block.getFieldValue('trunk_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_touch_type(trunk_number=${dropdown_trunk_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['touch_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_trunk_number = block.getFieldValue('trunk_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_touch_state(trunk_number=${dropdown_trunk_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['leds_mode'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_leds_mode(leg_number=${dropdown_leg_number}, mode=${dropdown_mode})
`;
    return code;
  };

  Blockly.Python['leds_on_time'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_leds_time(leg_number=${dropdown_leg_number}, time=${value_time})
`;
    return code;
  };

  Blockly.Python['led_color'] = function(block) {
    var dropdown_leg_number = block.getFieldValue('leg_number');
    var dropdown_led_number = block.getFieldValue('led_number');
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_led_color(leg_number=${dropdown_leg_number}, led=${dropdown_led_number}, color=${value_color})
`;
    return code;
  };

  Blockly.Python['classic_style'] = function(block) {
    var value_leg_list = Blockly.Python.valueToCode(block, 'leg_list', Blockly.Python.ORDER_ATOMIC);
    var dropdown_style = block.getFieldValue('style');
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_leds_style(leg_list=${value_leg_list}, style=${dropdown_style})
`;
    return code;
  };


  Blockly.Python['introduction'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    // TODO: Assemble Python into code variable.
    var code = `origaker.self_introduction()
`;
    return code;
  };

  Blockly.Python['robot_say'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_words = Blockly.Python.valueToCode(block, 'words', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.say(words=${value_words})
`;
    return code;
  };

  Blockly.Python['robot_play'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_music = block.getFieldValue('music');
    // TODO: Assemble Python into code variable.
    var code = `origaker.play(music=${dropdown_music})
`;
    return code;
  };

  Blockly.Python['set_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Python into code variable.
    var code = `se.set_mode(id_num=${value_id_num}, mode=${dropdown_mode})
`;
    return code;
  };

  Blockly.Python['set_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_angle = block.getFieldValue('angle');
    var number_step = block.getFieldValue('step');
    var code = `se.set_angle(id_num=${value_id_num}, angle=${number_angle}, step=${number_step})
`;
    return code;
  };

  Blockly.Python['set_wheel_speed'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `se.set_speed(id_num=${value_id_num}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['set_servo_id'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_new_id = block.getFieldValue('new_id');
    // TODO: Assemble Python into code variable.
    var code = `se.set_id(id_num=${value_id_num}, new_id=${number_new_id})
`;
    return code;
  };

  Blockly.Python['ping_state'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.ping_state(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_angle(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_mode(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['exec_action'] = function(block) {
    var dropdown_action = block.getFieldValue('action');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };

}