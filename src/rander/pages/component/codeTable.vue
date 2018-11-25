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
			<template slot="action" slot-scope="row">
				<b-button size="sm" @click.stop="runCode(row)">
					<i class="fas fa-play" />
				</b-button>
				<b-button size="sm" @click.stop="saveCode(row)">
					<i class="fas fa-save" />
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
      codeList: [
        {
          codeName: "ABCDE-FGHIJ-KLMNO"
        }
      ],
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
    getCodeList() {
      this.$api.getCodeList().then(data => (this.codeList = data));
    },
    createCode(name) {
      this.$api.createCode({
        data: {
          name: "name",
          body: this.$store.state.editor.python.content
        }
      });
    },
    // updateCode(row) {
    // 	const { codeName } = row.item;
    // 	this.$api.updateCode(codeName, {
    // 		data: {
    // 			name: codeName,
    // 			body: this.$store.state.editor.python.content
    // 		}
    // 	});
    // },
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
          para: codeName
        }
      });
    },
    saveCode(row) {
      const { codeName } = row.item;
      this.$api
        .getCode({
          index: codeName
        })
        .then(e => console.log(e));
    }
  },
  mounted() {
    this.getCodeList();
  },
  computed: {
    content() {
      return this.$store.state.editor.python.code;
    }
  }
};
</script>
