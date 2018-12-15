<template>
	<div
		class="py-3"
		id="filter">
		<b-row>
			<b-col cols="auto">
				<b-button
					@click="getCodeList"
					size="sm"><i class="fas fa-sync-alt" /></b-button>
			</b-col>
			<b-col></b-col>
			<b-col cols="auto">
				<b-pagination
					size="sm"
					:total-rows="2"
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
        <b-link v-if="isShow" style="display: inline-block;min-width: 7em" @click="setCodeToModify(row)">{{row.item.codeName}}</b-link>
        <b-form-input
          size="sm"
          v-if="!isShow" style="display: inline-block;width: 12em"
          @blur.native="isShow = true;"
          v-model="row.item.codeName"
          type="text"></b-form-input>
          <b-btn
            @click="isShow = false" size="sm"
            variant="success">
            <i class="fas fa-pencil-alt"></i>
          </b-btn>
      </template>
			<template slot="action" slot-scope="row">
				<b-button size="sm" @click.stop="runCode(row)">
					<i class="fas fa-play" />
				</b-button>
				<b-button size="sm" @click.stop="updateCode(row)">
					<i class="fas fa-save" />
				</b-button>
				<b-button size="sm" @click.stop="deleteCode(row)">
					<i class="fas fa-trash-alt" />
				</b-button>
			</template>
		</b-table>
    <b-button size="sm" @click.stop="run()" v-if="!runed">
      <i class="fas fa-play" />
    </b-button>
    <b-button size="sm" @click.stop="pause()" v-if="runed">
      <i class="fas fa-pause-circle"></i>
    </b-button>
    <b-button size="sm" @click.stop="reset()">
      <i class="fas fa-sync-alt"></i>
    </b-button>
    <b-button size="sm" @click.stop="stop()">
      <i class="fas fa-power-off"></i>
    </b-button>
	</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      runed: true,
      // codeList: [
      //   {
      //     codeName: "ABCDE-FGHIJ-KLMNO"
      //   }
      // ],
      currentPage: 1,
      perPage: 5
    };
	},
	mounted() {
		this.init();
  },
	methods: {
		init() {
			this.getCodeList();
    },
    setCodeToModify(row) {
      const { codeName } = row.item;
      this.$api
        .getCode({
          index: codeName
        })
        .then(code => {

          this.$store.commit('pythonUpdateCode', code.body);
          this.$store.commit('pythonUpdateContent', code.body);

          this.$router.push("python");

          this.$emit('close-dialog');

          this.$store.commit('modeUpdate', 'python');
        });

    },
    getCodeList() {
      this.$api.getCodeList().then(data => {

        // this.codeList = data
        this.$store.commit('getCodeList', data);
      });
    },
    createCode() {
      window.prompt('请输入文件名', 'untitle', name => {
        this.$api.createCode({
          data: {
            name,
            body: this.$store.state.editor.python.content
          }
        });
      });
    },
    updateCode(row) {
      const { codeName } = row.item;
       this.$api.getCode({
          index: codeName
        }).then(code => {
          this.$api.updateCode({
            index: codeName,
            data: {
              name: codeName,
              body: code.body
            }
          });
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
      });
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
    // saveCode(row) {
    //   const { codeName } = row.item;
    //   this.$api
    //     .getCode({
    //       index: codeName
    //     })
    //     .then(e => console.log(e));
    // }
  },
  mounted() {
    this.getCodeList();
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
