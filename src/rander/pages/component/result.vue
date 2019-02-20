<template>
	<b-container id="app-result" fluid>
		<p>111</p>
	</b-container>
</template>

<script>
export default {
    name: 'result-show',
    data() {
        return {
            timer: null
        }
    },
    methods: {
        getResult() {
            this.timer = setInterval(() => {
                this.$api.getResult().then(({output}) => {
                    console.log(output);
                })
            }, 1000);
        }
    },
    mounted() {
        this.$root.$on('get-result', this.getResult);
    },
    destroyed() {
        this.$root.$off('get-result', this.getResult);
    }
}
</script>


<style lang="less">
#app-result {
//   position: fixed;
//   bottom: 24px;
  width: 100%;
  color: #333333;
  background-color: #ffffff;
  height: 324px;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
}
</style>