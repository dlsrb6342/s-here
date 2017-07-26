<template>
	<div class="app-nav">
		<img src="../assets/logo/skku_logo.jpg" height="42" width="42">
		<a :href="gotoMP">SMART CAR FACTORY</a>
		<a :href="gotoMP">Home</a>
		<a :href="gotoAbout">About</a>
		<a :href="gotoBook">Book</a>
		<a :href="gotoContact">Contact</a>
	</div>
</template>

<script>
export default {
	name: 'app-nav',
	props: ['pstate'],
	data () {
		return {
			state: 'main'
		}
	},
	computed: {
		gotoMP: function () {},
		gotoAbout: function () {},
		gotoBook: function () {},
		gotoContact: function () {}
	}
}
</script>

<style>

</style>

