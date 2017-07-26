<template>
  <div class="signup">
		<p>This is Signup page</p>
    Email 주소: <input type="text" v-model="Email">@skku.edu<br>
    사용자 이름: <input type="text" v-model="userName"><br>
    사용자 학번: <input type="text" v-model="studentId"><br>
    Password: <input type="password" v-model="Password"><br>
    Verify: <input type="password" v-model="Verify"><br>

    <button @click="submit">제출</button>
    <button @click="cancel">취소</button>
	</div>
</template>

<script>
export default {
  name: 'signup',
  data: function () {
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
      if (this.Password !== this.Verify) alert('비밀번호가 일치하지 않습니다.')
      else {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/user/signup')
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send('{"studentId":"' + this.studentId +
          '","password":"' + this.Password +
          '","name":"' + this.userName +
          '","email":"' + this.Email + '@skku.edu"}')
        /*
        // JSON POST 요청 전송은 확인되었지만, 실제로 작동하는지는 모름
        console.log(xhr.status)
        switch (xhr.responseText) {
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
        }
        */
      }
    },
    cancel: function () {
      this.Email = ''
      this.studentId = ''
      this.userName = ''
      this.Password = ''
      this.Verify = ''
      this.encodedPassword = ''
      this.$emit('change', 'mainpage')
    }
  }
}
</script>

<style>

</style>
