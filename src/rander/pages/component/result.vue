<template>
	<b-container id="app-result" fluid v-show="showResult">
        <div id="top"></div>
        <div id="content" ref="content">
            <p v-for="(item, index) in resultContent" :key="index">{{item}}</p>
        </div>
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
                if (this.showResult) {
                    this.$api.getResult().then(({output}) => {
                        const regExp = new RegExp('GET /v1/output');

                        if (output === '') {
                            return;
                        }
                        
                        output.split('\n').forEach(item => {
                            if (regExp.test(item) || item === '') {
                                return false;
                            }

                            this.$store.commit('updateResultContent', {
                                isClear: false, content: item
                            });
                        });
                    });
                }
            }, 1000);
        }
    },
    mounted() {
        this.$root.$on('get-result', this.getResult);
    },
    destroyed() {
        this.$root.$off('get-result', this.getResult);
    },
    computed: {
        showResult() {
            return this.$store.state.editor.result.isShow;
        },
        resultContent() {
            return this.$store.state.editor.result.content;
        }
    },
    watch: {
        resultContent() {
            const element = this.$refs.content;

            this.$nextTick(() => {
                element.scrollTop = element.scrollHeight;
            });
        }
    }
}
</script>


<style lang="less">
#app-result {
  position: absolute;
  bottom: 24px;
  z-index: 100;
  width: 100%;
  color: #333333;
  background-color: #ffffff;
  height: 324px;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  padding: 0px;
  p {
        padding: 1px 15px;
        margin: 0px;
    }
}
#top {
    width: 100%;
    height: 20px;
    background-color: #F7F9FA;
}
#content {
    height: 300px;
    overflow: scroll;
} 
</style>