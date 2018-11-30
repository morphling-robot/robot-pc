<template>
	<div 
		:style="{
			width: `${width}px`
		}"
		style="position: absolute;top: 0;bottom: 0;">
		<b-card
			id="video-card"
			no-body
			class="mb-2 rounded-0"
			:style="{
				height: `${videoCardHeight}px`
			}">
		</b-card>
		<b-card
			no-body
			id="card-tabs"
			:style="{
				top: `${videoCardHeight}px`,
				width: `${width}px`
			}">
			<b-tabs card>
				<b-tab :title="$t('robot.connect.label')" no-body active>
					<connect-table />
				</b-tab>
				<b-tab :title="$t('robot.code.label')" no-body>
					<code-table />
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
import TestVideo from "../component/test";
import CodeTable from '../component/codeTable';
import ConnectTable from '../component/ConnectTable';

export default {
	name: "sideView",
	props: ['width'],
  components: {
		TestVideo,
		CodeTable,
		ConnectTable
	},
	data() {
		return {
			videoCardHeight: 240
		}
	}
};
</script>

<style lang="less">
#video-card {
	background-image: url('../../../../asset/images/placeholder.jpg');
	background-size: 100% 100%;
	background-origin: 0 0;
	background-repeat: no-repeat;
}

#card-tabs {
	position: absolute;
	bottom: 0px;
}
</style>

