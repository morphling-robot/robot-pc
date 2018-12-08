<template>
  <div class="w-100">
	<b-row class="mx-0">
		<b-col cols="2">
					速率：
		</b-col>
		<b-col>
			<action-progress id="progress" :value="frameSpeed.speed"
				:min="1" :max="10"
				@update-progress="updateSpeed($event)" pointTarget="1"></action-progress>
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
			<div id="operation" @mouseenter.stop.prevent="pointTarget = index" @click.stop
				class="tooltip bs-tooltip-top" v-if="pointTarget == index" style="position: absolute;top: -90px;left: -225px; display: block;opacity:1">
				<div class="arrow" style="left:233px"></div>
				<div class="tooltip-inner">
					<div class="mt-2">
						<b-row class="mx-0">
							<b-col cols="2">角度：</b-col>
							<b-col>
								<action-progress :id="`progress-${index}`" :value="servo.angle"
									:min="min" :max="max"
									@update-progress="updateAngle($event, servo, index)" :pointTarget="pointTarget"></action-progress>
							</b-col>
						</b-row>
						<b-form-group
							horizontal
							:label-cols="2"
							label="阻尼:">
							<b-form-radio-group
								size="sm"
								v-model="damperModeList[index].mode"
								:options="options"
								@change="updateDamper($event, index)"
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

import ActionProgress from '@/utils/Progress.vue';

export default {
	data() {
		return {
			styleObject: null,
			min: -180,
			max: 180,
			pointTarget: -1,
			options: [
				{ text: '有阻尼', value: 'damp' },
				{ text: '无阻尼', value: 'free' },
				{ text: '锁死', value: 'lock', }
			],
			follow: true
		}
	},
	components: {ActionProgress},
	props: ['frame', 'damperModeList', 'frameSpeed'],
	methods: {
		updateAngle(changedValue, servo, index) {
			servo.angle = changedValue;
			const message = {
				angle: changedValue,
				speed: this.frameSpeed.speed,
				index
			};console.log(message);
			if (this.follow) {
				this.$emit('angle-changed', message);
			}
		},
		updateSpeed(changed) {
			this.frameSpeed.speed = changed;
			this.$emit('speed-changed', changed);
		},
		updateDamper(newMode, index) {console.log(newMode, index);
			this.$emit('mode-changed', {
				index,
				mode: newMode
			});
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

