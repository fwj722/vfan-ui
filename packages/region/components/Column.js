export default {
  render () {
    return (
      <ul class="v-column">
      {
        this.list.map(val => {
          const child = []
          child.push(<span>{val.value}</span>)
          if(this.haveChild){
            child.push(<i class='v-caret-right el-icon-arrow-right'></i>)
          }
          return (
            <li key={val.key} class={{"selected": this.value && val.key === this.value.key}} on-click={() => this.click(val)}>
              {child}
            </li>
          )
        })
      }
    </ul>
    )
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    haveChild: {
      type: Boolean,
      default: true
    },
    value: Object
  },
  methods: {
    click (row) {
      this.$emit('input', row)
    }
  }
}