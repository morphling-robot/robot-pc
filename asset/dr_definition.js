module.exports = function (Blockly) {
	Blockly.Blocks['state_battery'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("读取机器人当前电量");
			this.setOutput(true, "Number");
			this.setColour(230);
	 this.setTooltip("");
	 this.setHelpUrl("");
		}
	};
	
	Blockly.Blocks['state_attitude'] = {
		init: function() {
			this.appendDummyInput()
					.appendField("读取机器人当前姿态");
			this.setOutput(true, "Number");
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
            .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
        this.appendDummyInput()
            .appendField("移动距离")
            .appendField(new Blockly.FieldNumber(100, 0, 160, 1), "length");
        this.appendDummyInput()
            .appendField("抬腿高度")
            .appendField(new Blockly.FieldNumber(50, 0, 60, 1), "height");
        this.appendDummyInput()
            .appendField("运动速度")
            .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(130);
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
            .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
        this.appendDummyInput()
            .appendField("移动距离")
            .appendField(new Blockly.FieldNumber(100, 0, 160, 1), "length");
        this.appendDummyInput()
            .appendField("抬腿高度")
            .appendField(new Blockly.FieldNumber(50, 0, 60, 1), "height");
        this.appendDummyInput()
            .appendField("运动速度")
            .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(130);
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
            .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
        this.appendDummyInput()
            .appendField("转动角度")
            .appendField(new Blockly.FieldNumber(30, 0, 45, 1), "angle")
            .appendField("°");
        this.appendDummyInput()
            .appendField("抬腿高度")
            .appendField(new Blockly.FieldNumber(50, 0, 60, 1), "height");
        this.appendDummyInput()
            .appendField("运动速度")
            .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
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
            .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
        this.appendDummyInput()
            .appendField("转动角度")
            .appendField(new Blockly.FieldNumber(30, 0, 45, 1), "angle")
            .appendField("°");
        this.appendDummyInput()
            .appendField("抬腿高度")
            .appendField(new Blockly.FieldNumber(50, 0, 60, 1), "height");
        this.appendDummyInput()
            .appendField("运动速度")
            .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
     this.setTooltip("");
     this.setHelpUrl("");
      }
    };

    Blockly.Blocks['rotate_pitch'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("俯仰");
        this.appendDummyInput()
            .appendField("机器人姿态")
            .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
        this.appendDummyInput()
            .appendField("俯仰角度")
            .appendField(new Blockly.FieldNumber(10, -15, 15, 1), "angle")
            .appendField("°");
        this.appendDummyInput()
            .appendField("运动速度")
            .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
     this.setTooltip("");
     this.setHelpUrl("");
      }
	};
	
	Blockly.Blocks['rotate_roll'] = {
		init: function() {
		  this.appendDummyInput()
			  .appendField("摇摆");
		  this.appendDummyInput()
			  .appendField("机器人姿态")
			  .appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude");
		  this.appendDummyInput()
			  .appendField("摇摆角度")
			  .appendField(new Blockly.FieldNumber(10, -15, 15, 1), "angle")
			  .appendField("°");
		  this.appendDummyInput()
			  .appendField("运动速度")
			  .appendField(new Blockly.FieldNumber(1, 0.1, 5, 0.1), "speed");
		  this.setInputsInline(true);
		  this.setPreviousStatement(true, null);
		  this.setNextStatement(true, null);
		  this.setColour(230);
	   this.setTooltip("");
	   this.setHelpUrl("");
		}
	  };

	Blockly.Blocks['goto_shape'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("变成标准");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["壁虎","\"gecko\""], ["蜘蛛","\"spider\""], ["竹节虫","\"stick\""], ["小狗","\"dog\""]]), "attitude")
				.appendField("形态");
			this.appendDummyInput()
				.appendField("速度")
				.appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};

	Blockly.Blocks['gecko_show'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("壁虎");
			this.appendDummyInput()
				.appendField("表演");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["摇滚","\"roll_body\""], ["收缩","\"pack\""], ["伸展","\"unpack\""], ["招手","\"shake_hand\""]]), "action");
			this.appendDummyInput()
				.appendField("速度")
				.appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(180);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};

	
	Blockly.Blocks['spider_show'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("蜘蛛");
			this.appendDummyInput()
				.appendField("表演");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["摇摆","\"rotate_body\""], ["扭腰","\"shake_body\""], ["招手","\"shake_hand\""]]), "action");
			this.appendDummyInput()
				.appendField("速度")
				.appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(180);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};


	Blockly.Blocks['stick_show'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("竹节虫");
			this.appendDummyInput()
				.appendField("表演");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["拱腰","\"arch_body\""], ["招手","\"shake_hand\""],["上楼","\"go_upstairs\""], ["下楼","\"go_downstairs\""]]), "action");
			this.appendDummyInput()
				.appendField("速度")
				.appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(180);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};


	Blockly.Blocks['dog_show'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("小狗");
			this.appendDummyInput()
				.appendField("表演");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["点头","\"nod_head\""], ["摇尾","\"lash_tail\""], ["招手","\"shake_hand\""],["坐下","\"sit_down\""],["起立","\"sit_up\""]]), "action");
			this.appendDummyInput()
				.appendField("速度")
				.appendField(new Blockly.FieldNumber(0.5, 0.1, 5, 0.1), "speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(180);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};

	Blockly.Blocks['dance'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("表演舞蹈");
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([["海草舞","\"seaweed\""], ["极净乐土","\"paradise\""], ["广播体操","\"exercise\""], ["欢乐颂","\"happiness\""]]), "dance_number");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(300);
		this.setTooltip("");
		this.setHelpUrl("");
		}
	};
	

