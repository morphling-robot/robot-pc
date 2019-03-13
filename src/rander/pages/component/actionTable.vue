<template>
    <div id="action-table">
        <div>
            <b-button size="sm" variant="success" @click="tempCreateAction"
                :disabled="isTemp">{{$t('robot.action.create')}}</b-button>
            <b-button size="sm" variant="success" @click="CopyAction"
                :disabled="!currentAction || isTemp">{{$t('robot.action.copy')}}</b-button>
        </div>
        <div class="mt-3">
            <b-pagination
                size="sm"
                :total-rows="actionList.length"
                v-model="currentActionPage"
                :limit="5"
                :per-page="8" />
            <div style="width: 110%">
                {{$t('robot.action.speed')}} <br />
                <b-form-slider v-model="speed"
                    class="mb-2"
                    trigger-change-event :min="1" :max="100" :step="1" @change="updateSpeed"></b-form-slider>
                <span style="display: inline-block;width: 2em;text-align: center">{{speed}}</span>
            </div>
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
                @row-clicked="changeCurrentAction">
                <template slot="name" slot-scope="row">
                    <a v-b-tooltip.hover.left :title="`${$t('robot.code.editor')}${row.value}`" style="cursor: pointer; color: #0000ff">{{row.value}}</a>
                </template>
                <template slot="operate" slot-scope="row">
                    <span>
                        <b-button size="sm" @click.stop="updateAction(row)" v-if="row.item.name === currentAction && hasChanged">
                            <i class="fas fa-save"></i>
                        </b-button>
                        <b-button size="sm" @click.stop="deleteAction(row)" v-if="row.item.name !== currentAction">
                            <i class="fas fa-trash" />
                        </b-button>
                        <b-button size="sm" @click="init" v-if="row.item.name === currentAction">
                            <i class="fas fa-times" />
                        </b-button>
                        <b-button size="sm" @click.stop="runAction(row)" :disabled="row.item.name !== currentAction && !!currentAction">
                            <i class="fas fa-play" />
                        </b-button>
                    </span>
                </template>
            </b-table>
            <div class="mt-3">
                <b-button size="sm" @click="init" v-b-tooltip.hover :title="$t('robot.refresh')">
                    <i class="fas fa-sync-alt" /></b-button>
                <b-button size="sm" @click.stop="run()" v-if="!runed" v-b-tooltip.hover :title="$t('robot.run')">
                    <i class="fas fa-play"></i>
                </b-button>
                <b-button size="sm" @click.stop="pause()" v-if="runed" v-b-tooltip.hover :title="$t('robot.pause')">
                    <i class="fas fa-pause"></i>
                </b-button>
                <b-button size="sm" @click.stop="stop()" v-b-tooltip.hover :title="$t('robot.stop')">
                    <i class="fas fa-stop"></i>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import Blockly from '@/lib/blockly/browser.js';

export default {
    name: 'action-table',
    data() {
        return {
            currentActionPage: 0,
            speed: 10,
            actionList: []
        }
    },
    props: ['currentAction', 'hasChanged', 'isTemp'],
    // watch: {
    //     currentAction(newName) {
    //         this.changePageNumber(newName);
    //     }
    // },
    computed: {
        actionNameList() {
            return this.actionList.map(action => action.name);
        },
        runed() {
            return this.$store.state.editor.runed;
        }
    },
    methods: {
        changePageNumber(newName) {
            const index = this.actionNameList.indexOf(newName);

            index === -1 ? this.currentActionPage = 1 : this.currentActionPage = Math.ceil((index + 1) / 8);
        },
        init() {
            this.getActionsList();
            
            this.$emit('actionlist-init');
        },
        updateSpeed({newValue}) {
            this.$emit('action-speed', newValue);
        },
        run() {
			this.$store.commit('updateRunStatus', true);

			this.$api.robotControl({
				data: 'continue'
			});
		},
		pause() {
			this.$store.commit('updateRunStatus', false);

			this.$api.robotControl({ 
				data: 'pause'
			});
		},
		stop() {
            this.$store.commit('updateRunStatus', true);
            
			this.$api.robotControl({
				data: 'stop'
			});
        },
        runAction(row) {
            const { name } = row.item;

            if (this.isTemp || name === this.currentAction) {
                this.$emit('run-temAction', name);
            } else {

                this.$api.runUserAction({
                    data: {
                        name,
                        speed: this.speed
                    }
                }).then(() => {
                    this.$emit('action-runed', name);
                });
            }
        },
        updateAction() {
			this.$emit('update-action')
		},
		deleteAction(row) {
			const { name } = row.item;
			this.$api.deleteActions({
				index: name
			}).then(() => {
				this.getActionsList();
            });
            
             this.$emit('actionlist-init');
        },
        createAction(name) {
			this.$api.createActions({
				index: name,
				data: {
					name: name,
					body: this.currentAction
				}
			});
        },
        getActionsList() {
			return this.$api.getActionsList().then(data => {
				if (data) {
						this.actionList = data;
						const actionArr = data.map(action => [action.name, `"${action.name}"`]);
						
						Blockly.Blocks['exec_action'] = {
								init: function() {
										this.appendDummyInput()
											.appendField("执行动作");
										this.appendDummyInput()
                                            .appendField(new Blockly.FieldDropdown(actionArr), "action_name");
                                        this.appendDummyInput()
                                            .appendField("运动速度")
                                            .appendField(new Blockly.FieldNumber(1.0, 0.1, 5, 0.1), "speed");
										this.setInputsInline(true);
                                        this.setPreviousStatement(true, null);
                                        this.setNextStatement(true, null);
										this.setColour(230);
										this.setTooltip("");
										this.setHelpUrl("");
								}
						};
        }
                
            this.changePageNumber(this.currentAction);

			}).catch(() => {
                this.actionList = [];
            });
        },
        changeCurrentAction(item, index, event) {
            if (item.name === this.currentAction) {
                return;
            }

			if (this.hasChanged) {

                this.$dialog.confirmChange(this.$t('modal.file')).then(() => {

                    this.$emit('change-action', item.name);
                    
                }, () => {
                    return;
                });
			} else {

                this.$emit('change-action', item.name);
            }

        },
        tempCreateAction() {

            const name = this.rename('', 'new_action', 1);

            if (this.hasChanged) {

                this.$dialog.confirmChange(this.$t('modal.file')).then(() => {

                    this.actionList.unshift({name});

                    this.$emit('create-action', name);
                    
                }, () => {
                    return;
                });
			} else {

                 this.actionList.unshift({name});

                this.$emit('create-action', name);
            }
        },
        CopyAction() {
            if (!this.currentAction) {
                return;
            }

            // const name = `${this.currentAction}_copy`;
            const name = this.rename(this.currentAction, 'copy', 1);

            // if (this.hasChanged) {

            //     this.$dialog.confirmChange(this.$t('modal.file')).then(() => {

            //         this.actionList.unshift({name})

            //         this.$emit('copy-action', name);
                    
            //     }, () => {
            //         return;
            //     });
			// } else {

            // }

            this.$emit('copy-action', name);
        },
        rename(name, postfix, num) {
            let mergeName = name !== '' ? `${name}_${postfix}_${num}` : `${postfix}_${num}`;

            if (this.actionNameList.indexOf(mergeName) !== -1) {
                num = num + 1;

                mergeName = this.rename(name, postfix, num);
            }

            return mergeName;
        }
    }
}
</script>