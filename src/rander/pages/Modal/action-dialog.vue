<template>
  <b-modal
    id="actionModal"
		title="动作管理"
		no-close-on-backdrop
		centered
		@ok="fuck()">
    
  </b-modal>
</template>

<script>
export default {
  methods: {
    fuck () {
      alert(1);
    }
  }
}
</script>