Blockly.Blocks['laser_distance'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("获取");
		this.appendValueInput("laser_id")
			.setCheck("Number")
			.appendField("第");
		this.appendDummyInput()
			.appendField("号激光传感器障碍物距离");
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setColour(230);
	this.setTooltip("离障碍物的距离");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['laser_state'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("读取");
		this.appendValueInput("laser_id")
			.setCheck("Number")
			.appendField("第");
		this.appendDummyInput()
			.appendField("号激光传感器前方状态");
		this.setInputsInline(true);
		this.setOutput(true, "Boolean");
		this.setColour(210);
	this.setTooltip("前方是否有障碍物(True/False)");
	this.setHelpUrl("");
	}
};

Blockly.Blocks['torque_value'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("获取");
	  this.appendDummyInput()
		  .appendField("第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number");
	  this.appendDummyInput()
		  .appendField("条腿力矩传感器值");
	  this.setInputsInline(true);
	  this.setOutput(true, "Number");
	  this.setColour(230);
   this.setTooltip("获取小腿关节实时力矩大小");
   this.setHelpUrl("");
	}
  };


Blockly.Blocks['land_state'] = {
init: function() {
	this.appendDummyInput()
		.appendField("读取");
	this.appendDummyInput()
		.appendField("第")
		.appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number");
	this.appendDummyInput()
		.appendField("条腿着地状态");
	this.setInputsInline(true);
	this.setOutput(true, "Boolean");
	this.setColour(210);
this.setTooltip("是否着地(True/False)");
this.setHelpUrl("");
}
};

Blockly.Blocks['touch_type'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("获取");
	  this.appendDummyInput()
		  .appendField("第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "trunk_number");
	  this.appendDummyInput()
		  .appendField("块躯干感应区被触摸方式");
	  this.setInputsInline(true);
	  this.setOutput(true, "Number");
	  this.setColour(230);
   this.setTooltip("返回触摸方向（+/-）及快慢(1-3)");
   this.setHelpUrl("");
	}
  };


Blockly.Blocks['touch_state'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("读取");
	  this.appendDummyInput()
		  .appendField("第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "trunk_number");
	  this.appendDummyInput()
		  .appendField("块躯干感应区被触碰状态");
	  this.setInputsInline(true);
	  this.setOutput(true, "Boolean");
	  this.setColour(210);
   this.setTooltip("是否被触碰(True/False)");
   this.setHelpUrl("");
	}
};


