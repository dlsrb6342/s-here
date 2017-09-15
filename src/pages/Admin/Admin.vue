<template>
  <div class="view container admin">
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
            <v-card-text v-model="notice">{{ notice }}</v-card-text>
            <hr>
            <v-layout row>
              <v-flex md8 class="pl-4">
                <v-text-field v-model="msg" name="notice" label="Edit notice"></v-text-field>
              </v-flex>
              <v-flex md2 class="pt-2">
                <v-btn flat @click.native="notice = msg">submit</v-btn>
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
  name: 'admin',
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
      reservation: item 예약 여부 (0~4: print1~5, 5~6: table1~2
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
      retData: []
    }
  },
  created () {
    setInterval(this.refreshTable, 30000)
  },
  methods: {
    refreshTable: function () {
      this.retTimeTableList()
      for (let i in [...Array(48).keys()]) {
        let nameArray = []
        for (let j in [...Array()])
        this.TableList.push({
          time: Math.floor(i / 2) + (i % 2 == 1 ? ':30' : ':00'),
          name: [],
        })
      }
      for (let item of this.retData) {
        // user, item, start, end, people
      }
    },
    retTimeTableList: function () {
      // xhr: reservation list retriever, xhr2: item id retriever
      let xhr = new XMLHttpRequest(), xhr2 = new XMLHttpRequest()
			xhr.open('GET', '/api/reserve/')
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
				console.log(xhr.responseText)
				let result = JSON.parse(xhr.responseText)
				if (result.success !== undefined) {
					this.retData = result.data
				} else {
					this.retData = []
					this.$emit('snackbar', 'DB 조회 실패. 서버 관리자에게 문의바람.', 'error')
        }
        
      }
      xhr2.open('GET', '/api/item/' + new Date().toJSON().slice(0,10).replace(/-/g,''))
			xhr2.setRequestHeader("Content-type", "application/json")
			xhr2.onreadystatechange = function() {
				console.log(xhr.responseText)
        this.headers = []
				if (JSON.parse(xhr2.responseText).data !== undefined) {
          for (let data of JSON.parse(xhr2.responseText).data) {
            this.header.push({ text: data.name, sortable: false })
            this.itemData.push(data)
          }
        }
				else this.$emit('snackbar', '조회에 실패하였습니다.', 'warning')
			}
			xhr.send('{ "_csrf": "'+document.cookie.split("_csrf=")[1]+'" }')
			xhr2.send('{ "_csrf": "'+document.cookie.split("_csrf=")[1]+'" }')
    },
  },
}
</script>

<style scoped>

</style>
