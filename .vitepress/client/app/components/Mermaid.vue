<template>
  <div>
    <pre class="mermaid">
	{{ graph }}
    </pre>
  </div>
</template>

<script>
import { onMounted, watch, watchEffect } from 'vue'
import Loading from './Loading.vue'
export default {
    name: "Mermaid",
    components: {Loading},
    props: {
        graph: {
            type: String,
            required: false,
            default: `graph LR\n    Component-->NotReady-->Use-->Fence-->Now`
        },
    },
    setup (props, context) {
	  watchEffect(() => console.log(`id is: ${props.id}`))
	  watchEffect(() => console.log(`graph is: ${props.graph}`))
      onMounted(() => {
        console.log('component mermaid mounting');
      })
    }
}
</script>

<style>
.mermaid {
  cursor: pointer;
  padding: 5px;
}

.mermaid pre {
  font-family: Hack, monospace;
  font-size: 13px;
  margin: 0;
}
</style>
