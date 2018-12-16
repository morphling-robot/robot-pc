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
					<span v-if="isShow" style="display: inline-block;min-width: 7em">{{actionList[actionIndex].name}}</span>
					<b-form-input
						size="sm"
						v-if="!isShow" style="display: inline-block;min-width: 7em;width: auto"
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
					<b-button size="sm" @click="getActionsList" v-b-tooltip.hover title="刷新">
						<i class="fas fa-sync-alt" /></b-button>
					<b-button size="sm" @click.stop="run()" v-if="!runed" v-b-tooltip.hover title="启动">
						<i class="far fa-play-circle"></i>
					</b-button>
					<b-button size="sm" @click.stop="pause()" v-if="runed" v-b-tooltip.hover title="暂停">
						<i class="far fa-pause-circle"></i>
					</b-button>
					<!-- <b-button size="sm" @click.stop="reset()">
						<i class="fas fa-sync-alt"></i>
					</b-button> -->
					<b-button size="sm" @click.stop="stop()" v-b-tooltip.hover title="停止">
						<i class="far fa-stop-circle"></i>
					</b-button>
					<b-button size="sm" variant="success" @click="tempCreateAction">创建动作</b-button>
				</b-col>
				<b-col></b-col>
				<b-col cols="auto">
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
					<b-button size="sm" variant="primary" @click="insertFrame">插入一帧</b-button>
					<b-button size="sm" variant="danger" @click="deleteFrame">删除该帧</b-button>
					</b-input-group>
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
					<b-form-slider v-model="speed"
						class="mb-2"
						trigger-change-event :min="1" :max="100" :step="1"></b-form-slider>
					<span style="display: inline-block;text-align: center;margin-right: -2em">{{speed}}</span>
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
						:per-page="8"
						@row-clicked="changeActionIndex">
						<template slot="name" slot-scope="row">
							<a v-b-tooltip.hover.left :title="row.value" style="cursor: pointer; color: #0000ff">{{row.value}}</a>
						</template>
						<template slot="operate" slot-scope="row">
							<span>
								<b-button size="sm" @click.stop="updateAction(row)" v-if="row.item.id === actionList[actionIndex].id && hasChanged">
									<i class="fas fa-save"></i>
								</b-button>
								<b-button size="sm" @click.stop="deleteAction(row)">
									<i class="fas fa-trash-alt" />
								</b-button>
								<b-button size="sm" @click.stop="runAction(row)">
									<i class="fas fa-play" />
								</b-button>
							</span>
						</template>
					</b-table>
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
							:frameSpeed="currentAction.speedList[frameIndex - 1]"
							:damperModeList="damperModeList"
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

function actionFactory() {
	const newArr = [];

	for (let i = 0; i < 17; i++) {
		newArr.push({"angle": 10});
	}

	return {
		name: '新动作',
		frameList: [
			newArr
		],
		speedList: [{speed: 10}]
	}
}

const damperMode = [];

for (let i = 0; i < 17; i++) {
	damperMode.push({mode: 'free'});
}

export default {
	components: {
		Adjuster, ActionProgress
	},
	data() {
		return {
			runed: true,
			actionIndex: 0,
			frameIndex: 1,
			currentActionPage: 0,
			selectedMode: { text: '无阻尼', value: 'free'},
			modeList: [
				{ text: '有阻尼', value: 'damp'},
				{ text: '无阻尼', value: 'free'},
				{ text: '锁定  ', value: 'lock'},
			],
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
					speedList: [{ speed: 10 }, { speed: 10 }, { speed: 10 }, { speed: 10 }, { speed: 10 }]
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
					speedList: [{ speed: 10 }, { speed: 10 }, { speed: 10 }, { speed: 10 }]
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
					speedList: [{ speed: 10 }, { speed: 10 }, { speed: 10 }, { speed: 10 }, { speed: 10 }]
				}
			],
			origin: null,
			styleObject: {},
			isShow: true,
			speed: 1,
			damperModeList: damperMode
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
		getActionsList() {
			this.$api.getActionsList().then(data => {
				
				if (data) {
					this.actionList = data;

					this.origin = cloneObj(this.actionList[this.actionIndex]);
				}

			});
		},
		tempCreateAction() {
			const newAction = actionFactory();

			this.actionList.unshift(newAction);
			this.actionIndex = 0;
			this.frameIndex = 0;
			this.origin = cloneObj(newAction);

			this.createAction(this.actionIndex);
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
				const result = Object.assign(this.actionList[index], data);


				this.origin = cloneObj(result);
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

			this.getAction(index);
		},
		updateAction(row) {
			const { name } = row.item;

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
			}).then(() => {
				this.getActionsList();
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
					});
				} else if (btnIndex === 1) {
					this.actionIndex = index;
				}

				this.frameIndex = 1;

				this.getAction(index);
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
		// changeServoAngle(e) {console.log(e);
		// 	this.$api.changeServoAngle({
		// 		data: {
		// 			angle: e.angle,
		// 			speed: e.speed,
		// 			id: e.index
		// 		}
		// 	});
		// },
		// changeServoMode(e) {console.log(e);
		// 	this.$api.changeServoMode({
		// 		data: {
		// 			mode: e.mode,
		// 			id: e.index
		// 		}
		// 	})
		// },
		updateFrameSpeed(e) {
			console.log(e)
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
				.then((data) => {
					console.log(data)
					// let { frameList, speedList } = this.actionList[this.actionIndex];
					// frameList = frameList.splice(this.frameIndex, 0, data.frameList);
					// speedList = frameList.splice(this.frameIndex, 0, data.speedList);
					// this.frameIndex = this.frameIndex + 1;
					let frame = this.actionList[this.actionIndex].frameList[this.frameIndex];
					console.log(this.frameIndex);
					frame.splice(this.frameIndex + 1, 0, data.angle_list);

					this.frameIndex = this.frameIndex + 1;
				})
		},
		deleteFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex - 1, 1);
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

			this.damperModeList.forEach(item => {
                item.mode = this.selectedMode.value;
            });
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
			if (!this.origin || !this.actionList[this.actionIndex]) {
				return;
			}

			const keyList = Object.keys(this.actionList[this.actionIndex]);
			let flag = false;
			keyList.forEach(key => {
				if (!this.origin[key]) {
					flag = flag || true;

					return;
				}

				const originFrameList = this.origin[key];
				const actionFrameList = this.actionList[this.actionIndex][key];

				if (key === 'frameList') {

					actionFrameList.forEach((item, frameIndex) => {
						item.forEach((angleObj, angleIndex) => {
							if (angleObj.angle - 0 !== originFrameList[frameIndex][angleIndex].angle - 0) {
								flag = flag || true;
							}
						})
					});
				}else if (key === 'speedList') {
					actionFrameList.forEach((item, frameIndex) => {
						if (item.speed - 0 !== originFrameList[frameIndex].speed - 0) {
							flag = flag || true;
						}
					});
				} else if (originFrameList !== actionFrameList) {
					flag = flag || true;
				}

			});

			return flag;
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

			const action = this.actionList[this.actionIndex];
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
		text-align: right;
	}

	.action-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>

