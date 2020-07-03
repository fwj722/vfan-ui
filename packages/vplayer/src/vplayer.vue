<template>
  <div>
    <video v-if="type==='video'"
           :poster="poster"
           :src="defaultSrc">
      <template v-if="videoData">
        <source v-for="(item ,index) in videoData"
                :key="index"
                :src="item.src"
                :type="'video/'+extname(item.src)"
                :size="item.size">
      </template>

      <!-- <track kind="captions"
             label="English"
             srclang="en"
             src="https://cdn.vplayer.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
             default/> -->
    </video>
    <audio v-else-if="type === 'audio'">
      <template v-if="audioData">
        <source v-for="(item,index) in audioData" :key="index"  :src="item" :type="'audio/'+extname(item)" />
      </template>
    </audio>
  </div>
</template>
<script>
import VPlayer from "./../js/vplayer"
export default {
  name: 'VMedia',
  props: {
    type: {
      type: String,
      required: true,
      default: "video"
    },
    poster: {
      type: String,
      default: ""
    },
    defaultSrc:{
      type:String,
      default:"./../../sprite/a.mp4"
    },
    videoData: {
      type: Array,
      default () {
        return [{
          src: null,
          size: 720

        }]
      }
    },
    audioData:{
      type: Array,
      default () {
        return []
      }
    },
    /** Options object for vplayer config. **/
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    /** Array of events to emit from the vplayer object **/
    emit: {
      type: Array,
      required: false,
      default () { return [] }
    }
  },
  data () {
    return {
      player: {}
    }
  },
  computed: {
    opts () {
      const options = this.options
      return options
    }
  },
  mounted () {
    this.player = new VPlayer(this.$el.firstChild, this.opts)
    console.log(this.player)
    this.emit.forEach(element => {
      this.player.on(element, this.emitPlayerEvent)
    })
  },
  beforeDestroy () {
    try {
      this.player.destroy()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    emitPlayerEvent (event) {
      this.$emit(event.type, event)
    },
    extname (filename) {
      if (!filename || typeof filename != 'string') {
        return false
      }
      let a = filename.split('').reverse().join('');
      let b = a.substring(0, a.search(/\./)).split('').reverse().join('');
      return b
    }
  }
}
</script>