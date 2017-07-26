<template>
	<div class="app-nav">
		<img src="../assets/logo/skku_logo.jpg" height="42" width="42">
		<a @click="goPage('mainpage')">SMART CAR FACTORY</a>
		<a @click="goPage('mainpage')">Home</a>
		<a @click="goPage('about')">About</a>
		<a @click="goPage('reserve')">Book</a>
		<a @click="goPage('contact')">Contact</a>
    <!-- 회원가입 테스트가 마땅찮아서 임의로 만듬 -->
    <a @click="goPage('signup')">SignUp</a>

	</div>
</template>

<script>
export default {
	name: 'app-nav',
	methods: {
		goPage: function (goMessage) { this.$emit('change', goMessage) }
	}
}
</script>

<style>

</style>

