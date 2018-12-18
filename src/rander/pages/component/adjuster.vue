<template>
  <div class="w-100">
	<b-row class="mx-0">
		<b-col cols="3" style="text-align: right" class="pr-0">
					帧速率：
		</b-col>
		<b-col class="pr-0">
			<b-form-slider v-model="frameSpeed.speed"
				trigger-change-event :min="1" :max="100" :step="1" @change="updateSpeed"></b-form-slider>
			<span style="display: inline-block;width: 4em;text-align: center">{{frameSpeed.speed}}</span>
		</b-col>
		<b-col class="d-flex justify-content-end pl-0" cols="2">
			<b-form-checkbox
				v-model="follow"
				:value="true"
                :unchecked-value="false">
				跟随
			</b-form-checkbox>
		</b-col>
	</b-row>
	<div id="adjust" @mouseleave="pointTarget = -1">
		<span class="point" v-for="(item, index) in styleObject" :key="index"
			:style="styleObject[index]" @mouseenter.stop.prevent="pointTarget = index">
			<span class="number">{{index - 0 + 1}}</span><br />
			<span>{{Math.round(changedFrame[index].angle * 10) / 10}}</span>
			<engine  @mouseenter.stop.prevent="pointTarget = index"  v-if="pointTarget == index"
				:servo="changedFrame[index]" :index="index"
				@angle-changed="updateAngle"
				:damperModeList="damperModeList" />
		</span>
	</div>
  </div>
</template>

<script>
import adjusterMap from '../component/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';

import Engine from './engine.vue';

export default {
	data() {
		return {
			styleObject: null,
			pointTarget: -1,
			follow: true
		}
	},
	components: {Engine},
	props: ['frame', 'frameSpeed', 'damperModeList'],
	methods: {
		updateAngle(value) {
			const message = Object.assign({
				speed: this.frameSpeed.speed	
			}, value);
			
			// 连接口
			if (this.follow) {
				this.$api.changeServoAngle({
					data: message
				});
			}
		},
		updateSpeed(changed) {
			this.frameSpeed.speed = changed.newValue; 

			// 连接口
		}
	},
	computed: {
		changedFrame() {
			return this.frame;
		}
	},
	watch: {
		follow() {
			if (this.follow) {
				this.$api.changeServoMode({
					data: {
						id: 121,
						mode: 'lock'
					}
				}).then(() => {

					this.$emit('mode-init');
				});

			}
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

}
</style>

