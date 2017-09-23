<template>
  <div id="notice">
    <v-container class="SFwide">
      <v-flex md12 class="mt-3" >
        <v-card>
          <v-card-title>
            <h6>Currnet Notice</h6>
          </v-card-title>
          <v-card-text v-model="notice">{{ notice }}</v-card-text>
          <hr>
          <v-layout row>
            <v-flex md10 class="pl-4">
              <v-text-field v-model="msg" label="Edit notice"></v-text-field>
            </v-flex>
            <v-flex md2 class="pt-2">
              <v-btn dark secondary @click.native="setNotice()">submit</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      notice: 'Current Notice', /* 현재 notice 내용 */
      msg: '', /* 수정될 notice 내용 */
    }
  },
  created () { this.getNotice() },
  methods: {
    getNotice: function () {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open('GET', '/api/notice')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('data')) self.notice = result.data
          else self.$emit('snackbar', '공지사항 조회 실패. 서버 관리자에게 문의바람.', 'error')
        }
			}
			xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    },
    setNotice: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('POST', '/api/admin/notice') 
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) self.getNotice()
        else self.$emit('snackbar', '공지사항 수정 실패. 서버 관리자에게 문의바람.', 'error')
      }
			xhr.send(JSON.stringify({ content: this.msg, _csrf: document.cookie.split("_csrf=")[1] }))
    }
  }
}
</script>

<style scoped>

</style>