<template lang='pug'>
.keypad-container
  .md-layout
    .md-layout-item.md-size-100
      .md-layout.md-alignment-center
        .md-layout-item.md-size-80
          md-field
            label Username or number...
            md-input(@input='dialValueInput', v-model='inputValue')
      .md-layout
        .key-container.md-layout-item.md-size-33(v-for='key in keypadData', :key='key.id', @click='keypadClick(key)')
          .key
            | {{key.key}}
          .sub-key
            | {{key.text}}
        .key-container-buttons.md-layout-item.md-size-33
        .key-container-buttons.speed-dial-button-containcer.md-layout-item.md-size-33
          md-speed-dial(md-direction='bottom')
            md-speed-dial-target.md-primary
              md-icon.fa.fa-phone
            md-speed-dial-content
              md-button.md-icon-button(data-key='call', @click='call(false)')
                md-icon.fa.fa-phone
              md-button.md-icon-button(data-key='call', @click='call(true)')
                md-icon.fas.fa-video
        .key-container-buttons.md-layout-item.md-size-33
          .dial-key
              i.fas.fa-long-arrow-alt-left
          .dial-sub-key Back

</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
let keypadData = [
  {
    id: 1,
    key: 1,
    text: ''
  },
  {
    id: 2,
    key: 2,
    text: 'abc'
  },
  {
    id: 3,
    key: 3,
    text: 'def'
  },
  {
    id: 4,
    key: 4,
    text: 'ghi'
  },
  {
    id: 5,
    key: 5,
    text: 'jkl'
  },
  {
    id: 6,
    key: 6,
    text: 'mno'
  },
  {
    id: 7,
    key: 7,
    text: 'pqrs'
  },
  {
    id: 8,
    key: 8,
    text: 'tuv'
  },
  {
    id: 9,
    key: 9,
    text: 'wxyz'
  },
  {
    id: 10,
    key: '#',
    text: ''
  },
  {
    id: 11,
    key: 0,
    text: '+'
  },
  {
    id: 12,
    key: '*',
    text: ''
  }
]
export default {
  name: 'keypad',
  props: {
  },
  data () {
    return {
      keypadData: keypadData,
      inputValue: ''
    }
  },
  mounted () {
    // this.setSpeedDialPosition()
  },
  computed: {
    ...mapGetters(['dialValue'])
  },
  methods: {
    ...mapMutations(['CHANGE_DIAL_VALUE']),
    setSpeedDialPosition () {
      let newTop = $('.speed-dial-button-containcer').offset().top - 100
      $('.md-speed-dial').offset({top: newTop})
    },
    dialValueInput () {
      this.CHANGE_DIAL_VALUE(this.inputValue)
    },
    keypadClick (key) {
      this.inputValue += key.key
      this.CHANGE_DIAL_VALUE(this.inputValue)
    },
    call (isVideoCall) {
      this.$emit('onCallClick', isVideoCall)
    }
  }
}
</script>

<style scoped>
.keypad-container{
  background: white;
  min-height: 600px;
}
.key-container, .key-container-buttons{
  text-align: center;
  height: 60px;
  padding-top: 15px;
}
.key-container:hover{
  background: #16a085;
  cursor: pointer;
}
.key-container:hover .key,
.key-container:hover .sub-key{
  color:#eee;
}
.key{
  font-size: x-large;
}
.sub-key{
  color: slategray;
}
</style>
