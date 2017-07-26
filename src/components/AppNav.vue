<template>
	<div class="app-nav">
		<img src="../assets/logo/skku_logo.jpg" height="42" width="42">
		<a href="javascript:void(0)" @click="goPage('mainpage')">SMART CAR FACTORY</a>
		<a href="javascript:void(0)" @click="goPage('mainpage')">Home</a>
		<a href="javascript:void(0)" @click="goPage('about')">About</a>
		<a href="javascript:void(0)" @click="goPage('reserve')">Book</a>
		<a href="javascript:void(0)" @click="goPage('contact')">Contact</a>
    <!-- 로그인 여부 판단 -->
		<div v-if="this.user">
			<a href="javascript:void(0)" @click="goPage('user')">My Page</a>
		</div>
		<div v-else>
			<a href="javascript:void(0)" @click="goPage('login')">Login</a>
			<a href="javascript:void(0)" @click="goPage('signup')">SignUp</a>
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

