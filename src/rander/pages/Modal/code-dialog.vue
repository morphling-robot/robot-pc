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
						@click="search"
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
				:items="robotList"
				:fields="[
					{ key: 'id', label: 'IP' },
					{ key: 'codeName', label: 'codeName'},
					{ key: 'action', label: 'Action'}
				]"
				:current-page="currentPage"
				:per-page="perPage">
				<template slot="connect" slot-scope="row">
					<b-button size="sm" @click.stop="connect(row)">
						{{$t('robot.code.run')}}运行
					</b-button>
					<b-button size="sm" @click.stop="connect(row)">
						{{$t('robot.code.save')}}另存为
					</b-button>
					<b-button size="sm" @click.stop="connect(row)">
						{{$t('robot.code.delete')}}删除
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
					ip: '192.168.1.1',
					serialNumber: 'ABCDE-FGHIJ-KLMNO'
				}
			],
			currentPage: 1,
			perPage: 5
    };
	},
	methods: {
		serach() {
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
	}
}
</script>
