<template>
	<div class="open">
		<div v-if="isOpen">
			<img src="../../assets/open/open_on.png" @click='sendSignal'>
		</div>
		<div v-else>
			<img src="../../assets/open/open_off.png" @click='sendSignal'>
		</div>
	</div>
</template>

<script>
export default {
	name: 'open',
	data () {
		return {
			isOpen: false
		}
	},
	computed: {
		sendSignal: function (click) {
			var xmlHttp = new XMLHttpRequest()
		}
	}
}
</script>

<style>

</style>