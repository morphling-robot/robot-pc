<template>
    <b-row>
        <b-col cols="1"  class="px-0 text-center">
            <i class="fas fa-minus-circle" @click="savePosition($event, value - 1)"></i>
        </b-col>
        <b-col class="px-0">
            <b-progress :id="id" :min="min" :max="max" show-progress
                @mousedown.native.prevent="savePosition($event, 100 * ($event.offsetX / progressLength))"
                style="height:100%;">
                <b-progress-bar variant="primary" :value="value" style="cursor: pointer"></b-progress-bar>
            </b-progress>
        </b-col>
        <b-col cols="1" class="px-0 text-center">
            <i class="fas fa-plus-circle" @click="savePosition($event, value + 1)"></i>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: ['value', 'id', 'pointTarget', 'min', 'max'],
    computed: {
		progressLength() {

			if (typeof this.pointTarget === 'undefined' || this.pointTarget === -1) {
				return;
			}

			return document.getElementById(this.id).offsetWidth;
		}
	},
	methods: {
		savePosition(event, value) {
            this.$emit('update-progress', value);
		}
	},
}
</script>

