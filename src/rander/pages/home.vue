<template>
	<div style="height: 688px;">
		<p>{{$t('home')}}</p>
		<p>{{test+1}}</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			test: 1
		}
	},
	name: 'home'
}
</script>