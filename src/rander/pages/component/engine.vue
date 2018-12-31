<template>
    <div id="operation"  @click.stop
        class="tooltip bs-tooltip-top" style="position: absolute;top: -90px;left: -225px; display: block;opacity:1">
        <div class="arrow" style="left:233px"></div>
        <div class="tooltip-inner">
            <div class="mt-2">
                <b-row class="mx-0">
                    <b-col cols="2">角度：</b-col>
                    <b-col>
                        <b-form-slider v-model="servo.angle"
                            trigger-change-event :min="min" :max="max" :step="0.1" @slideStop="updateAngle($event, index - 0 + 1)"></b-form-slider>
                            <span style="display: inline-block;width: 5em">{{servo.angle}}</span>
                    </b-col>
                </b-row>
                <b-form-group
                    horizontal
                    :label-cols="2"
                    label="阻尼:">
                    <b-form-radio-group
                        size="sm"
                        v-model="damperMode.mode"
                        :options="options"
                        @change="updateDamper($event, index - 0 + 1)"
                        plain />
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['servo', 'index', 'damperMode'],
    data() {
		return {
			min: -180,
			max: 180,
			options: [
				{ text: this.$t('robot.damp'), value: 'damp'},
				{ text: this.$t('robot.free'), value: 'free'},
				{ text: this.$t('robot.lock'), value: 'lock'},
            ],
		}
    },
    methods: {
		updateDamper(newMode, index) {
            this.$api.changeServoMode({
				data: {
					mode: newMode,
					id: index
				}
			});
        },
        updateAngle(newValue, index) {
			const message = {
				angle: newValue,
				id: index
            };

            this.damperMode.mode = 'lock';
			
            this.$emit('angle-changed', message);
        }
	},
}
</script>

<style lang="less" scoped>
#operation {
    .tooltip-inner {
        width: 450px;
        max-width: 450px;
        height: 80px;
    }
}
</style>


