<template>
	<b-modal
		id="manageModal"
		size="lg"
		title="机器人管理"
		no-close-on-backdrop>
		<div id="filter" class="container" style="height: 530px;">
			<b-row>
				<b-col>
					<span>IP地址：</span>
					<b-input style="width: 70%;"></b-input>
					<p></p>
					<p style="margin-bottom: 0px!important;">所在子网：</p>
					<b-dropdown id="dropdown1" :text="this.selectCidr" class="m-md-2">
						<b-dropdown-item
							v-for="(cidr, index) in cidrList"
							:key="index"
							@click="changeCidr(cidr)">
							{{cidr}}
						</b-dropdown-item>
					</b-dropdown>
					<b-button style="margin-left: 20px;">开始搜索</b-button>
				</b-col>
				<b-col cols="5">
					<b-card
						class="status-card"
						title="已连接机器人">
						<p class="h6">
							IP地址：192.168.1.1
						</p>
						<p class="h6">
							型号：A
						</p>
						<p class="h6">
							序列号：ABCDE-FGHIJ-KLMNO
						</p>
					</b-card>
				</b-col>
			</b-row>
			<hr class="my-4">
			<b-row>
				<b-col>
					<b-list-group class="robot-list">
						<b-list-group-item
							button
							v-for="(robot, index) in robotList"
							:key="index">
							<b-row>
								<b-col cols="4">IP地址：{{robot.ip}}</b-col>
								<b-col>序列号：{{robot.serial}}</b-col>
							</b-row>
						</b-list-group-item>
					</b-list-group>
				</b-col>
			</b-row>
		</div>
	</b-modal>
</template>

<script>
export default {
  data() {
    return {
			selectCidr: '所有子网（默认）',
      robotList: [
				{
					ip: '192.168.1.1',
					serial: 'ABCDE-FGHIJ-KLMNO'
				},
				{
					ip: '192.168.1.2',
					serial: 'ABCDE-FGHIJ-KLMNO'
				},
				{
					ip: '192.168.1.4',
					serial: 'ABCDE-FGHIJ-KLMNO'
				},
				{
					ip: '192.168.1.8',
					serial: 'ABCDE-FGHIJ-KLMNO'
				},
				{
					ip: '192.168.1.16',
					serial: 'ABCDE-FGHIJ-KLMNO'
				},
			],
			cidrList: [
				'所有子网（默认）',
				'192.168.1.1/24',
				'192.168.31.1/24'
			]
    };
	},
	methods: {
		changeCidr(cidr) {
			this.selectCidr = cidr;
		}
	}
};
</script>

<style lang="less">
.robot-list {
	width: 100%!important;
}

.status-card {
  max-width: 300px;
}
</style>
