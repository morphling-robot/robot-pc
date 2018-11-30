<template>
	<b-modal
		id="actionModal"
		ref="actionModalRef"
		no-close-on-backdrop
		size="lg"
		centered
		@ok="getActionsList"
		:ok-title="$t('modal.ok')"
		:cancel-title="$t('modal.cancel')"
		cancel-variant="link">
		<b-row slot="modal-header" class="w-100" @click.stop="isShow = true">
			<b-col cols="3">
				<h5  @dblclick="isShow = false" class="modal-title">{{$t('robot.action.label')}} -&gt; 
				<span v-if="isShow">{{actionList[actionIndex].name}}</span>
				<b-form-input
					size="sm"
					v-if="!isShow" style="display: inline-block;width: 7rem"
					v-model="actionList[actionIndex].name"
					type="text"></b-form-input>
				</h5>
			</b-col>
			<b-col>
				<action-progress class="mt-1" id="action-speed" :value="actionList[actionIndex].speed"
					:min="0" :max="100"
					@update-progress="updatespeed($event, actionList[actionIndex])" pointTarget="1"></action-progress>
			</b-col>
			<b-col cols="1">
				<button type="button" aria-label="Close" class="close" @click="$refs.actionModalRef.hide()">×</button>
			</b-col>
			
			
		</b-row>
		<div style="height: 550px;position: relative;">
			<b-row style="width: 100%;margin-bottom: 15px;">
				<b-col cols="4">
					<b-button size="sm" variant="success" @click="getActionsList"><i class="fas fa-sync-alt" /></b-button>
					<b-button size="sm" variant="success" @click="tempCreateAction">创建动作</b-button>
					<b-button size="sm" variant="success" @click="updateAction">保存</b-button>
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
					:limit="3"
					:per-page="10" />
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
							<b-button size="sm" @click.stop="deleteAction(row)">
								<i class="fas fa-trash-alt" />
							</b-button>
							<b-button size="sm" @click.stop="runAction(row)">
								<i class="fas fa-play" />
							</b-button>
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
								:limit="5" />
						</b-col>
					</b-row>
					<b-row>
						<adjuster
							class="adjuster" :frame="selectedFrame"/>
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
import { constants } from 'http2';
const emptyFrame = Array(17);
emptyFrame.fill({"angle": 0});

function actionFactory() {
	const newArr = [];

	for (let i = 0; i < 17; i++) {
		newArr.push({"angle":10});
	}

	return {
		name: '新动作',
		frameList: [
			newArr
		],
		speed: 10
	}
}

export default {
	components: {
		Adjuster, ActionProgress
	},
	data() {
		return {
			actionIndex: 0,
			frameIndex: 0,
			currentActionPage: 0,
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
					speed: 10
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
					speed: 10
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
					speed: 10
				}
			],
			styleObject: {},
			tempPosition: -1,
			isShow: true
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
				this.actionList = data;
			});
		},
		tempCreateAction() {
			// window.prompt('请输入动作名称', 'newAction', name => {
			// 	this.$api.createActions({
			// 		data: {
			// 			body: '',
			// 			name
			// 		}
			// 	});
			// });
			this.tempPosition = this.actionList.length;

			this.actionList.push(actionFactory());

			this.actionIndex = this.tempPosition;

			this.currentActionPage = Math.ceil(this.actionList.length / 10);
		},
		getAction(index) {
			this.$api.getActions({
				index: this.actionList[index].name + '/user',
				config: {
					auth: {
						username: this.$store.state.user.token,
						password: ''
					}
				}
			}).then(data => {
				this.actionList[index].frameList = data.frameList; //真奇怪
			});
		},
		updateAction() {
			const { name } = this.actionList[this.actionIndex];
			this.$api.updateActions({
				index: name,
				data: {
					name: name,
					body: this.selectedFrameList
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
			this.actionIndex = index;
			this.getAction(index);
		},
		runAction(row) {
			const { name } = row.item;
      this.$api.postInstructs({
        data: {
          instruct_type: 3002,
          para: name
        }
			});
		},
		getFrame() {
			this.$api.postInstructs({
        data: {
          instruct_type: 2000,
          para: name
        }
			}).then(data => {
				// this.selectedFrameList[this.frameIndex - 1] = data;
			})
		},
		insertFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex, 0, frameList[this.frameIndex - 1]); //复制当前状态
			this.frameIndex = this.frameIndex + 1;
		},
		deleteFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex - 1, 1);
		},
		changeFrameIndex(item, index, event) {
			this.frameIndex = index;
		},
		updatespeed(changed, action) {
			action.speed = changed;
		}
	},
	computed: {
		selectedFrameList() {
			return this.actionList[this.actionIndex].frameList;
		},
		selectedFrame() {
			return this.selectedFrameList[this.frameIndex - 1];
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
		width: 75px;
	}

	.action-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>

