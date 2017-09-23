<template>
  <div id="admin">
    <v-layout row wrap child-flex>
      <v-card dark primary @click="currentTab = 'reservation'" v-if="currentTab !== 'reservation'" class="elevation-3 blue darken-2"><v-card-text class="subheading pa-2"><center>예약</center></v-card-text></v-card>
      <v-card dark secondary @click="currentTab = 'reservation'" v-if="currentTab === 'reservation'" class="elevation-3 grey darken-3"><v-card-text class="subheading pa-2"><center>예약</center></v-card-text></v-card>
      <v-card dark primary @click="currentTab = 'notice'" v-if="currentTab !== 'notice'" class="elevation-3 blue darken-2"><v-card-text class="subheading pa-2"><center>공지</center></v-card-text></v-card>
      <v-card dark secondary @click="currentTab = 'notice'" v-if="currentTab === 'notice'" class="elevation-3 grey darken-3"><v-card-text class="subheading pa-2"><center>공지</center></v-card-text></v-card>
      <v-card dark primary @click="currentTab = 'troubleshoot'" v-if="currentTab !== 'troubleshoot'" class="elevation-3 blue darken-2"><v-card-text class="subheading pa-2"><center>고장</center></v-card-text></v-card>
      <v-card dark secondary @click="currentTab = 'troubleshoot'" v-if="currentTab === 'troubleshoot'" class="elevation-3 grey darken-3"><v-card-text class="subheading pa-2"><center>고장</center></v-card-text></v-card>
      <v-card dark primary @click="currentTab = 'usermanage'" v-if="currentTab !== 'usermanage'" class="elevation-3 blue darken-2"><v-card-text class="subheading pa-2"><center>사용자</center></v-card-text></v-card>
      <v-card dark secondary @click="currentTab = 'usermanage'" v-if="currentTab === 'usermanage'" class="elevation-3 grey darken-3"><v-card-text class="subheading pa-2"><center>사용자</center></v-card-text></v-card>
      <v-card dark primary @click="currentTab = 'debugapi'" v-if="currentTab !== 'debugapi'" class="elevation-3 blue darken-2"><v-card-text class="subheading pa-2"><center>서버관리</center></v-card-text></v-card>
      <v-card dark secondary @click="currentTab = 'debugapi'" v-if="currentTab === 'debugapi'" class="elevation-3 grey darken-3"><v-card-text class="subheading pa-2"><center>서버관리</center></v-card-text></v-card>
    </v-layout>
    <transition-group name="fade" tag="p">
      <reservation v-show="currentTab === 'reservation'" @snackbar="Snackbar" :key="0"></reservation>
      <notice v-show="currentTab === 'notice'" @snackbar="Snackbar" :key="1"></notice>
      <troubleshoot v-show="currentTab === 'troubleshoot'" @snackbar="Snackbar" :key="2"></troubleshoot>
      <usermanage v-show="currentTab === 'usermanage'" @snackbar="Snackbar" :key="3"></usermanage>
      <debugapi v-show="currentTab === 'debugapi'" @snackbar="Snackbar" :key="4"></debugapi>
    </transition-group>
  </div>
</template>

<script>
import Reservation from './Reservation'
import Notice from './Notice'
import Troubleshoot from './Troubleshoot'
import UserManage from './UserManage'
import DebugAPI from './DebugAPI'

export default {
  name: 'admin',
  props: {
    user: {
      type: Array,
      required: true
    }
  },
  components: {
    'reservation': Reservation,
    'notice': Notice,
    'troubleshoot': Troubleshoot,
    'usermanage': UserManage,
    'debugapi': DebugAPI,
  },
  beforeCreate () {
    /*
    if (this.user[0] !== 'admin') {
      this.$router.push('mainpage')
      this.$emit('snackbar', '관리자가 아니면 접속할 수 없는 페이지입니다.', 'error')
    }
    */
  },
  data() {
    return {
      currentTab: 'reservation',
    }
  },
  methods: {
    Snackbar: function (msg, mode) { this.$emit('snackbar', msg, mode) }
  }
}
</script>

<style scoped>
</style>