module.exports = function (Blockly) {
	Blockly.Blocks['state_battery'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("机器人当前电量");
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['state_attitude'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("机器人当前姿态");
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['go_forward'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("前进");
			this.appendDummyInput()
					.appendField("机器人姿态")
					.appendField(new Blockly.FieldDropdown([["蜘蛛","spider"], ["壁虎","gecko"], ["小狗","puppy"], ["竹节虫","insert"]]), "attitude");
			this.appendValueInput("length")
					.setCheck("Number")
					.appendField("步数长度");
			this.appendValueInput("height")
					.setCheck("Number")
					.appendField("抬腿高度");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("步速");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_gecko'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("变成壁虎标准形态");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_gecko_take_waving'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("壁虎形态壁虎招手");
			this.appendValueInput("leg_number")
					.setCheck("Number")
					.appendField("小腿型号");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("速度");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_sensor'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("设置激光传感器ID");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "num");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_sensor_get_distance'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("获取障碍物距离");
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['light_on_time'] = {
		init: function() {
			this.appendValueInput("time")
					.setCheck("Number")
					.appendField("灯亮时间");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['light_on_rgb'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("腿上亮灯");
			this.appendDummyInput()
					.appendField(" 红")
					.appendField(new Blockly.FieldNumber(0, 0, 255), "R");
			this.appendDummyInput()
					.appendField(" 绿")
					.appendField(new Blockly.FieldNumber(0, 0, 255), "G");
			this.appendDummyInput()
					.appendField(" 蓝")
					.appendField(new Blockly.FieldNumber(0, 0, 255), "B");
			this.setInputsInline(false);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_speed'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("控制舵机");
			this.appendValueInput("id_num")
					.setCheck(null)
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("序号");
			this.appendValueInput("angle")
					.setCheck(null)
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("角度");
			this.appendValueInput("speed")
					.setCheck(null)
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("速度");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_body'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("控制机器人身体部件")
					.appendField(new Blockly.FieldDropdown([["小腿","leg"], ["腰部","lumber"], ["头部","head"], ["尾部","tail"]]), "part");
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['go_backward'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("后退");
			this.appendDummyInput()
					.appendField("机器人姿态")
					.appendField(new Blockly.FieldDropdown([["蜘蛛","spider"], ["壁虎","gecko"], ["小狗","puppy"], ["竹节虫","insert"]]), "attitude");
			this.appendValueInput("length")
					.setCheck("Number")
					.appendField("步数长度");
			this.appendValueInput("height")
					.setCheck("Number")
					.appendField("抬腿高度");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("步速");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['turn_left'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("左转");
			this.appendDummyInput()
					.appendField("机器人姿态")
					.appendField(new Blockly.FieldDropdown([["蜘蛛","spider"], ["壁虎","gecko"], ["小狗","puppy"], ["竹节虫","insert"]]), "attitude");
			this.appendValueInput("angle")
					.setCheck("Number")
					.appendField("转动角度");
			this.appendValueInput("height")
					.setCheck("Number")
					.appendField("抬腿高度");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("步速");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['turn_right'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("右转");
			this.appendDummyInput()
					.appendField("机器人姿态")
					.appendField(new Blockly.FieldDropdown([["蜘蛛","spider"], ["壁虎","gecko"], ["小狗","puppy"], ["竹节虫","insert"]]), "attitude");
			this.appendValueInput("angle")
					.setCheck("Number")
					.appendField("转动角度");
			this.appendValueInput("height")
					.setCheck("Number")
					.appendField("抬腿高度");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("步速");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_gecko_take_acceleration'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("壁虎形态壁虎波动");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_gecko_take_contractions'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("壁虎形态壁虎收缩");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_spider_take_waving'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("蜘蛛形态蜘蛛招手");
			this.appendValueInput("leg_number")
					.setCheck("Number")
					.appendField("小腿型号");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("速度");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_puppy_take_waving'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("小狗形态小狗招手");
			this.appendValueInput("leg_number")
					.setCheck("Number")
					.appendField("小腿型号");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("速度");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_insect_take_waving'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("竹节虫形态竹节虫招手");
			this.appendValueInput("leg_number")
					.setCheck("Number")
					.appendField("小腿型号");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("速度");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_insect'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("变成竹节虫标准形态");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_puppy'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("变成小狗标准形态");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_spider'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("变成蜘蛛标准形态");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_spider_take_acceleration'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("蜘蛛形态蜘蛛摇晃");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_puppy_take_nodding'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("小狗形态小狗点头");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_puppy_take_wagging'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("小狗形态小狗摇尾");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_puppy_take_sitting'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("小狗形态小狗坐下");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['goto_insect_take_hance'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("竹节虫形态竹节虫拱腰");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['go_upstairs'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("上楼");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['go_downstairs'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("下楼");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_dancing'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("跳舞");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_leg'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("设置小腿ID");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "num");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_legcurrent'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("返回小腿电流值");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_legstate'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("小腿")
					.appendField(new Blockly.FieldDropdown([["是","true"], ["否","false"]]), "true")
					.appendField("正常接触地面");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_remora'] = {
		init: function() {
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([["是","true"], ["否","false"]]), "true")
					.appendField("检测到障碍物");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['start_introducing'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("自我介绍");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_servo_state'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("查询舵机当前状态");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_servo_state'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("查询舵机当前状态");
			this.appendValueInput("id_num")
					.setCheck("Number")
					.appendField("舵机ID");
			this.appendValueInput("angle")
					.setCheck("Number")
					.appendField("para_num");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("para_num");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_servo_speed'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("控制舵机");
			this.appendValueInput("id_num")
					.setCheck("Number")
					.appendField("舵机ID");
			this.appendValueInput("angle")
					.setCheck("Number")
					.appendField("角度");
			this.appendValueInput("speed")
					.setCheck("Number")
					.appendField("转速");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_servo_angle'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("查询舵机当前角度");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['get_servo_mode'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("查询舵机模式");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['set_servo_mode'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("控制舵机");
			this.appendValueInput("id_num")
					.setCheck("Number")
					.appendField("舵机ID");
			this.appendDummyInput()
					.appendField("模式")
					.appendField(new Blockly.FieldDropdown([["轮子","轮子"], ["掉电","掉电"], ["阻尼","阻尼"], ["锁死","锁死"]]), "mode");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};

	Blockly.Blocks['start_talking'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("播放MP3");
			this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([["it’s dancing time!","it’s dancing time!"], ["前方有障碍物","前方有障碍物"], ["我要开始爬楼梯啦","我要开始爬楼梯啦"], ["摸摸我的头，心情会变好哦","摸摸我的头，心情会变好哦"]]), "string");
			this.setInputsInline(true);
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
}