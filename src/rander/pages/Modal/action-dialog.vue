<template>
	<b-modal
		id="actionModal"
		ref="actionModalRef"
		:title="`${$t('robot.action.label')} -> ${actionList[actionIndex].name}`"
		size="lg"
		no-close-on-backdrop
		centered
		@ok="getActionsList">
		<div style="height: 530px;position: relative;">
			<b-row style="width: 100%;margin-bottom: 15px;">
				<b-col cols="4">
					<b-button size="sm" variant="success" @click="getActionsList"><i class="fas fa-sync-alt" /></b-button>
					<b-button size="sm" variant="success">创建动作</b-button>
				</b-col>
				<b-col></b-col>
				<b-col cols="auto">
					<b-button size="sm" variant="primary" @click="insertFrame">插入一帧</b-button>
					<b-button size="sm" variant="danger" @click="deleteFrame">删除该帧</b-button>
					<b-button size="sm" variant="primary">读取当前状态</b-button>
					<b-button size="sm" variant="success">保存修改</b-button>
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
							<a v-b-tooltip.hover.left :title="row.value">{{row.value}}</a>
						</template>
						<template slot="operate" slot-scope="row">
							<b-button size="sm" @click.stop="connect(row)">
								<i class="fas fa-trash-alt" />
							</b-button>
							<b-button size="sm" @click.stop="connect(row)">
								<i class="fas fa-play" />
							</b-button>
						</template>
					</b-table>
				</b-col>
				<b-col cols="8">
					<b-row>
						<b-col cols="auto">
							<b-input-group size="sm" :prepend="$t('robot.action.frame.jump')" :append="$t('robot.action.frame.label')">
								<b-form-input style="width: 5em" type="number" v-model.number="frameIndex" />
							</b-input-group>
						</b-col>
						<b-col cols="auto" />
						<b-col>
							<b-pagination
								id="frame-pagination"
								size="sm"
								class="d-flex justify-content-center"
								:total-rows="selectedFrameList.length"
								v-model="frameIndex"
								:per-page="1"
								:limit="5" />
						</b-col>
					</b-row>
					<b-row>
						<adjuster
							v-for="(servo, index) in selectedFrame"
							:key="index"
							:id="index+1"
							:angle.sync="servo.angle"
							class="adjuster"
							:style="styleObject[index]" />
					</b-row>
				</b-col>
			</b-row>
		</div>
	</b-modal>
</template>

<script>
import Adjuster from '../component/adjuster.vue';
import adjusterMap from '../component/adjusterMap.yaml';
import genStyleObjectFromMap from '@/utils/genStyleObjectFromMap';
const emptyFrame = Array(17);
emptyFrame.fill({"angle": 0});

export default {
	components: {
		Adjuster
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
					]
				},
				{
					id: 2,
					name: 'aoeu',
					frameList: [
						[{"angle":13},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":88},{"angle":77}],
						[{"angle":23},{"angle":33},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":88},{"angle":77}],
						[{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":88},{"angle":77}],
						[{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":88},{"angle":77}],
					]
				},
				{
					id: 3,
					name: 'test',
					frameList: [
						[{"angle":13},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":88},{"angle":77}],
						[{"angle":23},{"angle":33},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":88},{"angle":77}],
						[{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":88},{"angle":77}],
						[{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":88},{"angle":77}],
						[{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":56},{"angle":12},{"angle":23},{"angle":34},{"angle":45},{"angle":88},{"angle":77}],
					]
				}
			],
			styleObject: {}
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
		createAction() {
			window.prompt('请输入动作名称', 'newAction', name => {
				// this.$api.createActions(name);
			});
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
				this.actionList[index].frameList = data.frameList;
			});
		},
		updateAction() {
			this.$api.updateActions()
		},
		deleteAction() {
			this.$api.deleteActions()
		},
		changeActionIndex(item, index, event) {
			this.actionIndex = index;
			this.getAction(index);
		},
		getFrame() {

		},
		insertFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex - 1, 0, emptyFrame);
		},
		deleteFrame() {
			let { frameList } = this.actionList[this.actionIndex];
			frameList = frameList.splice(this.frameIndex - 1, 1);
		},
		changeFrameIndex(item, index, event) {
			this.frameIndex = index;
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

