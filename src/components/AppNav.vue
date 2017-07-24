<template>
	<div class="app-nav">
		<ul>
			<li><a :href="gotoMP">SMART CAR FACTORY</a></li>
			<li><a :href="gotoMP">Home</a></li>
			<li><a :href="gotoAbout">About</a></li>
			<li><a :href="gotoBook">Book</a></li>
			<li><a :href="gotoContact">Contact</a></li>
		</ul>
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