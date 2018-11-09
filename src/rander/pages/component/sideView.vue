<template>
	<!-- <test-video
		class="mx-auto"/> -->
	<div>
		<b-row>
			<b-col>
				<b-card title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
  			</b-card>
				<div
					style="height: 180px;width: 320px;background-color: black;"></div>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				
			</b-col>
		</b-row>
	</div>
</template>

<script>
import TestVideo from "../component/test";

export default {
  name: "sideView",
  components: {
    TestVideo
  }
};
</script>
