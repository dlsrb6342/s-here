<template>
	<div class="login">
    <p>This is Login</p>
		사용자 학번: <input type="text" v-model="studentId"><br>
		Password: <input type="password" v-model="Password"><br>
		<button @click="submit">로그인</button>
    <button @click="goPage('signup')">회원가입</button>
		<br>
		<a href="javascript:void(0)" @click="goPage('lost')"
	</div>
</template>

<script>
export default {
  name: 'login',
	data () {
		return {
			studentId: '',
			Password: ''
		}
	},
  methods: {
		goPage: function (goMessage) { this.$emit('change', goMessage) },
		submit: function () {
			let xhr = new XMLHttpRequest()
			xhr.open('POST', '/api/user/login')
			xhr.setRequestHeader('Content-type', 'application/json')
			xhr.send('{"studentId":"' + this.studentId +
               '","password":"' + this.Password + '"}')
			/*
			// JSON POST 요청 전송은 확인되었지만, 실제로 작동하는지는 모름
			// 만일 유저 확인에 성공했다면,
			this.$emit('setUser', this.studentId)
			*/
		},
  }
}
</script>

<style>

</style>
