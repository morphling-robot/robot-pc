<template>
	<div 
		:style="{
			width: `${width}px`
		}"
		style="position: absolute;top: 0;bottom: 0;">
		<div
			class="mb-2 rounded-0"
			:style="{
				height: `${videoCardHeight}px`,
				width: `100%`,
				overflow: 'hidden'
			}">
			<b-card
				id="video-card"
				no-body
				v-if="!(videoState && dialogState)"
				:style="{
					height: `${videoCardHeight}px`,
					width: `100%`,
					overflow: 'hidden'
				}">
			</b-card>
			<b-card
				no-body
				v-if="videoState && dialogState"
				:style="{
					height: `${videoCardHeight}px`,
					width: `100%`,
					overflow: 'hidden',
					'border-radius': 0
				}">
				<test-video class="h-100"></test-video>
			</b-card>
		</div>
		<b-card
			no-body
			id="card-tabs"
			:style="{
				top: `${videoCardHeight}px`,
				width: `${width}px`
			}">
			<b-tabs card>
				<b-tab :title="$t('robot.code.label')" no-body>
					<code-table :perPage="6" />
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
import TestVideo from "../component/video";
import CodeTable from '../component/codeTable';

export default {
	name: "sideView",
	props: ['width'],
  components: {
		TestVideo,
		CodeTable,
	},
	computed: {
		videoState() {
			return this.$store.state.video.videoIp;
		},
		dialogState() {
			return this.$store.state.video.dialogState === 'close';
		}
	},
	data() {
		return {
			videoCardHeight: 300
		}
	}
};
</script>

<style lang="less">
#video-card {
	background-image: url('../../../../asset/images/placeholder.png');
	background-size: 100% 100%;
	background-origin: 0 0;
	background-repeat: no-repeat;
	border-radius: 0px;
	border-top: 0px;
}

#card-tabs {
	position: absolute;
	bottom: 0px;
	border-bottom: none;
	border-radius: 0px;
}

.hide {
	display: none !important;
}
</style>

