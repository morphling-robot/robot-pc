<template>
	<b-modal
		id="actionModal"
		ref="actionModalRef"
		no-close-on-backdrop
		size="lg"
		centered
		@show="getActionsList"
		hide-footer
		cancel-variant="link">
		<div slot="modal-header" class="w-100">
			<div style="display: inline-block" @click.stop>
				<h5 class="modal-title">{{$t('robot.action.label')}} -&gt; 
					<span v-if="isShow" style="display: inline-block;width: 7em">{{actionList[actionIndex].name}}</span>
					<b-form-input
						size="sm"
						v-if="!isShow" style="display: inline-block;width: 7em"
						@blur.native="isShow = true;"
						v-model="actionList[actionIndex].name"
						type="text"></b-form-input>
						<b-btn
							@click="isShow = false" size="sm"
							variant="success">
							<i class="fas fa-pencil-alt"></i>
						</b-btn>
				</h5>
			</div>
			<div style="display: inline-block; float: right">
				<button type="button" aria-label="Close" class="close" @click="$refs.actionModalRef.hide()">×</button>
			</div>
			
			
		</div>
		<div style="height: 550px;position: relative;">
			<b-row style="width: 100%;margin-bottom: 15px;">
				<b-col cols="4">
					<b-button size="sm" variant="success" @click="getActionsList"><i class="fas fa-sync-alt" /></b-button>
					<b-button size="sm" variant="success" @click="tempCreateAction">创建动作</b-button>
				</b-col>
				<b-col></b-col>
				<b-col cols="auto">
					<b-button size="sm" variant="primary" @click="insertFrame">插入一帧</b-button>
					<b-button size="sm" variant="danger" @click="deleteFrame">删除该帧</b-button>
				</b-col>
			</b-row>
			<b-row style="height: auto">
				<b-col cols="4">
					<b-pagination
					size="sm"
					:total-rows="actionList.length"
					v-model="currentActionPage"
					:limit="5"
					:per-page="10" />
					<action-progress class="mb-2" id="action-speed" :value="speed"
						:min="0" :max="10"
						@update-progress="updatespeed($event)" pointTarget="1"></action-progress>
					<b-table
						id="action-table"
						small
						striped
						hover
						fixed
						:items="actionList"
						:fields="[
							{ key: 'name', label: $t('robot.action.name'), class: 'action-name' },
							{ key: 'operate', label: '', class: 'operate' }
						]"
						:current-page="currentActionPage"
						:per-page="10"
						@row-clicked="changeActionIndex">
						<template slot="name" slot-scope="row">
							<a v-b-tooltip.hover.left :title="row.value" style="cursor: pointer; color: #0000ff">{{row.value}}</a>
						</template>
						<template slot="operate" slot-scope="row">
							<b-button size="sm" @click.stop="updateAction(row.index)" v-if="row.index === actionIndex && hasChanged">
								<i class="fas fa-save"></i>
							</b-button>
							<b-button size="sm" @click.stop="deleteAction(row)">
								<i class="fas fa-trash-alt" />
							</b-button>
							<b-button size="sm" @click.stop="runAction(row)">
								<i class="fas fa-play" />
							</b-button>
						</template>
					</b-table>
					<b-button size="sm" @click.stop="run()" v-if="!runed">
						<i class="fas fa-play" />
					</b-button>
					<b-button size="sm" @click.stop="pause()" v-if="runed">
						<i class="fas fa-pause-circle"></i>
					</b-button>
					<b-button size="sm" @click.stop="reset()">
						<i class="fas fa-sync-alt"></i>
					</b-button>
					<b-button size="sm" @click.stop="stop()">
						<i class="fas fa-power-off"></i>
					</b-button>
				</b-col>
				<b-col cols="8">
					<b-row>
						<b-col>
							<b-pagination
								id="frame-pagination"
								size="sm"
								class="d-flex justify-content-end"
								:total-rows="selectedFrameList.length"
								v-model="frameIndex"
								:per-page="1"
								:limit="11" />
						</b-col>
					</b-row>
					<b-row>
						<adjuster
							ref="adjuster"
							class="adjuster"
							:frame="selectedFrame"
							:servoMode="damperModeList"
							@angle-changed=""
							/>
					</b-row>
				</b-col>
			</b-row>
		</div>
	</b-modal>
