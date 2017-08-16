<template>
  <div class="view signup vertical-center-flex">
    <div class="container middle-box signup-box">
      <h2 class="signup-head">SMART CAR FACTORY</h2>
      <hr>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              v-model="Email"
              name="E-mail"
              label="E-mail address"
              suffix="@skku.edu"
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
      </v-container>
      <div class="row justify-content-center">
        <button class="btn bg-white" @click="submit">Submit</button>
      </div>
    </div>
		<!--<p>This is Signup page</p>
    Email 주소: <input type="text" v-model="Email">@skku.edu<br>
    사용자 이름: <input type="text" v-model="userName"><br>
    사용자 학번: <input type="text" v-model="studentId"><br>
    Password: <input type="password" v-model="Password"><br>
    Verify: <input type="password" v-model="Verify"><br>
    <button @click="submit">제출</button>
    <button @click="cancel">취소</button>-->
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
    submit: function () {
      if (this.Email == '') alert('킹고 포털 이메일 주소를 입력해 주세요.')
      else if (this.userName == '') alert('이름을 정확히 입력해 주세요.')
      else if (this.studentId == '') alert('학번을 정확히 입력해 주세요.')
      else if (this.Password == '') alert('비밀번호를 입력해 주세요.')
      else if (this.Password !== this.Verify) {
        alert('비밀번호가 일치하지 않습니다.')
        this.Verify = ''
      }
      else {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          let result = JSON.parse(xhr.response)
          if (result.hasOwnProperty('success')) {
            alert('회원가입이 완료되었습니다.\n킹고 포털 메일함에서 인증 절차를 진행해 주세요.')
            this.Email = ''
            this.studentId = ''
            this.userName = ''
            this.Password = ''
            this.Verify = ''
            this.$emit('change', 'mainpage')
          }
          else {
            switch (result.code) {
              case 0:
                alert('스마트카 트랙 이수 학생이 아닙니다.\n스마트카 트랙 이수 학생이라면 관리자에게 문의해 주세요.')
                break
              case 1:
                alert('해당 학번이 존재합니다.')
                break
              case 2:
                alert('비밀번호가 형식에 맞지 않습니다.')
                break
              case 3:
                alert('등록된 이름과 다른 이름을 입력하셨습니다.\n입력 내용을 확인하시고 이상이 없다면 관리자에게 문의해 주세요.')
                break
              default:
                alert('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.')
            }
          }
        }
        xhr.open('POST', '/api/user/signup')
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send('{"studentId": "' + this.studentId +
          '","password": "' + this.Password +
          '","name": "' + this.userName +
          '","email": "' + this.Email +
          '","_csrf": "' + document.cookie.split("_csrf=")[1] + '"}')
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
