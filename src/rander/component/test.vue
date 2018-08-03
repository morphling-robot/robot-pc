<template>
	<input
      type="text"
      :content="content"
      @change="$emit('change', $event.target.checked)"
  >
</template>

<script>
export default {
	name: 'testarea',
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    content: String
  }
}
</script>
