<template>
	<b-modal
		id="engineModal"
		size="lg"
		:title="$t('robot.engine.calibration')"
		hide-footer
        centered
        @shown="getCurrentFrame"
        @hidden="emptySetList"
		no-close-on-backdrop>
        <b-row>
            <b-col cols="1" class="mr-3">
                <b-button @click="allSelect" size="sm">
                    {{$t('robot.engine.all')}}
                </b-button>
            </b-col>
            <b-col cols="3">
                <b-input-group
                    size="sm">
                    <b-input-group-prepend>
                        <b-btn
                            @click="setAllServo"
                            variant="primary"><i
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
            <b-col>
                <span v-show="isError" class="text-danger">{{$t('robot.engine.error')}}</span>
            </b-col>
        </b-row>
       
        <div id="content"  @mouseleave="pointTarget = -1">
            <span class="point" v-for="(item, index) in styleObject" :key="index"
                :style="styleObject[index]" @click="resetPoint(index - 0 + 1)"
                :class="{'active': setList.indexOf(index - 0 + 1) !== -1}" @mouseenter.stop.prevent="pointTarget = index">
                <span class="number">{{index - 0 + 1}}</span><br />
                <engine  @mouseenter.stop.prevent="pointTarget = index"  v-if="pointTarget == index"
				    :servo="frame[index]" :index="index" @angle-changed="updateAngle"
                    :damperMode="damperModeList[index]" :disabled="follow" />
            </span>
        </div>
	</b-modal>
</template>

<script>
import adjusterMap from '../../config/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';

import Engine from '../component/engine.vue';

function modeListFactory(mode) {
    const modeList = [];

    for (let i = 0; i < 17; i++) {
        modeList.push({mode});
    }

    return modeList;
}

export default {
    data() {
        return {
            styleObject: null,
            setList: [],
            pointTarget: -1,
            frame: [],
            speed: 10,
            selectedMode: {text: this.$t('robot.free'), value: 'free'},
            modeList: [
				{ text: this.$t('robot.damp'), value: 'damp'},
				{ text: this.$t('robot.free'), value: 'free'},
				{ text: this.$t('robot.lock'), value: 'lock'},
            ],
            follow: true,
            damperModeList: modeListFactory('lock'),
            isError: false
        }
    },
    components: {Engine},
    methods: {
        resetPoint(index) {
            this.isError = false;

            if (this.setList.indexOf(index) === -1) {
                this.$api.calibrateServo({
                    data: {
                        id: index
                    }
                }).then(() => {

                    this.setList.push(index);
                }).catch(e => {
                    this.isError = true;
                });
            }
        },
        emptySetList() {
            this.setList = [];
        },
        allSelect() {
            const arr = new Array(17).fill(0);
            this.setList = [];

            this.isError = false;

            this.$api.calibrateServo({
                data: {
                    id: 121
                }
            }).then(() => {
                arr.forEach((item, index) => {
                    this.setList.push(index + 1);
    
                });
            }).catch((e) => {
                this.isError = true;
            });
        },
        getCurrentFrame() {
            this.$api.getFrame().then(data => {
                if (data) {

                    this.frame = data.frame;
                    this.damperModeList = data.modeList;
                }
            });
        },
        updateAngle(value) {
			const message = Object.assign({
				speed: this.speed	
			}, value);
			
			if (this.follow) {
				this.$api.changeServoAngle({
					data: message
				});
			}
        },
        setAllServo() {
			this.$api.changeServoMode({
				data: {
					id: 121,
					mode: this.selectedMode.value
				}
            });
            
            this.damperModeList = modeListFactory(this.selectedMode.value);
        },
        changeSelectedMode(mode) {
			this.selectedMode = mode;
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

    button.btn-secondary {
        background-color: rgba(0, 0, 0, .2);
        padding: 5px;
    }

    .b-dropdown {
		border-radius: 0 3px 3px 0;
        background-color: rgba(0, 0, 0, .2);
		button.btn-secondary {
			color: #fff;
			background-color: transparent;
		}
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

