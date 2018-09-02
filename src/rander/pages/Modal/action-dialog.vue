<template>
  <b-modal
    id="actionModal"
		title="动作管理"
    size="lg"
		no-close-on-backdrop
		centered
		@ok="fuck()">
    <div style="height: 530px;">
      <b-row>
        <b-col cols="3">
          <b-list-group class="robot-list">
              <b-list-group-item
                button
                v-for="(action, index) in actionList"
                :key="index"
                @click="changeAction(index)">
                {{action.name}}
              </b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col cols="9">
          <div style="height: 50%">
            <b-button-group
              v-for="(frame, index) in actionList[actionIndex]"
              :key="index"
              @click="changeFrameIndex(index)">
              {{index+1}}
            </b-button-group>
          </div>
          <div style="height: 50%">
            
          </div>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      actionIndex: null,
      frameIndex: null,
      actionList: [
        {
          name: '123'
        },
        {
          name: 'aoeu'
        },
        {
          name: 'test'
        }
      ]
    }
  },
  methods: {
    fuck () {
      alert(1);
    },
    changeActionIndex(index) {
      this.actionIndex = index;
    },
    changeFrameIndex(index) {
      this.frameIndex = index;
    }
  }
}
</script>

