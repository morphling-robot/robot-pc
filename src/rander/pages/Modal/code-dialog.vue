<template>
	<b-modal
		id="codeModal"
		size="md"
		ref="codeModalRef"
		:title="$t('robot.code.label')"
		no-close-on-backdrop>
		<div
			id="filter"
			style="height: 530px;">

			<b-row>
				<b-col cols="auto">
					<b-button
						@click="getCodeList"
						size="sm">{{$t('robot.connect.search')}}</b-button>
				</b-col>
				<b-col></b-col>
				<b-col cols="auto">
					<b-pagination
						size="sm"
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
				<template slot="action" slot-scope="row">
					<b-button size="sm" @click.stop="runCode(row)">
						{{$t('robot.code.run')}}
					</b-button>
					<b-button size="sm" @click.stop="saveCode(row)">
						{{$t('robot.code.save')}}
					</b-button>
					<b-button size="sm" @click.stop="deleteCode(row)">
						{{$t('robot.code.delete')}}
					</b-button>
				</template>
			</b-table>

		</div>
	</b-modal>
</template>

<script>
export default {
	data() {
    return {
			codeList: [
				{
					codeName: 'ABCDE-FGHIJ-KLMNO'
				}
			],
			currentPage: 1,
			perPage: 5
    };
	},
	methods: {
		getCodeList() {
			this.$api.getCodeList().then(data => this.codeList = data);
		},
		runCode() {
			this.$api.postInstructs()
		},
		saveCode() {
			this.$api.getCode().then()
		},
		deleteCode() {
			this.$api.deleteCode()
		}
	},
	mounted() {
		this.$api.getCodeList();
	}
}
</script>