Blockly.Blocks['leds_mode'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("设置");
	  this.appendDummyInput()
		  .appendField("第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number")
		  .appendField("条腿LED阵列为");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldDropdown([["常亮","1"], ["常灭","2"], ["闪烁","3"], ["呼吸灯","4"], ["流水灯","5"]]), "mode")
		  .appendField("模式");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(200);
   this.setTooltip("设置led灯阵列显示模式");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['leds_on_time'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("设置");
	  this.appendDummyInput()
		  .appendField("第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number")
		  .appendField("条腿LED阵列亮");
	  this.appendValueInput("time")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("秒");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(200);
   this.setTooltip("设置led灯点亮时长(秒)，-1表示一直亮");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['led_color'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("设置");
	  this.appendDummyInput()
		  .appendField("第");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number")
		  .appendField("条腿");
	  this.appendValueInput("color")
		  .setCheck("Color")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "led_number")
		  .appendField("号灯颜色为");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(200);
   this.setTooltip("设置led颜色，必须填入颜色");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['classic_style'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("<经典样式>");
	  this.appendValueInput("leg_list")
		  .setCheck("Array")
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("将 腿(列表)");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("设置成")
		  .appendField(new Blockly.FieldDropdown([["一缕晨光","\"morning\""], ["警车追逐","\"policeman\""], ["危险警告","\"warning\""]]), "style")
		  .appendField("样式");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(200);
   this.setTooltip("经典样式包括led灯的颜色、模式及点亮时间");
   this.setHelpUrl("");
	}
  };



  Blockly.Blocks['introduction'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("      <自我介绍>");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(300);
   this.setTooltip("自我介绍");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['robot_say'] = {
	init: function() {
	  this.appendValueInput("words")
		  .setCheck("String")
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("      机器人说");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(300);
   this.setTooltip("让机器人说话");
   this.setHelpUrl("");
	}
};


Blockly.Blocks['robot_play'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("      机器人播放歌曲")
		  .appendField(new Blockly.FieldDropdown([["沙漠骆驼","\"camel\""], ["白色球鞋","\"shoes\""], ["大海","“sea”"]]), "music");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(300);
   this.setTooltip("让机器人播放音乐");
   this.setHelpUrl("");
	}
};


