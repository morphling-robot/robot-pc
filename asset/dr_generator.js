module.exports = function (Blockly) {

  Blockly.Python['time_delay'] = function(block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    var number_times = block.getFieldValue('times');
    // TODO: Assemble Python into code variable.
    var code = `time.sleep(${number_times})
`;
    return code;
  };

  Blockly.Python['get_time_counter'] = function(block) {
    Blockly.Python.definitions_['import_time'] = 'import time';
    // TODO: Assemble Python into code variable.
    var code = `time.perf_counter()`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_time_diff'] = function(block) {
    var value_start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
    var value_end = Blockly.Python.valueToCode(block, 'end', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `${value_end}-${value_start}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

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


    Blockly.Python['number_0_150'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number__100_100'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number__150_150'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['set_leg_position'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var value_position = Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_leg_position(leg_number=${dropdown_leg_number}, position=${value_position}, speed=${number_speed})
`;
      return code;
    };
    
    Blockly.Python['get_leg_position'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      // TODO: Assemble Python into code variable.
      var code = `origaker.get_leg_position(leg_number=${dropdown_leg_number})`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['set_leg_position0'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var number_x = block.getFieldValue('x');
      var number_y = block.getFieldValue('y');
      var number_z = block.getFieldValue('z');
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_leg_position(leg_number=${dropdown_leg_number}, position=[${number_x}, ${number_y}, ${number_z}], speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['set_leg_position1'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var value_position = Blockly.Python.valueToCode(block, 'position', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      // TODO: Assemble Python into code variable.
      var code = `origaker.set_leg_position(leg_number=${dropdown_leg_number}, position=${value_position}, speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['number__90_90'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number__138_95'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number__158_112'] = function(block) {
      var number_number = block.getFieldValue('number');
      // TODO: Assemble Python into code variable.
      var code = `${number_number}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number_0_90'] = function (block) {
        var number_number = block.getFieldValue('number');
        // TODO: Assemble Python into code variable.
        var code = `${number_number}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['number_20_180'] = function (block) {
        var number_number = block.getFieldValue('number');
        // TODO: Assemble Python into code variable.
        var code = `${number_number}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['set_leg_joints'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var value_joints_list = Blockly.Python.valueToCode(block, 'joints_list', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_leg_joints(leg_number=${dropdown_leg_number}, joints=${value_joints_list}, speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['get_leg_joints'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      // TODO: Assemble Python into code variable.
      var code = `origaker.get_leg_joints(leg_number=${dropdown_leg_number})`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Python['set_leg_joints0'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var number_joint1 = block.getFieldValue('joint1');
      var number_joint2 = block.getFieldValue('joint2');
      var number_speed = block.getFieldValue('speed');
      var number_joint3 = block.getFieldValue('joint3');
      var code = `origaker.set_leg_joints(leg_number=${dropdown_leg_number}, joints=[${number_joint1}, ${number_joint2}, ${number_joint3}], speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['set_leg_joints1'] = function(block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var value_joints = Blockly.Python.valueToCode(block, 'joints', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_leg_joints(leg_number=${dropdown_leg_number}, joints=${value_joints}, speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['set_joint1'] = function (block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var number_angle = block.getFieldValue('angle');
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_joint1(leg_number=${dropdown_leg_number}, angle=${number_angle}, speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['set_joint2'] = function (block) {
        Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
        var dropdown_leg_number = block.getFieldValue('leg_number');
        var number_angle = block.getFieldValue('angle');
        var number_speed = block.getFieldValue('speed');
        var code = `origaker.set_joint2(leg_number=${dropdown_leg_number}, angle=${number_angle}, speed=${number_speed})
`;
        return code;
    };

    Blockly.Python['set_joint3'] = function (block) {
        Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
        var dropdown_leg_number = block.getFieldValue('leg_number');
        var number_angle = block.getFieldValue('angle');
        var number_speed = block.getFieldValue('speed');
        var code = `origaker.set_joint3(leg_number=${dropdown_leg_number}, angle=${number_angle}, speed=${number_speed})
`;
        return code;
    };

    Blockly.Python['get_joint'] = function (block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var dropdown_leg_number = block.getFieldValue('leg_number');
      var dropdown_joint_number = block.getFieldValue('joint_number');
      // TODO: Assemble Python into code variable.
        var code = `origaker.get_joint(leg_number=${dropdown_leg_number}, joint=${dropdown_joint_number})`;
      // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
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

    Blockly.Python['set_twist'] = function (block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var number_angle = block.getFieldValue('angle');
      var number_speed = block.getFieldValue('speed');
        // TODO: Assemble Python into code variable.
      var code = `origaker.set_gecko_shape_twist(angle=${number_angle}, speed=${number_speed})
`;
      return code;
    };

    Blockly.Python['set_expandable'] = function (block) {
      Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
      var value_expandable_lists = Blockly.Python.valueToCode(block, 'expandable_lists', Blockly.Python.ORDER_ATOMIC);
      var number_speed = block.getFieldValue('speed');
      var code = `origaker.set_gecko_shape_expandable(angle_list=${value_expandable_lists}, speed=${number_speed})
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

  Blockly.Python['exec_action'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_action = block.getFieldValue('action_name');
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble JavaScript into code variable.
    var code = `origaker.exe_action(action_name=${dropdown_action}, speed=${number_speed})
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
    var dropdown_laser_id = block.getFieldValue('laser_id');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_laser_distance(laser_id=${dropdown_laser_id})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['laser_state'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_laser_id = block.getFieldValue('laser_id');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_laser_state(laser_id=${dropdown_laser_id})`;
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
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    var dropdown_led_number = block.getFieldValue('led_number');
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_led_color(leg_number=${dropdown_leg_number}, led=${dropdown_led_number}, color=${value_color})
`;
    return code;
  };

  Blockly.Python['led_on'] = function (block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var value_leg_numner = Blockly.Python.valueToCode(block, 'leg_numner', Blockly.Python.ORDER_ATOMIC);
    var value_led_number = Blockly.Python.valueToCode(block, 'led_number', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
      var code = `origaker.set_led_on(leg_number=${value_leg_numner}, led=${value_led_number})
`;
    return code;
  };

    Blockly.Python['led_off'] = function (block) {
        Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
        var value_leg_numner = Blockly.Python.valueToCode(block, 'leg_numner', Blockly.Python.ORDER_ATOMIC);
        var value_led_number = Blockly.Python.valueToCode(block, 'led_number', Blockly.Python.ORDER_ATOMIC);
        // TODO: Assemble Python into code variable.
        var code = `origaker.set_led_off(leg_number=${value_leg_numner}, led=${value_led_number})
`;
        return code;
    };

  Blockly.Python['led_init'] = function (block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_led_init(leg_number=${dropdown_leg_number})
`;
    return code;
  };

  Blockly.Python['leds_frequency'] = function (block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_mode = block.getFieldValue('mode');
    var value_frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `origaker.set_leds_frequency(mode=${dropdown_mode}, frequency=${value_frequency})
`;
    return code;
  };

  Blockly.Python['get_leds_mode'] = function (block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_leds_mode(leg_number=${dropdown_leg_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['get_leds_state'] = function (block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
    var dropdown_leg_number = block.getFieldValue('leg_number');
    // TODO: Assemble Python into code variable.
    var code = `origaker.get_leds_state(leg_number=${dropdown_leg_number})`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['classic_style'] = function(block) {
    Blockly.Python.definitions_['import_origaker'] = 'from robot import origaker';
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

  Blockly.Python['controller_baud_init'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var dropdown_baud = block.getFieldValue('baud');
    // TODO: Assemble Python into code variable.
    var code = `se.baudrate_init(baud=${dropdown_baud})
`;
    return code;
  };

  Blockly.Python['set_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = block.getFieldValue('mode');
    // TODO: Assemble Python into code variable.
    var code = `se.set_mode(id_num=${value_id_num}, mode=${dropdown_mode})
`;
    return code;
  };

  Blockly.Python['set_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_angle = block.getFieldValue('angle');
    var number_step = block.getFieldValue('step');
    var code = `se.set_angle(id_num=${value_id_num}, angle=${number_angle}, step=${number_step})
`;
    return code;
  };

  Blockly.Python['set_servo_angles'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_list = Blockly.Python.valueToCode(block, 'id_list', Blockly.Python.ORDER_ATOMIC);
    var value_angle_list = Blockly.Python.valueToCode(block, 'angle_list', Blockly.Python.ORDER_ATOMIC);
    var number_step = block.getFieldValue('step');
    // TODO: Assemble Python into code variable.
    var code = `se.set_angles(id_list=${value_id_list}, angle_list=${value_angle_list}, step=${number_step})
`;
    return code;
  };

  Blockly.Python['set_wheel_speed'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `se.set_speed(id_num=${value_id_num}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['set_servo_id'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_new_id = block.getFieldValue('new_id');
    // TODO: Assemble Python into code variable.
    var code = `se.set_id(id_num=${value_id_num}, new_id=${number_new_id})
`;
    return code;
  };

  Blockly.Python['set_servo_baud'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var dropdown_baud = block.getFieldValue('baud');
    var dropdown_servo_type = block.getFieldValue('servo_type');
    // TODO: Assemble Python into code variable.
    var code = `se.set_baud(id_num=${value_id_num}, baud=${dropdown_baud}, servo_type=${dropdown_servo_type})
`;
    return code;
  };

  Blockly.Python['set_servo_pid'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_pid = block.getFieldValue('pid');
    // TODO: Assemble Python into code variable.
    var code = `se.set_pid(id_num=${value_id_num}, pid=${number_pid})
`;
    return code;
  };

  Blockly.Python['servo_factory_reset'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.factory_reset(id_num=${value_id_num})
`;
    return code;
  };

  Blockly.Python['ping_state'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.ping_state(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_angle(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_servo_mode'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_mode(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['set_exact_speed'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_speed = block.getFieldValue('speed');
    // TODO: Assemble Python into code variable.
    var code = `se.set_exact_speed(id_num=${value_id_num}, speed=${number_speed})
`;
    return code;
  };

  Blockly.Python['step_servo_angle'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_angle = block.getFieldValue('angle');
    var number_step = block.getFieldValue('step');
    // TODO: Assemble Python into code variable.
    var code = `se.step_angle(id_num=${value_id_num}, angle=${number_angle}, step=${number_step})
`;
    return code;
  };

  Blockly.Python['get_servo_speed'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_speed(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['set_servo_torque'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    var number_torque = block.getFieldValue('torque');
    // TODO: Assemble Python into code variable.
    var code = `se.set_torque(id_num=${value_id_num}, torque=${number_torque})
`;
    return code;
  };

  Blockly.Python['get_servo_torque'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_current(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['get_servo_temp'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_temp(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
  
  Blockly.Python['get_servo_voltage'] = function(block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo_rpi as se';
    var value_id_num = Blockly.Python.valueToCode(block, 'id_num', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = `se.get_voltage(id_num=${value_id_num})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
}