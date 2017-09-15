<template>
	<div class="view align-center vertical-center-flex">
    <v-container class="SFcontent-boxM">
      <h2 class="text-center font-exo">Sign In</h2>
      <v-layout row>
        <v-container fluid class="mb-5">
          <v-card class="elevation-5 SFcontent-box SFalign-center">
            <v-layout row>
              <v-flex lg12 xs12>
                <v-text-field
                  v-model="studentId"
                  name="id"
                  label="Student ID"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex lg12 xs12>
                <v-text-field
                  v-model="Password"
                  name="pw"
                  label="Password"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-space-around>
              <v-btn flat @click="submit">
                Log In
              </v-btn>
              <v-btn flat @click="goPage('signup')">
                Sign up
              </v-btn>
              <v-btn icon class="hidden-xs-only" flat @click.native="snackbar = true"> <!--go.page(lost)로 수정-->
                <v-icon>account_circle</v-icon>
              </v-btn>
            </v-layout>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
	</div>
</template>

<script>
export default {
  name: 'login',
	data () {
		return {
		  msg:'',
      snackbar: false,
      timeout: 5000,
      mode: '',
      signup: false,
			studentId: '',
			Password: ''
		}
	},
  methods: {
		goPage: function (goMessage) { this.$router.push(goMessage) },
		submit: function () {
			if (this.studentId == '') this.$emit('snackbar', '학번을 입력해주세요.','error')
			else if (this.Password == '') this.$emit('snackbar', '비밀번호를 입력해 주세요', 'error')
			else {
				let xhr = new XMLHttpRequest()
				xhr.open('POST', '/api/user/login')
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.onreadystatechange = function () {
					result = JSON.parse(xhr.responseText)
					this.studentId = ''
					this.Password = ''
					if (result.success === undefined) {
						if (result.success) {
              this.$emit('setUser', [result['student;;Id'], result['name']])
						  this.$router.push('mainpage')
            }
						else this.$emit('snackbar', '이메일 인증이 완료되지 않았습니다.<br>킹고 포털 메일함에서 인증 절차를 진행해 주세요.', 'error')
					}
					else {
						switch (result.code) {
							case 0:
                this.$emit('snackbar', '학번 또는 비밀번호가 틀렸습니다.', 'error')
								break
							case 1:
                this.$emit('snackbar', '회원가입을 하셔야만 이용할 수 있는 서비스입니다.', 'error')
								break
							default:
                this.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
						}
					}
				}
				xhr.send('{'+
          '"studentId": "'+this.studentId+'",'+
					'"password": "'+this.Password+'",'+
          '"_csrf": "'+document.cookie.split("_csrf=")[1]+
        '"}')
			}
		},
  }
}
</script>

<style scoped>

</style>