Blockly.Blocks['set_leg_position'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("让");
	  this.appendDummyInput()
		  .appendField("第");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number")
		  .appendField("条腿运动到");
	  this.appendDummyInput()
		  .appendField("位置")
		  .appendField("x")
		  .appendField(new Blockly.FieldNumber(0, 0, 150, 0.1), "x")
		  .appendField("y")
		  .appendField(new Blockly.FieldNumber(0, -100, 100, 0.1), "y")
		  .appendField("z")
		  .appendField(new Blockly.FieldNumber(0, -150, 150, 0.1), "z");
	  this.appendDummyInput()
		  .appendField("  速度")
		  .appendField(new Blockly.FieldNumber(1.5, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(90);
   this.setTooltip("让腿足尖运动到指定位置（局部坐标系）");
   this.setHelpUrl("");
	}
  };

  Blockly.Blocks['set_leg_joints'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("控制第")
		  .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "leg_number")
		  .appendField("条腿3个关节");
	  this.appendValueInput("joints")
		  .setCheck("Array")
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("分别转动到 (角度列表)");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField(" 速度 ")
		  .appendField(new Blockly.FieldNumber(1.5, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(90);
   this.setTooltip("让腿三个关节运动到指定角度（关节1，关节2，关节3）");
   this.setHelpUrl("");
	}
  };

  Blockly.Blocks['change_gecko_shape'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("设置  壁虎")
		  .appendField("扭腰角度")
		  .appendField(new Blockly.FieldNumber(0, -30, 30, 0.1), "angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("速度")
		  .appendField(new Blockly.FieldNumber(1, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(180);
   this.setTooltip("改变壁虎腰躯干扭角");
   this.setHelpUrl("");
	}
  };

  
  Blockly.Blocks['change_spider_shape'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("设置  蜘蛛")
		  .appendField("躯干角度")
		  .appendField(new Blockly.FieldNumber(0, 30, 180, 0.1), "angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("速度")
		  .appendField(new Blockly.FieldNumber(1, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(180);
   this.setTooltip("改变蜘蛛腰躯干夹角");
   this.setHelpUrl("");
	}
  };

  Blockly.Blocks['change_stick_shape'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("设置  竹节虫")
		  .appendField("弯曲角度")
		  .appendField(new Blockly.FieldNumber(0, 0, 180, 0.1), "angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("速度")
		  .appendField(new Blockly.FieldNumber(1, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(180);
   this.setTooltip("改变竹节虫拱仰角度");
   this.setHelpUrl("");
	}
  };


  Blockly.Blocks['change_dog_shape'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("设置小狗形态")
		  .appendField("头部")
		  .appendField(new Blockly.FieldNumber(90, 60, 150, 0.1), "head_angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("躯干")
		  .appendField(new Blockly.FieldNumber(180, 30, 240, 0.1), "body_angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("尾部")
		  .appendField(new Blockly.FieldNumber(90, 60, 150, 0.1), "tail_angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_RIGHT)
		  .appendField("速度")
		  .appendField(new Blockly.FieldNumber(1, 0.1, 10, 0.1), "speed");
	  this.setInputsInline(false);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(180);
   this.setTooltip("改变小狗形态下的头部、躯干及尾部角度");
   this.setHelpUrl("");
	}
};


Blockly.Blocks['set_servo_mode'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("设置");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机为");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldDropdown([["阻尼","1"], ["锁死","2"], ["掉电","3"], ["轮子","4"]]), "mode")
		  .appendField("模式");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(340);
   this.setTooltip("设置舵机模式");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['set_servo_angle'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("控制");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机转动到");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldNumber(135, 0, 270, 0.1), "angle")
		  .appendField("°");
	  this.appendDummyInput()
		  .appendField("-  速度")
		  .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), "step");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(340);
   this.setTooltip("设置舵机角度");
   this.setHelpUrl("");
	}
  };


Blockly.Blocks['set_wheel_speed'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("控制");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机以速度");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldNumber(500, -1000, 1000, 1), "speed")
		  .appendField("整周转动");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(340);
   this.setTooltip("控制舵机轮子模式下的速度：正数表示正转，负数表示反转，0表示停止");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['set_servo_id'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("将");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机ID号改为");
	  this.appendDummyInput()
		  .appendField(new Blockly.FieldNumber(1, 0, 120, 1), "new_id")
		  .appendField("号");
	  this.setInputsInline(true);
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(340);
   this.setTooltip("修改舵机ID号");
   this.setHelpUrl("");
	}
};
	
Blockly.Blocks['ping_state'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("返回");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机在线状态");
	  this.setInputsInline(true);
	  this.setOutput(true, "Boolean");
	  this.setColour(210);
   this.setTooltip("查看舵机是否在线(True/False)");
   this.setHelpUrl("");
	}
  };

Blockly.Blocks['get_servo_angle'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("读取");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机当前角度");
	  this.setInputsInline(true);
	  this.setOutput(true, "Number");
	  this.setColour(230);
   this.setTooltip("返回舵机当前角度");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['get_servo_mode'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("读取");
	  this.appendValueInput("id_num")
		  .setCheck("Number");
	  this.appendDummyInput()
		  .appendField("号舵机当前模式");
	  this.setInputsInline(true);
	  this.setOutput(true, "Number");
	  this.setColour(230);
   this.setTooltip("查看舵机模式（1-阻尼模式，2-锁死模式，3-掉电模式，4-轮子模式）");
   this.setHelpUrl("");
	}
};

Blockly.Blocks['exec_action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("执行动作");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"], ["option","OPTIONNAME"], ["option","OPTIONNAME"]]), "action_name");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
}