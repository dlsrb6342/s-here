<template>
  <div class="view container reservation">
    <v-container class="SFwide">
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="pa-2 ">
            <v-flex md3>
              <v-menu lazy :close-on-content-click="true" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                <v-text-field slot="activator" label="Select Date" v-model="focus" readonly></v-text-field>
                <v-date-picker v-model="focus" no-title scrollable actions></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex md12 class="">
              <v-data-table v-bind:headers="headers" :items="TableList" class="">
                <template slot="TableList" scope="props">
                  <td>{{ props.item.time }}</td>
                  <td v-for="i in 7" :key="i" v-bind:class="{ red: props.item.reservation[i-1]==1 }" class="lighten-3 text-right">{{ props.item.name[i-1] }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex md12 class="mt-3">
          <v-card>
            <v-card-title>
              <h6>Currnet Notice</h6>
            </v-card-title>
            <v-card-text v-model="notice"></v-card-text>
            <hr>
            <v-layout row>
              <v-flex md8 class="pl-4">
                <v-text-field v-model="msg" name="notice" label="Edit notice"></v-text-field>
              </v-flex>
              <v-flex md2 class="pt-2">
                <v-btn flat @click.native="setNotice()">submit</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'reservation',
  props: ['user'],
  data() {
    return {
      focus: null,
      menu: null,
      notice: 'Current Notice', /* 현재 notice 내용 */
      msg: '', /* 수정될 notice 내용 */
      headers: [ /* time table header 양식 */
        { text: 'Time', align: 'left', sortable: false },
        { text: 'Print1', sortable: false },
        { text: 'Print2', sortable: false },
        { text: 'Print3', sortable: false },
        { text: 'Print4', sortable: false },
        { text: 'Print5', sortable: false },
        { text: 'Table1', sortable: false },
        { text: 'Table2', sortable: false }
      ],
      /*
      time table data 양식
      time: 예약 시간 (hh:mm)
      name: 예약자 이름 (없을 시 공백)
      ID: 학번(보류)
      reservation: 각 예약마다 style 적용(?)
      */
      TableList: [
        /*
        { time: '09:00', name: ['예약1', '', '', '', '', '예약2', ''], ID: [], reservation: [1, 0, 0, 0, 0, 1, 0] },
        { time: '09:30', name: ['예약1', '예약3', '', '', '', '', ''], ID: [], reservation: [1, 1, 0, 0, 0, 0, 0] },
        { time: '10:00', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 0, 1, 0, 0, 0] },
        { time: '10:30', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 1, 0, 1, 0, 1] },
        { time: '11:00', name: ['', '', '', '', '', '', ''], ID: [], reservation: [1, 0, 1, 1, 0, 0, 1] },
        { time: '11:30', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 1, 0, 0, 0, 1] },
        { time: '12:00', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 1, 0, 0, 0, 0, 1] },
        { time: '12:30', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 1, 1, 0, 0, 1] },
        { time: '13:00', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 1, 0, 0, 0, 0] },
        { time: '13:30', name: ['', '', '', '', '', '', ''], ID: [], reservation: [1, 0, 1, 1, 0, 0, 0] },
        { time: '14:00', name: ['', '', '', '', '', '', ''], ID: [], reservation: [0, 0, 0, 0, 1, 0, 1] },
        */
      ],
      itemData: [],
      retData: [],
      gotData: [false, false],
    }
  },
  created () {
    /*
    if (user[0] !== 'admin') {
      this.$emit('snackbar', '관리자가 아니면 접속할 수 없는 페이지입니다.', 'error')
      this.$router.push('mainpage')
    }
    */
    //setInterval(this.retTimeTableList, 30000)
  },
  watch: {
    gotData: function (val) {
      if (val[0] && val[1]) { // All retrieve is done. make table!
        this.TableList = []
        for (let i in [...Array(48).keys()]) {
          this.TableList.push({
            time: parseInt(i / 2) + (i % 2 == 1 ? ':30' : ':00'),
            name: [],
            reservation: [],
          })
        }
        for (let item of this.retData) {
          // user, item, start, end, people
        }
        // All done.
        this.gotData = [false, false]
      }
    }
  },
  methods: {
    retTimeTableList: function () {
      // xhr: reservation list retriever, xhr2: item id retriever
      let xhr = new XMLHttpRequest(), xhr2 = new XMLHttpRequest(), self = this
			xhr.open('GET', '/api/admin/timetable/' + new Date().toJSON().slice(0,10).replace(/-/g,''))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) {
            self.retData = result.data
            self.gotData[0] = true
          } else {
            self.retData = []
            self.$emit('snackbar', 'DB 조회 실패. 서버 관리자에게 문의바람.', 'error')
          }
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1]}))
      // [{"name":"프린터1","_id":"598959115abbb30381c2f3d5","occupied":[]}] << 이렇게 올거임
      xhr2.open('GET', '/api/item/' + new Date().toJSON().slice(0,10).replace(/-/g,''))
			xhr2.setRequestHeader("Content-type", "application/json")
			xhr2.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          this.headers = []
          if (JSON.parse(xhr2.responseText).hasOwnProperty('data')) {
            for (let data of JSON.parse(xhr2.responseText).data) {
              self.header.push({ text: data.name, sortable: false })
              self.itemData.push(data)
            }
            self.gotData[1] = true
          }
          else self.$emit('snackbar', '조회에 실패하였습니다.', 'warning')
        }
      }
      xhr2.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1]}))
    },
    getNotice: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('GET', '/api/admin/notice') 
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          self.notice = result.hasOwnProperty('data') ? result.data : '공지사항 조회에 실패하였습니다.'
        }
			}
			xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1] }))
    },
    setNotice: function () {
      let xhr = new XMLHttpRequest(), self = this
			xhr.open('notice', '/api/admin/notice') 
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() { if (xhr.readyState === XMLHttpRequest.DONE) self.getNotice() }
			xhr.send(JSON.stringify({ content: this.msg , _csrf: document.cookie.split("_csrf=")[1] }))
    }
  },
}
</script>

<style scoped>

</style>
