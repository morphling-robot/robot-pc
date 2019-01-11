<template>
	<b-modal
		id="codeModal"
		size="lg"
		ref="codeModalRef"
		:title="$t('robot.code.label')"
		hide-footer
		centered
		no-close-on-backdrop>
		<code-table style="height: 540px;" @close-dialog="$refs.codeModalRef.hide()" :perPage="11" />
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

