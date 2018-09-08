<template>
	<b-modal
		id="actionModal"
		ref="actionModalRef"
		:title="$t('robot.action.label')"
		size="lg"
		no-close-on-backdrop
		centered
		@ok="fuck()">
		<div style="height: 530px;">
			<b-row>
				<b-col cols="3">
					<b-table
						small
						striped
						hover
						:items="actionList"
						:fields="[
							{ key: 'id', label: $t('robot.action.id'), class: 'action-id' },
							{ key: 'name', label: $t('robot.action.name'), class: 'action-name' }
						]"
						@row-clicked="changeActionIndex" />
				</b-col>
				<b-col cols="9">
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
								:limit="7" />
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

export default {
	components: {
		Adjuster
	},
	data() {
		return {
			actionIndex: 0,
			frameIndex: 0,
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
				},
				{
					id: 4,
					name: 'wrong',
					frameList: [
						[ 13, 23, 34, 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 56, 88, 77 ],
						[ 23, 33, 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 56, 12, 88, 77 ],
						[ 34, 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 56, 12, 23, 88, 77 ],
						[ 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 88, 77 ],
						[ 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 56, 12, 23, 34, 45, 88, 77 ],
					]
				}
			],
			styleObject: {}
		}
	},
	mounted() {
		this.styleObject = genStyleObjectFromMap(adjusterMap);

		const { ipcRenderer } = this.$electron;

		ipcRenderer.removeAllListeners('app-toggle-action-dialog');
		
		ipcRenderer.on('app-toggle-action-dialog', () => {
			this.$refs.actionModalRef.show();
		});

		this.$api.getActionsList().then(data => this.actionList = data);
	},
	methods: {
		changeActionIndex(item, index, event) {
			this.actionIndex = index;
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
.action-id {
	width: 3em;
}

.adjuster {
	position: relative;
}

#frame-pagination {
	a, span {
		width: 2.5em;
		text-align: center;
	}
}
</style>

