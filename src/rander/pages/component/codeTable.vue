<template>
	<div
		class="pb-3"
		id="filter">
		<b-row>
			<b-col cols="auto" id="toolbar" 	class="pt-3">
				<b-button
					@click="getCodeList"
					size="sm" v-b-tooltip.hover title="刷新"><i class="fas fa-sync-alt" /></b-button>
        <b-button size="sm" @click.stop="run()" v-if="!runed"
          v-b-tooltip.hover title="启动">
          <i class="far fa-play-circle"></i><br/>
        </b-button>
        <b-button size="sm" @click.stop="pause()" v-if="runed"
        v-b-tooltip.hover title="暂停">
          <i class="far fa-pause-circle"></i><br/>
        </b-button>
        <!-- <b-button size="sm" @click.stop="reset()">
          <i class="fas fa-sync-alt"></i>
        </b-button> -->
        <b-button size="sm" @click.stop="stop()"
        v-b-tooltip.hover title="停止">
          <i class="far fa-stop-circle"></i><br/>
        </b-button>
			</b-col>
			<b-col class="pt-3">
				<b-pagination
					size="sm"
          :limit="3"
          align="right"
					:total-rows="codeList.length"
					v-model="currentPage"
					:per-page="perPage" />
			</b-col>
		</b-row>

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
              @click="updateCode(row)" size="sm"
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
      perPage: 11,
      currentCode: null,
      newName: ''
    };
  },
	methods: {
    setCodeToModify(row) {
      const { codeName } = row.item;
      this.$api
        .getCode({
          index: codeName
        })
        .then(code => {

          this.$store.commit('pythonUpdateCode', code.body);

          this.$router.push("python");

          this.$emit('close-dialog');

          this.$store.commit('modeUpdate', 'python');

          this.$root.$emit('change-mode', 'python');
        });

    },
    getCodeList() {
      this.$api.getCodeList().then(data => {

        this.$store.commit('getCodeList', data);
      });
    },
    startChangeName(row) {
      this.isShow = false;
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
    // this.getCodeList(); 我觉得没啥用

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
    }
  }
};
</script>

