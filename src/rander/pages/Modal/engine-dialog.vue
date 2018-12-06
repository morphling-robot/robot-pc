<template>
	<b-modal
		id="engineModal"
		size="lg"
		:title="$t('robot.engine.calibration')"
		hide-footer
        @hidden="emptySetList"
		no-close-on-backdrop>
        <b-button @click="allSelect">
            全部标定
        </b-button>
        <div id="content">
            <span class="point" v-for="(item, index) in styleObject" :key="index"
                :style="styleObject[index]" @click="resetPoint(index - 0 + 1)"
                :class="{'active': setList.indexOf(index - 0 + 1) !== -1}">
                <span class="number">{{index - 0 + 1}}</span><br />
            </span>
        </div>
	</b-modal>
</template>

<script>
import adjusterMap from '../component/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';

export default {
    data() {
        return {
            styleObject: null,
            setList: []
        }
    },
    methods: {
        resetPoint(index) {
            if (this.setList.indexOf(index) === -1) {
                this.$api.calibrateServo({
                    data: {
                        id: index
                    }
                });

                this.setList.push(index);
            }
        },
        emptySetList() {
            this.setList = [];
        },
        allSelect() {
            const arr = new Array(17).fill(0);
            this.setList = [];


            arr.forEach((item, index) => {
                this.setList.push(index + 1);

                this.$api.calibrateServo({
                    data: {
                        id: index + 1
                    }
                });
            });
        }
    },
    created() {
		this.styleObject = genStyleObjectFromMap(adjusterMap);
	}
}
</script>

<style lang="less" scoped>
#engineModal {
    #content {
        background-image: url("../../../../asset/images/example.jpg");
        background-size: 100% 100%;
        background-origin: 20px 0;
        background-repeat: no-repeat;
        width: 530.66px;
        height: 440px;
        position: relative;
        margin: 0 auto;
    }

	.point {
		display: inline-block;
		height: 30px;
		width: 31px;
		background-color: #000;
		position: absolute;
		color: #fff;
		font-size: 13px;
        text-align: center;
        cursor: pointer;

		.number {
            color: #efdada;
            line-height: 30px;
        }
        
    }
    
    .active {
        background-color: red !important;
        cursor: not-allowed;
    }
}
</style>


