<template>
  <div class="w-100">
	<b-row class="mx-0">
		<b-col cols="2">
					速率：
		</b-col>
		<b-col>
			<action-progress id="progress" :value="speed"
				:min="min" :max="max"
				@update-progress="updatespeed" pointTarget="1"></action-progress>
		</b-col>
		<b-col class="d-flex justify-content-end" cols="3">
			<b-form-checkbox
				v-model="follow"
				:value="true"
                :unchecked-value="false">
				跟随
			</b-form-checkbox>
		</b-col>
	</b-row>
	<div id="adjust" @mouseleave="pointTarget = -1">
		<span class="point" v-for="(servo, index) in frame" :key="index"
			:style="styleObject[index]" @mouseenter.stop.prevent="pointTarget = index">
			<span class="number">{{index + 1}}</span><br />
			<span>{{Math.round(servo.angle * 10) / 10}}</span>
			<div id="operation" @mouseenter.stop.prevent="pointTarget = index" @click.stop.prevent
				class="tooltip bs-tooltip-top" v-if="pointTarget == index" style="position: absolute;top: -90px;left: -225px; display: block;opacity:1">
				<div class="arrow" style="left:233px"></div>
				<div class="tooltip-inner">
					<div class="mt-2">
						<b-row class="mx-0">
							<b-col cols="2">角度：</b-col>
							<b-col>
								<action-progress :id="`progress-${index}`" :value="servo.angle"
									:min="min" :max="max"
									@update-progress="updateAngle($event, servo)" :pointTarget="pointTarget"></action-progress>
							</b-col>
						</b-row>
						<b-form-group
							horizontal
							:label-cols="2"
							label="阻尼:">
							<b-form-radio-group
								size="sm"
								v-model="servo.damper"
								:options="options"
								plain />
						</b-form-group>
					</div>
				</div>
			</div>
		</span>
	</div>
  </div>
</template>

<script>
import adjusterMap from '../component/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';
import { throws } from 'assert';
import { constants } from 'http2';

import ActionProgress from '@/utils/Progress.vue';

export default {
	data() {
		return {
			styleObject: null,
			min: -100,
			max: 100,
			pointTarget: -1,
			options: [
				'有阻尼', '无阻尼', '锁死'
			],
			follow: true,
			speed: 10
		}
	},
	components: {ActionProgress},
	props: ['frame'],
	methods: {
		updateAngle(changedValue, servo) {
			servo.angle = changedValue;
		},
		updatespeed(changed) {
			this.speed = changed;
		}
	},
	created() {
		this.styleObject = genStyleObjectFromMap(adjusterMap);
	}
}
</script>

<style lang="less" scoped>
#adjust {
	background-image: url("../../../../asset/images/example.jpg");
	background-size: 100% 100%;
	background-origin: 20px 0;
	background-repeat: no-repeat;
	width: 100%;
	height: 440px;
	position: relative;

	.point {
		display: inline-block;
		height: 30px;
		width: 31px;
		background-color: #000;
		position: absolute;
		color: #fff;
		font-size: 11px;
		text-align: center;

		.number {
			color: #efdada;
		}
	}

	#msg {
		.tooltip-inner {
			width: 30px;
			height: 30px;
		}
	}

	#operation {

		.tooltip-inner {
			width: 450px;
			max-width: 450px;
			height: 80px;
		}
	}


}
</style>

