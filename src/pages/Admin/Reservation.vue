<template>
  <div class="view container reservation">
    <v-container class="SFwide">
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="pa-2 ">
            <v-flex md3>
              <v-menu lazy :close-on-content-click="true" v-model="menu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                <v-text-field slot="activator" label="Select Date" v-model="focus" readonly>
                  <v-btn>
                    <v-icon>refresh</v-icon>
                  </v-btn>
                </v-text-field>
                <v-date-picker v-model="focus" :date-format="date => new Date(date).toJSON().slice(0,10).replace(/-/g, '')" :formatted-value.sync="date" no-title scrollable actions></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex md12>
              <v-data-table
              :headers="headers"
              :items="TableList" class="elevation-1"
              hide-actions
              dark>
                <template slot="items" scope="props">
                  <td class="pa-2 text-center" style="vertical-align: middle;">{{ props.item.time }}</td>
                  <td v-for="(c, i) in (headers.length-1)" :key="i" class="pa-2 text-center" style="vertical-align: middle;" :class="props.item.styl[i]" @click.stop="clickEvent(props.item.idx, i)">{{ props.item.user[i].name }}<br>{{ (props.item.user[i].name === "") ? "" : props.item.user[i].id }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog">
      <v-card>
        <v-layout>
          <v-flex><v-card-text>이름</v-card-text></v-flex>
          <v-flex><v-card-text>{{ dialogData.name }}</v-card-text></v-flex>
        </v-layout>
        <v-layout>
          <v-flex><v-card-text>학번</v-card-text></v-flex>
          <v-flex><v-card-text>{{ dialogData.id }}</v-card-text></v-flex>
        </v-layout>
        <!--
        <v-layout>
          <v-flex><v-card-text></v-card-text></v-flex>
          <v-flex><v-card-text></v-card-text></v-flex>
        </v-layout>
        -->
        <v-layout>
        <v-flex><v-card-text class="text-center">{{ dialogData.start.text }} ~ {{ dialogData.end.text }}</v-card-text></v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn class="red darken-1" @click.native="deleteReserve()">삭제</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.native="dialog = false">취소</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'reservation',
  data() {
    return {
      focus: null,
      date: null,
      menu: null,
      headers: [],
      TableList: [
        { time: "00:00", user: [], styl: [], idx: 0 }, { time: "00:30", user: [], styl: [], idx: 1 },
        { time: "01:00", user: [], styl: [], idx: 2 }, { time: "01:30", user: [], styl: [], idx: 3 },
        { time: "02:00", user: [], styl: [], idx: 4 }, { time: "02:30", user: [], styl: [], idx: 5 },
        { time: "03:00", user: [], styl: [], idx: 6 }, { time: "03:30", user: [], styl: [], idx: 7 },
        { time: "04:00", user: [], styl: [], idx: 8 }, { time: "04:30", user: [], styl: [], idx: 9 },
        { time: "05:00", user: [], styl: [], idx: 10 }, { time: "05:30", user: [], styl: [], idx: 11 },
        { time: "06:00", user: [], styl: [], idx: 12 }, { time: "06:30", user: [], styl: [], idx: 13 },
        { time: "07:00", user: [], styl: [], idx: 14 }, { time: "07:30", user: [], styl: [], idx: 15 },
        { time: "08:00", user: [], styl: [], idx: 16 }, { time: "08:30", user: [], styl: [], idx: 17 },
        { time: "09:00", user: [], styl: [], idx: 18 }, { time: "09:30", user: [], styl: [], idx: 19 },
        { time: "10:00", user: [], styl: [], idx: 20 }, { time: "10:30", user: [], styl: [], idx: 21 },
        { time: "11:00", user: [], styl: [], idx: 22 }, { time: "11:30", user: [], styl: [], idx: 23 },
        { time: "12:00", user: [], styl: [], idx: 24 }, { time: "12:30", user: [], styl: [], idx: 25 },
        { time: "13:00", user: [], styl: [], idx: 26 }, { time: "13:30", user: [], styl: [], idx: 27 },
        { time: "14:00", user: [], styl: [], idx: 28 }, { time: "14:30", user: [], styl: [], idx: 29 },
        { time: "15:00", user: [], styl: [], idx: 30 }, { time: "15:30", user: [], styl: [], idx: 31 },
        { time: "16:00", user: [], styl: [], idx: 32 }, { time: "16:30", user: [], styl: [], idx: 33 },
        { time: "17:00", user: [], styl: [], idx: 34 }, { time: "17:30", user: [], styl: [], idx: 35 },
        { time: "18:00", user: [], styl: [], idx: 36 }, { time: "18:30", user: [], styl: [], idx: 37 },
        { time: "19:00", user: [], styl: [], idx: 38 }, { time: "19:30", user: [], styl: [], idx: 39 },
        { time: "20:00", user: [], styl: [], idx: 40 }, { time: "20:30", user: [], styl: [], idx: 41 },
        { time: "21:00", user: [], styl: [], idx: 42 }, { time: "21:30", user: [], styl: [], idx: 43 },
        { time: "22:00", user: [], styl: [], idx: 44 }, { time: "22:30", user: [], styl: [], idx: 45 },
        { time: "23:00", user: [], styl: [], idx: 46 }, { time: "23:30", user: [], styl: [], idx: 47 }
      ],
      retData: null,
      userData: {},
      dialog: false,
      dialogData: {
        _id: null,
        name: "",
        id: null,
        start: { text: "", value: null },
        end: { text: "", value: null }
      },
    }
  },
  created () {
    this.focus = new Date().toJSON().slice(0,10)
    this.date = this.focus.replace(/-/g, '')
    this.retTimeTableList()
    setInterval(this.retTimeTableList, 60000)
  },
  methods: {
    retTimeTableList: function () {
      let xhr = new XMLHttpRequest(), self = this
      this.headers = [{ text: 'Time', align: 'center', sortable: false }]
      xhr.open('GET', '/api/admin/timetable/' + this.date)
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          self.retData = null
          if (result.hasOwnProperty('data')) {
            console.log(xhr.responseText)
            self.retData = result
            let count = 0
            for (let item in result.data) {
              self.headers.push({ text: item, align: 'center', sortable: false })
              for (let time in [...Array(48).keys()]) {
                self.TableList[time].user.push({ name: '', id: 0 })
                self.TableList[time].styl.push({'text-center': true})
              }
              for (let resv of result.data[item]) {
                for (let time = parseInt(resv['start'].toString().slice(8,10)); time < parseInt(resv['end'].toString().slice(8,10)); time++) {
                  self.TableList[time].user[count].name = resv.user.name
                  self.TableList[time].user[count].id = resv.user.student_id
                  self.TableList[time].styl[count]['red lighten-3'] = true
                  self.userData[resv.user.student_id] = resv.user._id
                }
              }
              count++
            }
          } else self.$emit('snackbar', 'DB 조회 실패. 서버 관리자에게 문의바람.', 'error')
        }
      }
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1]}))
    },
    clickEvent: function (time, item) {
      this.dialog = true
      this.dialogData.name = this.TableList[time].user[item].name
      this.dialogData.id = this.TableList[time].user[item].id
      this.dialogData._id = this.userData[this.TableList[time].user[item].id]
    },
    deleteReserve: function () {

    } 
  },
}
</script>

<style scoped>

</style>
