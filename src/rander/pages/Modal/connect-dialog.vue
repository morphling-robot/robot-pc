<template>
	<b-modal
		id="robotModal"
		size="lg"
		ref="robotModalRef"
		:title="$t('robot.connect.label')"
		hide-footer
		centered
		@show="show"
		no-close-on-backdrop>
		<connect-table ref="connect" style="height: 540px;"/>
	</b-modal>
</template>

<script>
import cidrRange from 'cidr-range';
import axios from 'axios';
import ConnectTable from '../component/ConnectTable';

export default {
  data() {
    return {

		}
	},
	methods: {
		show() {
			this.$refs.connect.search();
		}
	},
	components: {
		ConnectTable
	}
};
</script>
