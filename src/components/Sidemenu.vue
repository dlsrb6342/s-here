<template>
  <div id="sideNav" class="text-center sideNav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeSide()"><i class="fa fa-close fa-2x"></i></a>
    <div class="hidden-xs">
      <a href="#">My Info</a>
      <a href="#">Reservation</a>
      <a href="#">Menu3</a>
    </div>
    <div class="visible-xs">
      <a href="#"><i class="fa fa-cog fa-2x"></i></a>
      <a href="#"><i class="fa fa-calendar fa-2x"></i></a>
      <a href="#"><i class="fa fa-list fa-2x"></i></a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app-nav',
    props: ['user'],
    methods: {
      goPage: function (goMessage) { this.$emit('change', goMessage) }
    },
  }
</script>
<style>
</style>
