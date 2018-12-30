<template>
	<b-modal
		id="actionModal"
		ref="actionModalRef"
		no-close-on-backdrop
		size="lg"
		centered
		@show="initActionTable"
		@hidden="init"
		hide-footer
		cancel-variant="link">
		<div slot="modal-header" class="w-100">
			<div style="display: inline-block">
				<h5 class="modal-title"  v-if="hasCurrentAction">{{$t('robot.action.label')}} -&gt; 
					<span v-if="!isChangeName">
						<span style="display: inline-block;width: 9em">{{currentAction}}</span>
						 <b-btn
							@click.stop="isChangeName = true" size="sm"
							variant="success">
							<i class="fas fa-pencil-alt"></i>
						</b-btn>
					</span>
					<span v-if="isChangeName">
						<b-form-input
							size="sm"
							style="display: inline-block;width: 12em"
							v-model="newActionName"
							type="text"></b-form-input>
						<b-btn
							@click.stop="updateActionName" size="sm"
							variant="success">
							<i class="fas fa-save" />
						</b-btn>
					</span>
				</h5>
				<h5 class="modal-title"  v-if="!hasCurrentAction">{{$t('robot.action.label')}}</h5>
			</div>
			<div style="display: inline-block; float: right">
				<button type="button" aria-label="Close" class="close" @click.stop="$refs.actionModalRef.hide()">×</button>
			</div>
		</div>
		<div style="height: 575px;position: relative;">
			<b-row style="width: 100%;margin-bottom: 15px;">
				<b-col cols="4">
					<action-table @change-action="changeCurrentAction" ref="actionTable" :currentAction="currentAction"
						@create-action="createAction" @copy-action="copyAction" :hasChanged="hasChanged"
						:isTemp="isTemp" :isCopy="isCopy" @update-action="updateActionContent"></action-table>
				</b-col>
				<b-col cols="8">
					<frame-table ref="frameTable" :frame="currentFrame" :currentAction="currentAction" :hasCurrentAction="hasCurrentAction"
						:frameModeList="currentModeList" :isTemp="isTemp" :isCopy="isCopy"
						@action-changed="changeFlag"></frame-table>
				</b-col>
			</b-row>
		</div>
	</b-modal>
</template>

<script>
import ActionTable from '../component/actionTable.vue';
import FrameTable from '../component/frameTable.vue';

export default {
	components: {
		ActionTable, FrameTable
	},
	data() {
		return {
			currentAction: null,
			newActionName: '',
			isChangeName: false,
			currentFrame: [],
			currentModeList: [],
			tempCreateAction: null,
			isTemp: false,
			isCopy: false,
			hasChanged: false
		}
	},
	computed: {
		hasCurrentAction() {
			return this.currentAction ? true : false;
		}
	},
	methods: {
		init() {
			this.currentAction = null;
			this.newActionName = '';
			this.isChangeName = false;
			this.isTemp = false;
			this.isCopy = false;
		},
		changeFlag(value) {
			this.hasChanged = value;
		},
		getActionsList() {
			this.$refs.actionTable.getActionsList();
		},
		initActionTable() {
			this.getActionsList();
			this.getCurrentFrame();
		},
		changeCurrentAction(actionName) {
			this.isTemp = false;
			this.isCopy = false;

			this.currentAction = actionName;

			this.getActionsList();
		},
		createAction(name) {

			this.currentAction = name;

			this.isTemp = true;
		},
		copyAction(name) {
			if (!this.hasCurrentAction || this.isTemp) {
				return;
			}

			this.isCopy = true;
			this.currentAction = name;
		},
		updateActionName() {
			if (this.currentAction === this.newActionName || this.newActionName === '') {
				this.isChangeName = false;
				this.newActionName === '';

				return;
			}

			if (this.hasChanged) {

                this.$dialog.updateName().then(() => {

                    this.updateAction(this.newActionName, '');
                    
                }, () => {
                    return;
                });
			} else {
				this.updateAction(this.newActionName, '');
                
            }

		},
		updateActionContent() {
			const {frameList, speedList} = this.$refs.frameTable;
			const name = this.currentAction;

			if (this.isCopy || this.isTemp) {
				this.$api.createActions({
					data: {
						name: this.currentAction,
						body: {
							frameList, speedList
						}
					}
				}).then(() => {
					this.isTemp = false;
					this.isCopy = false;
					this.currentAction = '';
					this.currentAction = name;

					this.getActionsList();
				});

			} else {

				this.updateAction('', {
					frameList, speedList
				});
			}

		},
		updateAction(name, body) {
			return this.$api.updateActions({
				index: this.currentAction,
				data: {
					name: name,
					body: body
				}
			}).then((data) => {
				this.currentAction = name;
				this.newActionName === '';
				this.isChangeName = false;

				this.getActionsList();
			});
		},
		getCurrentFrame() {
			this.$api.getFrame()
				.then((data) => {
					if (data) {
						
						const {frame, modeList} = data;

						this.currentModeList = modeList;
						this.currentFrame = frame;
					}
				}).catch(e => {
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

