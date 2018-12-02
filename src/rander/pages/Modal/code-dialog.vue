<template>
	<b-modal
		id="codeModal"
		size="md"
		ref="codeModalRef"
		:title="$t('robot.code.label')"
		hide-footer
		no-close-on-backdrop>
		<code-table style="height: 540px;"/>
	</b-modal>
</template>

<script>
import CodeTable from '../component/codeTable';

export default {
	components: {
		CodeTable
	}
}
</script>

