<template>
	<div
    id="code-table"
		class="pb-3">
		<b-row>
			<b-col cols="auto" id="toolbar" 	class="pt-2">
				<b-button
					@click="getCodeList"
					size="sm" v-b-tooltip.hover :title="$t('robot.refresh')"><i class="fas fa-sync-alt" /></b-button>
        <b-button size="sm" @click.stop="run()" v-if="!runed"
          v-b-tooltip.hover :title="$t('robot.run')">
          <i class="far fa-play"></i><br/>
        </b-button>
        <b-button size="sm" @click.stop="pause()" v-if="runed"
        v-b-tooltip.hover :title="$t('robot.pause')">
          <i class="fas fa-pause"></i><br/>
        </b-button>
        <!-- <b-button size="sm" @click.stop="reset()">
          <i class="fas fa-sync-alt"></i>
        </b-button> -->
        <b-button size="sm" @click.stop="stop()"
        v-b-tooltip.hover :title="$t('robot.stop')">
          <i class="fas fa-stop"></i><br/>
        </b-button>
			</b-col>
			<b-col class="pt-2">
				<b-pagination
					size="sm"
          :limit="3"
          align="right"
					:total-rows="codeList.length"
					v-model="currentPage"
					:per-page="perPage" />
			</b-col>
		</b-row>

    <p v-show="isShow" class="text-danger">{{prompt}}</p>

		<b-table
			small
			:items="codeList"
			:fields="[
				{ key: 'codeName', label: 'codeName'},
				{ key: 'action', label: 'Action'}
			]"
			:current-page="currentPage"
			:per-page="perPage">
      <template slot="codeName" slot-scope="row">
        <span v-if="row.item.codeName !== currentCode">
          <b-link style="display: inline-block;min-width: 7em">{{row.item.codeName}}</b-link>
          <b-btn
              @click="startChangeName(row)" size="sm"
              variant="success">
              <i class="fas fa-pencil-alt"></i>
            </b-btn>
        </span>
        <span v-if="row.item.codeName === currentCode">
          <b-form-input
            size="sm"
            style="display: inline-block;width: 12em"
            v-model="newName"
            type="text"></b-form-input>
          <b-btn
              @click="updateCode(row)" size="sm" :title="prompt"
              :disabled="isShow"
              variant="success">
              <i class="fas fa-save" />
            </b-btn>
        </span>
      </template>
			<template slot="action" slot-scope="row">
				<b-button size="sm" @click.stop="runCode(row)">
					<i class="fas fa-play" />
				</b-button>
				<b-button size="sm" @click.stop="setCodeToModify(row)">
					<i class="fas fa-folder-open" />
				</b-button>
				<b-button size="sm" @click.stop="deleteCode(row)">
					<i class="fas fa-trash-alt" />
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
  data() {
    return {
      runed: true,
      currentPage: 1,
      currentCode: null,
      newName: '',
      prompt: ''
    };
  },
  props: ['perPage'],
	methods: {
    setCodeToModify(row) {
      const { codeName } = row.item;
      this.$api
        .getCode({
          index: codeName
        })
        .then(code => {
          if (this.isChanged) {
            this.$dialog.confirmChange(this.$t('modal.code')).then(() => {
              this.updatePython(code);
              
            });
          } else {
            this.updatePython(code);
          }
        });

    },
    updatePython(code) {
      this.$store.commit('pythonUpdateCode', code.body);

      this.$store.commit('pythonOriginUpdateCode', code.body);
      this.$store.commit('blocklyOriginUpdateCode', '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>');

      this.$router.push("python");

      this.$emit('close-dialog');

      this.$store.commit('modeUpdate', 'python');

      this.$root.$emit('change-mode', 'python');
    },
    getCodeList() {
      this.$api.getCodeList().then(data => {

        this.$store.commit('getCodeList', data);
      });
    },
    startChangeName(row) {
      this.currentCode = row.item.codeName;

      this.newName = row.item.codeName;

    },
    updateCode(row) {
      const { codeName } = row.item;

      if (codeName === this.newName || this.newName === '') {
        this.currentCode = null;
        
				return;
      }
      
       this.$api.updateCode({
          index: codeName,
          data: {
            name: this.newName,
            body: ''
          }
        }).then(() => {
          this.currentCode = null;
          this.getCodeList();
        });
    },
    deleteCode(row) {
      const { codeName } = row.item;
      this.$api.deleteCode({
        index: codeName,
        config: {
          auth: {
            username: this.$store.state.user.token,
            password: ''
          }
        }
      }).then(() => {
        this.getCodeList();
      })
    },
    runCode(row) {
      const { codeName } = row.item;
      this.$api.postInstructs({
        data: {
          instruct_type: 4002,
          para1: codeName,
          para2: 1
        }
      });
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
  },
  mounted() {
    this.$root.$on('get-data', this.getCodeList);
  },
  destroyed() {
		this.$root.$off('get-data', this.getCodeList);
	},
  computed: {
    content() {
      return this.$store.state.editor.python.code;
    },
    codeList() {
      return this.$store.state.editor.codeList;
    },
    isShow() {
      const codeList = this.codeList.map(item => {
        return item.codeName;
      });

      const isDuplicate = codeList.indexOf(this.newName) !== -1 && this.newName !== this.currentCode && this.currentCode;
      
			if (isDuplicate) {
				this.prompt = this.$t('robot.code.prompt');
			}

			if (this.newName.split(' ').length > 1) {
				this.prompt = this.$t('robot.code.error');
			}

			return isDuplicate || this.newName.split(' ').length > 1;
		},
    isChanged() {
			return this.$store.getters.isPythonChanged || this.$store.getters.isPythonChanged;
		}
  }
};
</script>


<style lang="less">
#code-table {
  button.btn-secondary {
    background-color: rgba(0, 0, 0, .1);
    padding:3px 5px;
    margin: 0 3px;
  }
}
</style>


