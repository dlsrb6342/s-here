<template>
	<div class="view login-box align-center vertical-center-flex">
    <div class="container middle-box">
      <div class="row">
        <div class="input-group input-group-lg col-md-6 align-center">
          <span class="input-group-addon bg-blue">ID</span>
          <input v-model="studentId" class="form-control" placeholder="Student ID">
        </div>
      </div>
      <div class="row">
        <div class="input-group input-group-lg col-md-6 align-center">
          <span class="input-group-addon bg-blue">PW</span>
          <input type="password" v-model="Password" class="form-control" placeholder="Password">
        </div>
      </div>
      <div class="row">
        <div class="align-center justify-content-around">
          <button class="btn bg-white" @click="submit">Log In</button>
          <button class="btn bg-white" @click="goPage('signup')">Sign In</button>
          <button class="btn bg-white" @click="goPage('lostpw')">비밀번호를 잊으셨나요?</button>
        </div>
      </div>
    </div>
      <!--
    <p>This is Login</p>
		사용자 학번: <input type="text" v-model="studentId"><br>
		Password: <input type="password" v-model="Password"><br>
		<a class="btn"  @click="submit">로그인</a>
    <a class="btn"  @click="goPage('signup')">회원가입</a>
		<br>
		<a class="btn" @click="goPage('lostpw')">비밀번호를 잊으셨나요?</a>
		-->
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
		goPage: function (goMessage) { this.$router.push(goMessage) },
		submit: function () {
			if (this.studentId == '') alert('학번을 입력해 주세요')
			else if (this.Password == '') alert('비밀번호를 입력해 주세요')
			else {
				let xhr = new XMLHttpRequest()
				xhr.open('POST', '/api/user/login')
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.onreadystatechange = function () {
					result = JSON.parse(xhr.responseText)
					this.studentId = ''
					this.Password = ''
					if (result.hasOwnProperty('success')) {
						if (result['success']) this.$emit('setUser', [result['studentId'], result['name']])
						else alert('이메일 인증이 완료되지 않았습니다.\n킹고 포털 메일함에서 인증 절차를 진행해 주세요.')
						this.$router.push('mainpage')
					}
					else {
						switch (result['code']) {
							case 0:
								alert('학번 또는 비밀번호가 틀렸습니다.')
								break
							case 1:
								alert('회원가입을 하셔야만 이용할 수 있는 서비스입니다.\n회원가입 페이지로 이동합니다.')
								this.$router.push('signup')
								break
							default:
								alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
						}
					}
				}
				xhr.send('{"studentId":"' + this.studentId +
								 '","password":"' + this.Password +
          			 '","_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
			}
		},
  }
}
</script>

<style>
  div .login-box{
    max-width: 70%;
    margin: auto 0;
  }
  div .vertical-center-flex{
    display: flex;
    align-items: center;
  }
  div .middle-box{
    margin-bottom: 20em;
    font-family: 'Roboto', sans-serif;;
  }
  div .row {
    margin: 25px;
  }
  div .align-center{
     margin: 0 auto;
   }
  .btn{
    width: auto;
  }
  .input-group-addon{
    width: 4em;
  }
  .bg-blue{
    background: #0074d6;
    color: #fafafa;
  }
  .bg-white{
    font-size: 1.2em;
    background: #fafafa;
    color: #0074d6;
    transition: 0.2s;
  }
  .bg-white:hover{
    background: #1565c0;
    color: #fafafa;
  }
</style>
