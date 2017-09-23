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
                  <td v-for="i in headers.length" :key="i" v-bind:class="{ red: props.item.reservation[i-1]==1 }" class="lighten-3 text-right">{{ props.item.name[i-1] }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'reservation',
  data() {
    return {
      focus: null,
      menu: null,
      headers: [
        // { text: 'Time', align: 'left', sortable: false },
      ],
      TableList: [
        /*
        time table data 양식
        time: 예약 시간 (hh:mm)
        name: 예약자 이름 (없을 시 공백)
        ID: 학번(보류)
        reservation: 각 예약마다 style 적용(?)
        */
      ],
      itemData: [],
      retData: [],
      gotData: [false, false],
    }
  },
  created () {
    //setInterval(this.retTimeTableList, 30000)
  },
  watch: {
    gotData: function (val) {
      if (val[0] && val[1]) { // All retrieve is done. make table!
      // TODO: rework this function
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
      let xhr = new XMLHttpRequest(), self = this
      xhr.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1]}))
      xhr.open('GET', '/api/admin/timetable/' + new Date().toJSON().slice(0,10).replace(/-/g,''))
			xhr.setRequestHeader("Content-type", "application/json")
			xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText)
          if (result.hasOwnProperty('success')) {
            for (let item in result.data) {
              // TODO: Fill this code.
            }
            self.gotData[1] = true
          } else {
            self.retData = []
            self.$emit('snackbar', 'DB 조회 실패. 서버 관리자에게 문의바람.', 'error')
          }
        }
      }
      xhr2.send(JSON.stringify({ _csrf: document.cookie.split("_csrf=")[1]}))
    },
  },
}
</script>

<style scoped>

</style>
