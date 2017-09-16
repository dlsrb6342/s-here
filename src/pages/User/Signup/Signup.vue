<template>
  <div class="view align-center vertical-center-flex">
    <v-container>
      <h2 class="text-center font-exo">Sign Up</h2>
      <v-layout row>
        <v-container fluid class="pa-2 mb-5">
          <v-card class="elevation-5 SFcontent-box SFalign-center">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="E-mail address"
                    v-model="Email"
                    :rules="[v => !!v || '이메일을 입력해 주세요.', v => v && v.split('@').length == 2 && (v.split('.').length == 2 || v.split('.').length == 3) || '잘못된 이메일입니다.']"
                    required
                    autofocus
                    validate-on-blur="true"
                    suffix=""
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Student ID"
                    v-model="studentId"
                    :rules="[v => !!v || '학번을 입력해 주세요.', v => v && v.replace(/\D/g,'').length == 10 && v.length == 10 || '학번은 숫자 10자 입니다']"
                    :counter="10"
                    required
                    validate-on-blur="true"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Name"
                    v-model="userName"
                    :rules="[v => !!v || '이름을 입력해 주세요.']"
                    required
                    validate-on-blur="true"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Enter your Password"
                    v-model="Password"
                    :rules="[v => !!v || '비밀번호를 입력해 주세요.', v => v && v.length >= 9 || '비밀번호는 최소 9자 입니다.']"
                    min="9"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    validate-on-blur="true"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              {{ this.password }}
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="Verify"
                    label="Verify your Password"
                    :rules="pwdRules"
                    min="9"
                    :type="password"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row justify-space-around>
                <v-btn flat @click="submit">Submit</v-btn>
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
  name: 'signup',
  data () {
    return {
      valid: false,
      e1: true,
      pwdRules: [v => !!v || '비밀번호를 다시 입력해 주세요.', v => v && this.Password == v || '비밀번호가 일치하지 않습니다.'],
      Email: '',
      userName: '',
      studentId: '',
      Password: '',
      Verify: '',
    }
  },
  methods: {
    goPage: function(goMessage) { this.$router.push(goMessage) },
    submit: function () {
      if (this.$refs.form.validate()) {
        let xhr = new XMLHttpRequest(), self = this
        xhr.open('POST', '/api/user/signup')
        xhr.setRequestHeader("Content-type", "application/json")
        
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            let result = JSON.parse(xhr.responseText)
            if (result.success !== undefined) {
              self.$emit('snackbar', '회원가입이 완료되었습니다.<br>킹고 포털 메일함에서 인증 절차를 진행해 주세요.', 'success')
              self.Email = ''
              self.studentId = ''
              self.userName = ''
              self.Password = ''
              self.Verify = ''
              self.goPage('mainpage')
            }
            else {
              switch (result.code) {
                case 0:
                  self.$emit('snackbar', '스마트카 트랙 이수 학생이 아닙니다.<br>스마트카 트랙 이수 학생이라면 관리자에게 문의해 주세요.', 'info')
                  break
                case 1:
                  self.$emit('snackbar', '해당 학번이 이미 존재합니다.', 'warning')
                  break
                case 2:
                  self.$emit('snackbar', '비밀번호가 형식에 맞지 않습니다.', 'error')
                  break
                case 3:
                  self.$emit('snackbar', '등록된 이름과 다른 이름을 입력하셨습니다.<br>입력하신 이름을 확인하고 이상이 있으면 관리자에게 문의해 주세요.', 'warning')
                  break
                default:
                  self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
              }
            }
          }
        }
        xhr.send(JSON.stringify({ studentId: this.studentId, password: this.Password, name: this.userName, email: this.Email, _csrf: document.cookie.split("_csrf=")[1] }))
        
      }
    },
    cancel: function () {
      this.Email = ''
      this.studentId = ''
      this.userName = ''
      this.Password = ''
      this.Verify = ''
      this.$emit('change', 'mainpage')
    },
  }
}
</script>

<style scoped>
  div.signup{
    height: 100%;
    max-width: 70%;
    margin: 0 auto;
  }
  div.middle-box{
    margin-bottom: 20em;
    font-family: 'Roboto', sans-serif;;
    text-align: center;
  }
  div.signup-box{
    max-width: 80%;
  }
  div .vertical-center-flex{
    display: flex;
    align-items: center;
  }
  label, .signup-head{
    color: #203050;
  }
  .bg-white{
    font-size: 1.2em;
    background: #fafafa;
    color: #0074d6;
    transition: 0.2s;
  }
  .bg-white:hover{
    background: #1565c0 !important;
    color: #fafafa;
  }

</style>
