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
						 	:disabled="isTemp"
							@click.stop="isChangeName = true; newActionName = currentAction" size="sm">
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
							:disabled="isShow">
							<i class="fas fa-save" />
						</b-btn>
						<span v-show="isShow" class="text-danger">{{prompt}}</span>
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
						@action-speed="changeSpeed" @action-runed="realTimeSync"
						@actionlist-init="init" @run-temAction="runTemAction"
						:isTemp="isTemp" @update-action="updateActionContent"></action-table>
				</b-col>
				<b-col cols="8">
					<frame-table ref="frameTable" :frame="currentFrame" :currentAction="currentAction" :hasCurrentAction="hasCurrentAction"
						:frameModeList="currentModeList" :isTemp="isTemp" :isCopy="isCopy"
						:actionSpeed="actionSpeed" :isEnd="isEnd" :runningAction="runningAction" @index-changed="isEnd = false"
						@action-changed="changeFlag" :isChangeName="isChangeName" @editor-state="isChangeName = false"></frame-table>
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
			hasChanged: false,
			actionSpeed: 10,
			isEnd: false,
			prompt: '',
			runningAction: null
		}
	},
	computed: {
		hasCurrentAction() {
			return this.currentAction ? true : false;
		},
		actionList() {
			return  this.$refs.actionTable.actionList.map(item => {
				return item.name;
			});
		},
		isShow() {
			const isDuplicate = this.actionList.indexOf(this.newActionName) !== -1 && this.newActionName !== this.currentAction;
      
			if (isDuplicate) {
				this.prompt = this.$t('robot.code.prompt');
			}

			if (this.newActionName.split(' ').length > 1) {
				this.prompt = this.$t('robot.code.error');
			}

			return isDuplicate || this.newActionName.split(' ').length > 1 || this.isTemp;
		}
	},
	methods: {
		runTemAction() {
			const frameList = this.$refs.frameTable.frameList;
			const speedList = this.$refs.frameTable.speedList;

			this.$refs.frameTable.runInTime(frameList, speedList);
		},
		changeSpeed(value) {
			this.actionSpeed = value;
		},
		realTimeSync(actionName) {
			if (!this.hasCurrentAction) {
				this.getCurrentFrame();
			} else {
				this.isEnd = true;
				this.runningAction = actionName;
			}
		},
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
			const {frameList, speedList} = this.$refs.frameTable;

			if (!this.hasCurrentAction || this.isTemp) {
				return;
			}

			this.$api.createActions({
				data: {
					name: name,
					body: {
						frameList, speedList
					}
				}
			}).then(() => {
				this.isCopy = true;

				this.getActionsList();
				this.currentAction = name;
			});
		},
		updateActionName() {
			if (this.currentAction === this.newActionName || this.newActionName === '') {
				this.isChangeName = false;
				this.newActionName === '';

				return;
			}

			if (this.isTemp) {

                this.$dialog.confirmChange(this.$t('modal.action')).then(() => {

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

			if (this.isTemp) {
				this.$api.createActions({
					data: {
						name: this.currentAction,
						body: {
							frameList, speedList
						}
					}
				}).then(() => {
					this.isTemp = false;
					
					this.$refs.frameTable.getFrameList();

					this.getActionsList();
				});

			} else {

				this.updateAction('', {
					frameList, speedList
				}).then(() => {
					this.$refs.frameTable.getFrameList();
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
				if (name !== '') {
					this.currentAction = name;
					this.newActionName === '';
				}

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

#actionModal {
    button.btn-secondary {
        background-color: rgba(0, 0, 0, .1);
        padding:3px 5px;
        margin: 0 3px;
	}

	.input-group-prepend {
		button.btn-secondary {
			margin: 0;
		}
	}
	
	.b-dropdown {
		border-radius: 0 3px 3px 0;
		background-color: rgba(0, 0, 0, .5);
		button.btn-secondary {
			color: #fff;
			background-color: transparent;
		}
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

	button.btn-secondary {
        background-color: rgba(0, 0, 0, .1);
        padding:3px 5px;
        margin: 0 3px;
	}
}
</style>

