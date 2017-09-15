<template>
  <div class="view user">
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'user',
  created() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/user/confirm')
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = function() {
      let result = JSON.parse(xhr.responseText)
      if (result.success !== undefined) {
        this.$emit('snackbar', '메일 인증이 완료되었습니다!', 'success')
        this.$router.push('mainpage')
      } else {
        switch (result.code) {
          case 0:
            this.$emit('snackbar', '잘못된 토큰입니다.', 'error')
            break
          default:
            this.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
        }
      }
    }
    console.log(this.token)
    console.log(document.cookie.split("_csrf=")[1])
    xhr.send(
        '{'+
          '"token":"'+ this.$route.query.token+'",'+
          '"_csrf":"'+ document.cookie.split("_csrf=")[1]+
        '"}') 
  }
}
</script>

<style>

</style>
