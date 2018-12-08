<template>
    <b-row>
        <b-col cols="1"  class="text-center">
            <i class="fas fa-minus-circle" @click="savePosition($event, value - ratio)"></i>
        </b-col>
        <b-col class="pr-0">
            <b-progress :id="id" :min="0" :max="computedMax" show-progress style="height:15px;margin-top: 4px"
                @mousemove.native.prevent="changeValue" @mouseup.native.prevent="init" @mouseleave.native.prevent="init">
                <b-progress-bar ref="bar" variant="primary" :value="realValue">{{computedValue}}</b-progress-bar>
                <div class="slider"  style="cursor: pointer"
                    v-b-tooltip.hover.top :title="computedValue"
                    @mousedown.prevent="setStartX($event, computedValue)"></div>
            </b-progress>
        </b-col>
        <b-col cols="1" class="text-center">
            <i class="fas fa-plus-circle" @click="savePosition($event, value + ratio)"></i>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            startValue: null,
            isDrag: false,
            startX: null
        }
    },
    props: ['value', 'id', 'pointTarget', 'min', 'max'],
    computed: {
		progressLength() {

			if (typeof this.pointTarget === 'undefined' || this.pointTarget === -1) {
				return;
			}

			return document.getElementById(this.id).offsetWidth;
        },
        computedValue() {
            return Math.ceil(this.value * 10) / 10;
        },
        computedMax() {
            if (this.min < 0) {

                return Math.abs(this.min) + this.max;
            }

            return this.max;
        },
        realValue() {
            return this.min > 0 ? this.value : this.value + Math.abs(this.min)
        },
        ratio() {
            return this.max <= 1 ? 0.1 : 1;
        }
	},
	methods: {
		savePosition(event, value) {
            if (value < this.min) {
                this.$emit('update-progress', this.min);
                return;
            }

            if (value > this.max) {
                this.$emit('update-progress', this.max);
                return;
            }

            this.$emit('update-progress', value);
        },
        changeValue($event) {
            if (this.isDrag) {
                const newValue = this.startValue + this.max * (($event.clientX - this.startX)/ this.progressLength);
                this.savePosition($event, Math.ceil(newValue * 10) / 10);
            }
        },
        setStartX(event, value) {
            this.isDrag = true;
            this.startValue = value;
            this.startX = event.clientX;
        },
        init() {
           this.isDrag = false;
           this.startValue = null;
           this.startX = null;
        }
	},
}
</script>

<style lang="less" scoped>
.progress {
    overflow: visible;
    .progress-bar {
        transition: none;
    }
}
.slider {
    width: 20px;
    height: 20px;
    margin-left: -4px;
    margin-top: -2px;
    background-color: #00bbff;
    border-radius: 50%;
}
</style>