</template>

<script>
import Adjuster from '../component/adjuster.vue';
import ActionProgress from '@/utils/Progress.vue';
import adjusterMap from '../component/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';
import cloneObj from '@/utils/cloneObject.js';
import { constants } from 'http2';
const emptyFrame = Array(17);
emptyFrame.fill({"angle": 0});

const damperMode = Array(17);
damperMode.fill({mode: 'free'});

function actionFactory() {
	const newArr = [];

	for (let i = 0; i < 17; i++) {
		newArr.push({"angle":10});
	}

	return {
		name: '新动作',
		frameList: [
			newArr
		]
	}
}

export default {
	components: {
		Adjuster, ActionProgress
	},
	data() {
		return {
			runed: true,
			actionIndex: 0,
			frameIndex: 0,
			currentActionPage: 0,
			damperModeList: damperMode,
			actionList: [
				{
					id: 1,
					name: '123',
					frameList: [
						[{"angle":13},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":88},{"angle":77}],
						[{"angle":23},{"angle":33},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":88},{"angle":77}],
						[{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":88},{"angle":77}],
						[{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":88},{"angle":77}],
						[{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":88},{"angle":77}],
					],
					speedList: [10, 10, 10, 10, 10]
				},
				{
					id: 2,
					name: 'aoeu',
					frameList: [
						[{"angle":14},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":88},{"angle":77}],
						[{"angle":23},{"angle":33},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":88},{"angle":77}],
						[{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":88},{"angle":77}],
						[{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":88},{"angle":77}],
					],
					speedList: [10, 10, 10, 10]
				},
				{
					id: 3,
					name: 'test',
					frameList: [
						[{"angle":15},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":88},{"angle":77}],
						[{"angle":23},{"angle":33},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":88},{"angle":77}],
						[{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":88},{"angle":77}],
						[{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":88},{"angle":77}],
						[{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":88},{"angle":77}],
					],
					speedList: [10, 10, 10, 10, 10]
				}
			],
			origin: [],
			styleObject: {},
			tempPosition: -1,
			isShow: true,
			speed: 0.1
		}
	},
	mounted() {
		this.styleObject = genStyleObjectFromMap(adjusterMap);

		// const { ipcRenderer } = this.$electron;

		// ipcRenderer.removeAllListeners('app-toggle-action-dialog');
		
		// ipcRenderer.on('app-toggle-action-dialog', () => {
		// 	this.$refs.actionModalRef.show();
		// });
		this.getActionsList();
	},
	methods: {
		// hideProgress() {
		// 	this.$refs.adjuster.pointTarget = -1;
		// },
		getActionsList() {
			this.$api.getActionsList().then(data => {
				
				if (data) {
					this.actionList = data;
				}

				this.origin = cloneObj(this.actionList);
			});
		},
		tempCreateAction() {
			this.tempPosition = this.actionList.length;

			this.actionList.push(actionFactory());

			this.origin.push({});

			this.actionIndex = this.tempPosition;

			this.currentActionPage = Math.ceil(this.actionList.length / 10);
		},
		getAction(index) {
			this.$api.getActions({
				index: this.actionList[index].name,
				config: {
					auth: {
						username: this.$store.state.user.token,
						password: ''
					}
				}
			}).then(data => {
				Object.assign(this.actionList[index], data);
			});
		},
		createAction(index) {
			const { name } = this.actionList[index];
			this.$api.createActions({
				index: name,
				data: {
					name: name,
					body: this.currentAction
				}
			});
		},
		updateAction(index) {
			const { name } = this.actionList[index];
			this.$api.updateActions({
				index: name,
				data: {
					name: name,
					body: this.currentAction
				}
			});
		},
		deleteAction(row) {
			const { name } = row.item;
			this.$api.deleteActions({
				index: name
			});
		},
		changeActionIndex(item, index, event) {
			const electron = this.$electron;
			const { dialog } = electron.remote;

			dialog.showMessageBox({
				type: 'warning',
				title: '提示',
				message: '当前有未保存修改, 直接切换可能造成修改丢失!',
				buttons: ['保存', '跳转']
			}, (btnIndex) => {
				if (btnIndex === 0) {
					this.updateAction(this.actionIndex).then(() => {
						this.actionIndex = index;
						this.getAction(index);
					});
				} else if (btnIndex === 1) {
					this.actionIndex = index;
					this.getAction(index);
				}
			});
		},
		runAction(row) {
			const { name } = row.item;
			this.$api.runUserAction ({
				data: {
					name,
					speed: this.speed
				}
			});
		},
		changeServoAngle(e) {
			this.$api.changeServoAngle({
				data: {
					angle: e.angle,
					speed: this.speed,
					id: e.index
				}
			});
		},
		changeServoMode(e) {
			this.$api.changeServoMode({
				data: {
					mode: ,
					id: 
				}
			})
		},
		run() {
			this.runed = true;

			this.$api.robotControl({
				data: 'continue'
			});
		},
		pause() {
			this.runed = false;

			this.$api.robotControl({
				data: 'pause'
			});
		},
		reset() {
			this.$api.robotControl({
				data: 'reset'
			});
		},
		stop() {
			this.$api.robotControl({
				data: 'stop'
			});
		},
		insertFrame() {
			this.$api
				.getFrame()
				.then(data => {
					let { frameList, speedList } = this.actionList[this.actionIndex];
					frameList = frameList.splice(this.frameIndex, 0, data.frameList);
					speedList = frameList.splice(this.frameIndex, 0, data.speedList);
					this.frameIndex = this.frameIndex + 1;
				})
		},
		deleteFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex - 1, 1);
		},
		updatespeed(changed) {
			this.speed = changed; 
		}
	},
	computed: {
		selectedFrameList() {
			return this.actionList[this.actionIndex].frameList;
		},
		selectedFrame() {
			return this.selectedFrameList[this.frameIndex - 1];
		},
		currentAction() {
			return this.actionList[this.actionIndex];
		},
		hasChanged() {
			// const keyList = Object.keys(this.actionList[this.actionIndex]);
			// let flag = false;

			// if (this.origin.length === 0) {
			// 	return;
			// }

			// keyList.forEach(key => {
			// 	if (!this.origin[this.actionIndex][key]) {
			// 		flag = flag || true;

			// 		return;
			// 	}

			// 	if (key === 'frameList') {
			// 		const originFrameList = this.origin[this.actionIndex].frameList;
			// 		const actionFrameList = this.actionList[this.actionIndex].frameList;

			// 		actionFrameList.forEach((item, frameIndex) => {
			// 			item.forEach((angleObj, angleIndex) => {
			// 				// console.log(angleObj.angle,originFrameList[frameIndex][angleIndex].angle)
			// 				if (angleObj.angle !== originFrameList[frameIndex][angleIndex].angle) {
			// 					flag = flag || true;
			// 				}
			// 			})
			// 		});
			// 	}else if (this.origin[this.actionIndex][key] !== this.actionList[this.actionIndex][key]) {
			// 		flag = flag || true;
			// 	}

			// });

			// return flag;
			return false;
		}
	},
	watch: {
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

			const action = this.actionList[this.actionIndex];console.log(action);
			const frameSlice = action.frameList.slice(start, end + 1);
			const speedSlice = action.speedList.slice(start, end + 1);

			this.$api.runActionSlice({
				data: {
					body: {
						frameList: frameSlice,
						speedList: speedSlice
					},
					speed: this.speed
				}
			})
		}
	}
}
</script>

<style lang="less">
.adjuster {
	position: relative;
}

#frame-pagination {
	a, span {
		width: 2.5em;
		text-align: center;
	}
}

#action-table {
	.operate {
		width: 113px;
	}

	.action-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>

