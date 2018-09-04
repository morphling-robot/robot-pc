<template>
	<b-input-group
		:prepend="`${fullId}`"
		size="sm"
		style="width: 7.5em">
    <b-form-input
			type="number"
			:formatter="limit"
			v-model="modified" />
    <b-input-group-append>
      <b-btn
				variant="success"
				:disabled="isOrigin"
				@click="commit">
				<i class="fas fa-pen" />
			</b-btn>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
	data() {
		return {
			temp: null,
			modified: null
		}
	},
	props: {
		id: {
			type: Number
		},
		angle: {
			type: Number
		}
	},
	mounted() {
		this.revert();
	},
	methods: {
		commit() {console.log(1);
			this.temp = this.modified;
			this.$emit('update:angle', this.modified);
		},
		revert() {
			this.modified = this.temp = this.angle;
		},
		limit(value) {
			return Math.max(0, Math.min(value, 360));
		} 
	},
	computed: {
		fullId() {
			return this.id < 10 ? '0' + this.id : this.id + '';
		},
		isOrigin() {
			return this.modified == this.temp;
		}
	},
	watch: {
		angle() {
			this.revert();
		}
	}
}
</script>
