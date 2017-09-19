<template>
  <v-app id="debugapi">
    <v-container fluid xs12>
      <v-layout row wrap xs6>
        <v-flex d-flex>
          <v-card>
            <v-text-field label="input JSON" multi-line v-model="data"></v-text-field>
          </v-card>
        </v-flex>
        <v-flex d-flex xs4>
          <v-card>
            <v-text-field label="Destination" multi-line v-model="destination"></v-text-field>
          </v-card>
        </v-flex>
        <v-flex d-flex xs2>
          <v-layout column wrap>
            <v-flex d-flex xs3>
            <v-btn @click.native="sendData('GET')">GET</v-btn>
            </v-flex>
            <v-flex d-flex xs3>
            <v-btn @click.native="sendData('POST')">POST</v-btn>
            </v-flex>
            <v-flex d-flex xs3>
            <v-btn @click.native="sendData('PUT')">PUT</v-btn>
            </v-flex>
            <v-flex d-flex xs3>
            <v-btn @click.native="sendData('DELETE')">DELETE</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <br>
      <v-layout>
        <v-flex>
          <v-card>
            <v-text-field label="output JSON" multi-line v-model="retData" readonly></v-text-field>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'debugapi',
  data () {
    return {
      data: '',
      destination: '??',
      retData: '',
    }
  },
  methods: {
    sendData: function (responseType) {
      let xhr = new XMLHttpRequest(), self = this
      xhr.open(responseType, this.destination)
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.onreadystatechange = function () { if (xhr.readyState === XMLHttpRequest.DONE) self.retData = xhr.responseText }
      let temp = JSON.parse(this.data)
      temp._csrf = document.cookie.split("_csrf=")[1]
      console.log(temp)
      xhr.send(JSON.stringify(temp))
    }
  }
}
</script>

<style scoped>
</style>