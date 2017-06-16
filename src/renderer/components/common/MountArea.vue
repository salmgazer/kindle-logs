<template>
  <div class="col-md-4" id="mount-area">
    <div v-if="mountStatus == true">
      <i class="fa fa-2x fa-tablet mounted" aria-hidden="true"><!--<b id="mount-text">Connected</b>--></i>
    </div>
    <div v-else>
      <i class="fa fa-2x fa-tablet not-mounted" aria-hidden="true"><!--<b id="mount-text">Disconnected</b>--></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mount-area',
  props: ['mountStatus']
}
</script>

