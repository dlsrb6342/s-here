<template>
	<div class="view login">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>사용자 학번</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                name="input_ID"
                label="학번"
                id="input_id"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <p>This is Login</p>
		사용자 학번: <input type="text" v-model="studentId"><br>
		Password: <input type="password" v-model="Password"><br>
		<a class="btn"  @click="submit">로그인</a>
    <a class="btn"  @click="goPage('signup')">회원가입</a>
		<br>
		<a class="btn" @click="goPage('lostpw')">비밀번호를 잊으셨나요?</a>
	</div>
</template>

<script>
import VTextField from "vuetify/src/components/text-fields/VTextField";

export default {
  components: {VTextField},
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

</style>
