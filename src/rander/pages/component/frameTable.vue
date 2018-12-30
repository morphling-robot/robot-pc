<template>
    <div>
        <b-row>
            <b-col></b-col>
            <b-col cols="auto">
                <b-input-group
                    size="sm">
                    <b-input-group-prepend>
                        <b-btn
                            @click="setAllServo"
                            variant="success"><i class="fas fa-cog"></i>
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
                    <b-button size="sm" variant="primary" @click="insertFrame" :disabled="!hasCurrentAction">插入一帧</b-button>
                    <b-button size="sm" variant="danger" @click="deleteFrame" :disabled="!hasCurrentAction">删除该帧</b-button>
                </b-input-group>
            </b-col>
        </b-row>
        <div class="mt-3">
            <b-row>
                <b-col>
                    <b-pagination
                        v-if="hasCurrentAction"
                        id="frame-pagination"
                        size="sm"
                        class="d-flex justify-content-end"
                        :total-rows="frameList.length"
                        v-model="frameIndex"
                        :per-page="1"
                        :limit="9" />
                </b-col>
            </b-row>
            <adjuster
                ref="adjuster"
                class="adjuster"
                :frame="selectedFrame"
                :frameSpeed="selectedSpeed"
                :damperModeList="selectedModeList" />
        </div>
    </div>
</template>

<script>
import Adjuster from '../component/adjuster.vue';
import cloneObj from '@/utils/cloneObject.js';

function modeListFactory(mode) {
    const modeList = [];

    for (let i = 0; i < 17; i++) {
        modeList.push({mode});
    }

    return modeList;
}

export default {
    name: 'frame-table',
    props: ['currentAction', 'frame', 'hasCurrentAction', 'frameModeList', 'tempCreateAction',
        'isTemp', 'isCopy'],
    data() {
        return {
            selectedMode: { text: '无阻尼', value: 'free'},
			modeList: [
				{ text: '有阻尼', value: 'damp'},
				{ text: '无阻尼', value: 'free'},
				{ text: '锁定  ', value: 'lock'},
            ],
            frameIndex: 0,
            speedList: [],
            frameList: [],
            ownModeList: [],
            origin: null
        }
    },
    components: {Adjuster},
    computed: {
        selectedFrame() {
            return this.hasCurrentAction ? this.frameList[this.frameIndex - 1] : this.frame;
        },
        selectedSpeed() {
            if (! this.speedList[this.frameIndex - 1]) {
                this.speedList.push({speed: 10});
            }

            return this.hasCurrentAction ? this.speedList[this.frameIndex - 1] : {speed: 10};
        },
        selectedModeList() {
            return this.hasCurrentAction ? (this.ownModeList.length === 0 ? modeListFactory('lock') : this.ownModeList) : this.frameModeList;
        },
        hasChange() {
            if (!this.hasCurrentAction) {
                return false;
            }

            if (this.isTemp || this.isCopy || !this.origin) {
				return true;
            }

            if (this.frameList.length !== this.origin.length) {
                return true;
            }

            let flag = false;
            
            this.frameList.forEach((frame, index) => {
                frame.forEach((item, number) => {
                    flag = flag || (item.angle !== this.origin[index][number].angle)
                }) 
            });

            return flag;
        }
    },
    watch: {
        currentAction(newCurrent, oldCurrent) {
            this.frameIndex = 1;

            if (this.isCopy) {
                return;
            }

            if (newCurrent && !this.isTemp) {
                this.getFrameList().then(() => {
                    this.origin = cloneObj(this.frameList);

                    this.$api.runActionSlice({
                        data: {
                            body: {
                                frameList: [this.frameList[0]],
                                speedList: [this.speedList[0]]
                            },
                            speed: this.selectedSpeed.speed
                        }
                    });
                })
            }

            if (this.isTemp) {
                this.$api.getFrame()
                    .then((data) => {
                        if (data) {
                            
                            const {frame, modeList} = data;

                            this.speedList = [{"speed": 10}];
                            this.frameList = [frame];
                            this.ownModeList = modeListFactory('lock');
                        }
                    });
            }
        },
        frameIndex (newIndex, oldIndex) {
			let start = null;
			let end = null;
			if (newIndex > oldIndex) {
				start = oldIndex;
				end = newIndex;
			} else {
				start = newIndex;
				end = oldIndex;
			}

			const frameSlice = this.frameList.slice(start, end + 1);
			const speedSlice = this.speedList.slice(start, end + 1);

			this.$api.runActionSlice({
                data: {
                    body: {
                        frameList: frameSlice,
                        speedList: speedSlice
                    },
                    speed: this.selectedSpeed.speed
                }
            });
            
            modeListFactory('lock');

        },
        hasChange(newValue) {
            this.$emit('action-changed', newValue);
        }
    },
    mounted() {
        if (this.hasCurrentAction) {
            this.getFrameList();
        } 
    },
    methods: {
        changeSelectedMode(mode) {
			this.selectedMode = mode;
		},
		setAllServo() {
			this.$api.changeServoMode({
				data: {
					id: 121,
					mode: this.selectedMode.value
				}
            });
            
            this.ownModeList = modeListFactory(this.selectedMode.value);
        },
        insertFrame() {
			this.$api
				.getFrame()
				.then((data) => {
					this.frameList.splice(this.frameIndex + 1, 0, data.frame);

                    this.frameIndex = this.frameIndex + 1;

					this.ownModeList = data.modeList;
				})
		},
		deleteFrame() {
			this.frameList.splice(this.frameIndex - 1, 1);
        },
        getFrameList() {
            return this.$api.getActions({
                index: this.currentAction,
                config: {
                    auth: {
                        username: this.$store.state.user.token,
                        password: ''
                    }
                }
            }).then(data => {
                const {frameList, speedList} = data;

                this.speedList = speedList;
                this.frameList = frameList;
            });
        }
    }
}
</script>

<style lang="less">
#prompt {
    position:  absolute;
    top: 51px;
    left: 51px;
}
</style>


