<template>
	<b-modal
		id="engineModal"
		size="lg"
		:title="$t('robot.engine.calibration')"
		hide-footer
        @hidden="emptySetList"
		no-close-on-backdrop>
        <b-row>
            <b-col>
                <b-button @click="allSelect" size="sm">
                    全部标定
                </b-button>
            </b-col>
            <b-col cols="auto">
                 <b-form-slider v-model="speed"
                    trigger-change-event :min="1" :max="100" :step="1" @change="updateSpeed"></b-form-slider>
                <span style="display: inline-block;width: 4em;text-align: center">{{speed}}</span>
            </b-col>
            <b-col cols="3">
                <b-input-group
                    size="sm">
                    <b-input-group-prepend>
                        <b-btn
                            @click="setAllServo"
                            variant="success"><i
                                class="fas fa-sync-alt" />
                        </b-btn>
                    </b-input-group-prepend>
                    <b-dropdown
                        split
                        :text="selectedMode.text"
                        size="sm">
                        <b-dropdown-item
                            v-for="(mode, index) in modeList"
                            :key="index"
                            @click="changeSelectedMode(mode)">
                            {{mode.text}}
                        </b-dropdown-item>
                    </b-dropdown>
                </b-input-group>
            </b-col>
            <b-col cols="2">
                 <b-form-checkbox
                    v-model="follow"
                    :value="true"
                    :unchecked-value="false">
                    跟随
                </b-form-checkbox>
            </b-col>
        </b-row>
       
        <div id="content"  @mouseleave="pointTarget = -1">
            <span class="point" v-for="(item, index) in styleObject" :key="index"
                :style="styleObject[index]" @click="resetPoint(index - 0 + 1)"
                :class="{'active': setList.indexOf(index - 0 + 1) !== -1}" @mouseenter.stop.prevent="pointTarget = index">
                <span class="number">{{index - 0 + 1}}</span><br />
                <engine  @mouseenter.stop.prevent="pointTarget = index"  v-if="pointTarget == index"
				    :servo="frame[index]" :index="index" @angle-changed="updateAngle"
                    :damperModeList="damperModeList" :disabled="follow" />
            </span>
        </div>
	</b-modal>
</template>

<script>
import adjusterMap from '../../config/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';

import Engine from '../component/engine.vue';

const damperMode = [];

for (let i = 0; i < 17; i++) {
	damperMode.push({mode: 'free'});
}

export default {
    data() {
        return {
            styleObject: null,
            setList: [],
            pointTarget: -1,
            frame: [{"angle":13},{"angle":23},{"angle":34},
                {"angle":45},{"angle":56},{"angle":12},{"angle":23},
                {"angle":34},{"angle":45},{"angle":56},{"angle":12},
                {"angle":23},{"angle":34},{"angle":45},{"angle":56},
                {"angle":88},{"angle":77}],
            speed: 10,
            selectedMode: { text: '无阻尼', value: 'free'},
            modeList: [
				{ text: '有阻尼', value: 'damp'},
				{ text: '无阻尼', value: 'free'},
				{ text: '锁定  ', value: 'lock'},
            ],
            follow: true,
            damperModeList: damperMode
        }
    },
    components: {Engine},
    methods: {
        resetPoint(index) {
            if (this.setList.indexOf(index) === -1) {
                this.$api.calibrateServo({
                    data: {
                        id: index
                    }
                });

                this.setList.push(index);

                this.getCurrentFrame();

            }
        },
        emptySetList() {
            this.setList = [];
        },
        allSelect() {
            const arr = new Array(17).fill(0);
            this.setList = [];

            this.$api.calibrateServo({
                data: {
                    id: 121
                }
            });
            arr.forEach((item, index) => {
                this.setList.push(index + 1);

            });

            this.getCurrentFrame();
        },
        getCurrentFrame() {
            this.$api.getFrame().then(data => {
                if (data) {

                    this.frame = data;
                }
            });
        },
        updateAngle(value) {
			const message = Object.assign({
				speed: this.speed	
			}, value);
			
			// 连接口
			if (this.follow) {
				this.$api.changeServoAngle({
					data: message
				});
			}
        },
        updateSpeed() {

        },
        setAllServo() {
			this.$api.changeServoMode({
				data: {
					id: 121,
					mode: this.selectedMode.value
				}
            });
            
            this.damperModeList.forEach(item => {
                item.mode = this.selectedMode.value;
            });
        },
        changeSelectedMode(mode) {
			this.selectedMode = mode;
		}
    },
    mounted(){
        this.getCurrentFrame();
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


