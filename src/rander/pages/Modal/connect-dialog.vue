<template>
	<b-modal
		id="robotModal"
		size="lg"
		ref="robotModalRef"
		:title="$t('robot.connect.label')"
		hide-footer
		centered
		@show="show"
		@hidden="hide"
		no-close-on-backdrop>
		<connect-table ref="connect" style="height: 540px;"/>
	</b-modal>
</template>

<script>
import cidrRange from 'cidr-range';
import axios from 'axios';
import ConnectTable from '../component/ConnectTable';

export default {
	methods: {
		show() {
			this.$refs.connect.createUdpConnect();
		},
		hide() {
			if (this.$refs.connect.server) {
				this.$refs.connect.server.close();
			}

			this.$api.getCodeList().then(data => {

				this.$store.commit('getCodeList', data);
			});
		}
	},
	components: {
		ConnectTable
	}
};
</script>

<style lang="less">
#robotModal {

	.modal-title {
		color: #666666;
	}

	fieldset {
		legend {
			color: #333333;
		}
	}

	.form-control:disabled, .form-control[readonly] {
		background-color: #F7F9FA;
		border: none;
	}

	table thead {
		background-color: #F7F9FA;

		th {
			border:none;
		}
	}
}
</style>

