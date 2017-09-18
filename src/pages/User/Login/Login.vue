<template>
	<div class="view align-center vertical-center-flex">
    <v-container class="SFcontent-boxM">
      <h2 class="text-center font-exo">Sign In</h2>
      <v-layout row>
        <v-container fluid class="mb-5">
          <v-card class="elevation-5 SFcontent-box SFalign-center">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-layout row>
                <v-flex lg12 xs12>
                  <v-text-field
                    label="Student ID"
                    v-model="studentId"
                    :rules="[v => !!v || '학번을 입력해 주세요.']"
                    :counter="10"
                    required
                    name="id"
                  ></v-text-field>
                  <!--
                    , v => v && v.replace(/\D/g,'').length == 10 && v.length == 10 || '학번은 숫자 10자 입니다']"
                  -->
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex lg12 xs12>
                  <v-text-field
                    label="Password"
                    v-model="Password"
                    :rules="[v => !!v || '비밀번호를 입력해 주세요.', v => v && v.length >= 9 || '비밀번호는 최소 9자 입니다.']"
                    name="pw"
                    min="9"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
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
                <v-btn icon class="hidden-xs-only" flat @click.native="lostPW()" v-tooltip:top="{ html: '비밀번호를 잊으셨나요?' }"  > <!--go.page(lost)로 수정-->
                  <v-icon>account_circle</v-icon>
                </v-btn>
              </v-layout>
            </v-form>
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
      valid: false,
      signup: false,
      e1: true,
      studentId: '',
      Password: '',
		}
	},
  methods: {
    goPage: function (goMessage) { this.$router.push(goMessage) },
    lostPW: function () { this.$emit('snackbar', '관리자에게 문의해 주세요.', 'info') },
		submit: function () {
      if (this.$refs.form.validate()) {
				let xhr = new XMLHttpRequest(), self = this
				xhr.open('POST', '/api/user/login')
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            let result = JSON.parse(xhr.responseText)
            self.studentId = ''
            self.Password = ''
            if (result.hasOwnProperty('success')) {
              if (result.success) {
                self.$emit('setUser', [result.studentId, result.name])
                self.$router.push('mainpage')
              }
              else self.$emit('snackbar', '이메일 인증이 완료되지 않았습니다.<br>킹고 포털 메일함에서 인증 절차를 진행해 주세요.', 'error')
            }
            else {
              switch (result.code) {
                case 0:
                  self.$emit('snackbar', '학번 또는 비밀번호가 틀렸습니다.', 'error')
                  break
                case 1:
                  self.$emit('snackbar', '회원가입을 하셔야만 이용할 수 있는 서비스입니다.', 'error')
                  break
                default:
                  self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
              }
            }
          }
        }
        xhr.send(JSON.stringify({
          studentId: this.studentId,
          password: this.Password,
          _csrf: document.cookie.split("_csrf")[1]
        }))
			}
		},
  }
}
</script>

<style scoped>

</style>
