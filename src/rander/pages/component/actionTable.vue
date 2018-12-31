<template>
    <div>
        <div>
            <b-button size="sm" variant="success" @click="tempCreateAction"
                :disabled="isTemp || isCopy">{{$t('robot.action.create')}}</b-button>
            <b-button size="sm" variant="success" @click="CopyAction"
                :disabled="!currentAction || isTemp || isCopy">{{$t('robot.action.copy')}}</b-button>
        </div>
        <div class="mt-3">
            <b-pagination
                size="sm"
                :total-rows="actionList.length"
                v-model="currentActionPage"
                :limit="5"
                :per-page="10" />
            <div style="width: 110%">
                {{$t('robot.action.speed')}} <br />
                <b-form-slider v-model="speed"
                    class="mb-2"
                    trigger-change-event :min="1" :max="100" :step="1"></b-form-slider>
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
                    <a v-b-tooltip.hover.left :title="`切换到${row.value}`" style="cursor: pointer; color: #0000ff">{{row.value}}</a>
                </template>
                <template slot="operate" slot-scope="row">
                    <span>
                        <b-button size="sm" @click.stop="updateAction(row)" v-if="row.item.name === currentAction && hasChanged">
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
            <div class="mt-3">
                <b-button size="sm" @click="getActionsList" v-b-tooltip.hover :title="$t('robot.refresh')">
                    <i class="fas fa-sync-alt" /></b-button>
                <b-button size="sm" @click.stop="run()" v-if="!runed" v-b-tooltip.hover :title="$t('robot.run')">
                    <i class="far fa-play-circle"></i>
                </b-button>
                <b-button size="sm" @click.stop="pause()" v-if="runed" v-b-tooltip.hover :title="$t('robot.pause')">
                    <i class="far fa-pause-circle"></i>
                </b-button>
                <b-button size="sm" @click.stop="stop()" v-b-tooltip.hover :title="$t('robot.stop')">
                    <i class="far fa-stop-circle"></i>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'action-table',
    data() {
        return {
            currentActionPage: 0,
            runed: true,
            speed: 10,
            actionList: []
        }
    },
    props: ['currentAction', 'hasChanged', 'isTemp', 'isCopy'],
    methods: {
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
		stop() {
			this.$api.robotControl({
				data: 'stop'
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
				}

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

            const name = 'a_new_action_1';

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

            const name = `a_${this.currentAction}_copy`;

            if (this.hasChanged) {

                this.$dialog.confirmChange(this.$t('modal.file')).then(() => {

                    this.actionList.unshift({name})

                    this.$emit('copy-action', name);
                    
                }, () => {
                    return;
                });
			} else {

                this.actionList.unshift({name})

                this.$emit('copy-action', name);
            }
        },
    }
}
</script>

