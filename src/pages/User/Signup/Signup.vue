<template>
  <div class="view align-center vertical-center-flex">
    <v-container>
      <h2 class="text-center font-exo">Sign Up</h2>
      <v-layout row>
        <v-container fluid class="pa-2 mb-5">
          <v-card class="elevation-5 SFcontent-box SFalign-center">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="Email"
                  name="E-mail"
                  label="E-mail address"
                  suffix=""
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="studentId"
                  name="student_id"
                  label="Student ID"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="userName"
                  name="user_Name"
                  label="Name"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="Password"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="Verify"
                  name="verify"
                  label="Password Again"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-space-around>
              <v-btn flat @click="submit">Submit</v-btn>
            </v-layout>
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
      Email: '',
      userName: '',
      studentId: '',
      Password: '',
      Verify: '',
    }
  },
  methods: {
    emitSnackbar: function (sendMessage, mode) { this.$emit('snackbar', sendMessage, mode) },
    goPage: function(goMessage) { this.$router.push(goMessage) },
    submit: function () {
      if (this.Email == '') this.emitSnackbar('킹고 이메일 주소를 정확히 입력해 주세요.', 'warning')
      else if (this.userName == '') this.emitSnackbar('이름을 정확히 입력해 주세요.', 'warning')
      else if (this.studentId == '') this.emitSnackbar('학번을 정확히 입력해 주세요.', 'warning')
      else if (this.Password == '') this.emitSnackbar('비밀번호를 입력해 주세요.', 'warning')
      else if (this.Password !== this.Verify) this.emitSnackbar('비밀번호가 틀렸습니다.', 'warning')
      else {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/user/signup')
        xhr.setRequestHeader("Content-type", "application/json")
        
        xhr.onreadystatechange = function () {
          let result = JSON.parse(xhr.responseText)
          if (result.success !== undefined) {
            this.emitSnackbar('회원가입이 완료되었습니다.<br>킹고 포털 메일함에서 인증 절차를 진행해 주세요.', 'success')
            this.Email = ''
            this.studentId = ''
            this.userName = ''
            this.Password = ''
            this.Verify = ''
            this.goPage('mainpage')
          }
          else {
            switch (result.code) {
              case 0:
                this.emitSnackbar('스마트카 트랙 이수 학생이 아닙니다.<br>스마트카 트랙 이수 학생이라면 관리자에게 문의해 주세요.', 'info')
                break
              case 1:
                this.emitSnackbar('해당 학번이 이미 존재합니다.', 'warning')
                break
              case 2:
                this.emitSnackbar('비밀번호가 형식에 맞지 않습니다.', 'error')
                break
              case 3:
                this.emitSnackbar('등록된 이름과 다른 이름을 입력하셨습니다.<br>입력하신 이름을 확인하고 이상이 있으면 관리자에게 문의해 주세요.', 'warning')
                break
              default:
                this.emitSnackbar('알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
            }
          }
        }
        
        /*
        console.log({
          studentId: this.studentId,
          password: this.Password,
          name: this.userName,
          email: this.Email,
          _csrf: document.cookie.split("_csrf=")[1]
        })
        */
        console.log('{'+
          '"studentId":"'+ this.studentId+'",'+
          '"password":"'+ this.Password+'",'+
          '"name":"'+ this.userName+'",'+
          '"email":"'+ this.Email+'",'+
          '"_csrf":"'+ document.cookie.split("_csrf=")[1]+
        '"}')
        xhr.send(
        '{'+
          '"studentId":"'+ this.studentId+'",'+
          '"password":"'+ this.Password+'",'+
          '"name":"'+ this.userName+'",'+
          '"email":"'+ this.Email+'",'+
          '"_csrf":"'+ document.cookie.split("_csrf=")[1]+
        '"}')
        
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
