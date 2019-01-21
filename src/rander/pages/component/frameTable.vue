<template>
    <div>
        <b-row>
            <b-col></b-col>
            <b-col cols="auto">
                <b-input-group
                    size="sm">
                    <b-input-group-prepend>
                        <b-btn
                            @click="setAllServo"><i class="fas fa-cog"></i>
                        </b-btn>
                    </b-input-group-prepend>
                    <b-dropdown
                        split
                        :text="selectedMode.text" style="border-top-right-radius:0;border-bottom-right-radius:0;"
                        size="sm">
                        <b-dropdown-item
                            v-for="(mode, index) in modeList"
                            :key="index"
                            @click="changeSelectedMode(mode)">
                            {{mode.text}}
                        </b-dropdown-item>
                    </b-dropdown>
                    <b-button size="sm" variant="primary" @click="insertFrame" :disabled="!hasCurrentAction" style="border-radius:0">{{$t('robot.action.frame.insert')}}</b-button>
                    <b-button size="sm" variant="danger" @click="deleteFrame" :disabled="!hasCurrentAction" style="border-top-left-radius:0;border-bottom-left-radius:0;">{{$t('robot.action.frame.delete')}}</b-button>
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
                style="margin-left:-9px"
                ref="adjuster"
                class="adjuster"
                :frame="selectedFrame"
                :frameSpeed="selectedSpeed"
                @current-frame="sendCurrentFrame"
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
        "actionSpeed", 'isEnd', 'isChangeName', 'runningAction',
        'isTemp', 'isCopy'],
    data() {
        return {
            selectedMode: { text: this.$t('robot.free'), value: 'free'},
			modeList: [
				{ text: this.$t('robot.damp'), value: 'damp'},
				{ text: this.$t('robot.free'), value: 'free'},
				{ text: this.$t('robot.lock'), value: 'lock'},
            ],
            frameIndex: 0,
            speedList: [],
            frameList: [],
            ownModeList: [],
            origin: null,
            isChangeAction: false,
            isInsert: false,
            isDelete: false
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

            if (this.isTemp || !this.origin) {
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
            if (this.isChangeName) {
                this.$emit('editor-state', false);

                return;
            }

            if (this.isCopy) {
                this.getFrameList();

                return;
            }

            this.isChangeAction = true;
            this.frameIndex = 1;

            if (newCurrent && !this.isTemp) {
                this.getFrameList().then(() => {

                    this.runInTime([this.frameList[0]], [this.speedList[0]]);
                });

                return;
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
                    }).catch(e => {
                        this.speedList = [];
                        this.frameList = [];
                    });
            }
        },
        frameIndex (newIndex, oldIndex) {
            if (this.isChangeAction) {
                this.isChangeAction = false;

                return;
            }

            if (this.isInsert) {
                this.isInsert = false;

                return;
            }

            if (this.isEnd) {
                return;
            }

			this.changeCUrrentFrameState(newIndex, oldIndex).then(() => {
                if (this.isDelete) {
                    this.frameList.splice(oldIndex - 1, 1);
                    this.isDelete = false;
                }
            });

        },
        hasChange(newValue) {
            this.$emit('action-changed', newValue);
        },
        isEnd(newValue, oldValue) {
            if (newValue && this.runningAction === this.currentAction) {
                this.frameIndex = this.frameList.length;

                this.$emit('index-changed');
            }
        }
    },
    mounted() {
        if (this.hasCurrentAction) {
            this.getFrameList();
        } 
    },
    methods: {
        sendCurrentFrame() {
            if (this.hasChange) {
                this.runInTime([this.selectedFrame], [this.selectedSpeed]);
            }
        },
        changeCUrrentFrameState(newIndex, oldIndex) {
            let start = null;
            let end = null;
            
            let frameSlice = [], speedSlice = [];

			if (newIndex > oldIndex) {
				start = oldIndex;
                end = newIndex;
                
                frameSlice = this.frameList.slice(start - 1, end);
                speedSlice = this.speedList.slice(start - 1, end);
			} else {
				start = newIndex;
                end = oldIndex;
                
                frameSlice = this.frameList.slice(start - 1, end).reverse();
                speedSlice = this.speedList.slice(start - 1, end).reverse();
			}

            return this.runInTime(frameSlice, speedSlice).then(() => {

                modeListFactory('lock');
            });
            
        },
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
        runInTime(frameList, speedList) {
            return this.$api.runActionSlice({
                data: {
                    body: {
                        frameList,
                        speedList
                    },
                    speed: this.actionSpeed
                }
            });
        },
        insertFrame() {
            this.isInsert = true;

			this.$api
				.getFrame()
				.then((data) => {

                    this.frameList.splice(this.frameIndex, 0, data.frame);

                    this.frameIndex = this.frameIndex + 1;

                    this.ownModeList = data.modeList;
				})
		},
		deleteFrame() {
            if (this.frameIndex < this.frameList.length) {
                this.changeCUrrentFrameState(this.frameIndex + 1, this.frameIndex).then(() => {
                    this.frameList.splice(this.frameIndex - 1, 1);
                });

                return;
            }

            this.frameIndex = this.frameIndex - 1;

            this.isDelete = true;
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

                const filterSpeed = [];

                frameList.forEach((frame, index) => {
                    const speed = speedList[index] ? speedList[index] : {"speed": 10};
                    filterSpeed.push(speed);
                });

                this.speedList = filterSpeed;
                this.frameList = frameList;

                this.origin = cloneObj(this.frameList);
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


