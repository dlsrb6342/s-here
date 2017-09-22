<template>
  <div id="admin">
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn dark primary @click.native="currentTab = 'reservation'" v-if="currentTab !== 'reservation'">예약</v-btn>
      <v-btn dark secondary @click.native="currentTab = 'reservation'" v-if="currentTab === 'reservation'">예약</v-btn>
      <v-spacer></v-spacer>
      <v-btn dark primary @click.native="currentTab = 'notice'" v-if="currentTab !== 'notice'">공지</v-btn>
      <v-btn dark secondary @click.native="currentTab = 'notice'" v-if="currentTab === 'notice'">공지</v-btn>
      <v-spacer></v-spacer>
      <v-btn dark primary @click.native="currentTab = 'troubleshoot'" v-if="currentTab !== 'troubleshoot'">고장</v-btn>
      <v-btn dark secondary @click.native="currentTab = 'troubleshoot'" v-if="currentTab === 'troubleshoot'">고장</v-btn>
      <v-spacer></v-spacer>
      <v-btn dark primary @click.native="currentTab = 'usermanage'" v-if="currentTab !== 'usermanage'">사용자</v-btn>
      <v-btn dark secondary @click.native="currentTab = 'usermanage'" v-if="currentTab === 'usermanage'">사용자</v-btn>
      <v-spacer></v-spacer>
      <v-btn dark primary @click.native="currentTab = 'debugapi'" v-if="currentTab !== 'debugapi'">디버깅</v-btn>
      <v-btn dark secondary @click.native="currentTab = 'debugapi'" v-if="currentTab === 'debugapi'">디버깅</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <reservation v-show="currentTab === 'reservation'" @snackbar="Snackbar"></reservation>
    <notice v-show="currentTab === 'notice'" @snackbar="Snackbar"></notice>
    <troubleshoot v-show="currentTab === 'troubleshoot'" @snackbar="Snackbar"></troubleshoot>
    <usermanage v-show="currentTab === 'usermanage'" @snackbar="Snackbar"></usermanage>
    <debugapi v-show="currentTab === 'debugapi'" @snackbar="Snackbar"></debugapi>
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
  components: {
    'reservation': Reservation,
    'notice': Notice,
    'troubleshoot': Troubleshoot,
    'usermanage': UserManage,
    'debugapi': DebugAPI,
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