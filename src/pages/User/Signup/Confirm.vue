<template>
  <div class="view user">
    <p></p>
  </div>
</template>

<script>
export default {
  name: 'user',
  created() {
    let xhr = new XMLHttpRequest(), self = this
    xhr.open('POST', '/api/user/confirm')
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let result = JSON.parse(xhr.responseText)
        if (result.hasOwnProperty('success')) {
          self.$emit('snackbar', '메일 인증이 완료되었습니다!', 'success')
          self.$router.push('mainpage')
        }
        else if (result.code === 0) self.$emit('snackbar', '잘못된 토큰입니다.', 'error')
        else self.$emit('snackbar', '알 수 없는 오류입니다.<br>관리자에게 문의해 주세요.', 'info')
      }
    }
    xhr.send(JSON.stringify({ token: this.$route.query.token, _csrf: document.cookie.split("_csrf=")[1] }))
  }
}
</script>

<style>

</style>
