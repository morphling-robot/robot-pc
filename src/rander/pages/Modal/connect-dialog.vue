<template>
	<b-modal
		id="robotModal"
		size="lg"
		ref="robotModalRef"
		:title="$t('robot.connect.label')"
		hide-footer
		no-close-on-backdrop>
		<connect-table style="height: 540px;"/>
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
	components: {
		ConnectTable
	}
};
</script>
