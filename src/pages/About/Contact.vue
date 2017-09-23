<template>
	<div class="contact container view" v-once>
      <h2 class="mt-5 text-center font-exo">CONTACT</h2>
      <v-container fluid class="mt-5">
        <v-layout row>
          <v-flex>
            <v-layout row-md column>
              <v-flex class="mt-3 ml-3 mr-3">
                <v-card class="elevation-15">
                  <v-card-media
                    src="../../../static/img/LF-bg.jpg"
                    height="240px"
                  ></v-card-media>
                  <v-card-title>
                    <div>
                      <h3 class="subject">Learning Factory 운영진</h3>
                      <div class="caption text-left">
                        <v-icon>fa-phone</v-icon> 031.290.5699<br>
                        <v-icon>fa-envelope-o</v-icon> wolfwood@skku.edu<br>
                        <v-icon class="lime--text text--darken-2">home</v-icon><a href="https://sites.google.com/site/skkulf/"> sites.google.com/site/skkulf</a>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex class="mt-3 ml-3 mr-3">
                <v-card class="elevation-15">
                  <v-card-media
                    src="../../../static/img/weup-bg.jpg"
                    height="240px"
                  ></v-card-media>
                  <v-card-title>
                    <div>
                      <h3 class="blue--text subject">WE-UP 사업단</h3>
                      <div class="caption text-left">
                        <v-icon>fa-phone</v-icon> 031.290.5612<br>
                        <v-icon>fa-envelope-o</v-icon> choi5698@skku.edu<br>
                        <v-icon class="blue--text">home</v-icon><a href="http://weup.skku.edu/intro/"> weup.skku.edu/intro</a>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
	</div>
</template>

<script>
export default {
  name: 'contact'
}
</script>

<style scoped>
  .subject{
    font-family: 'nanumgothiccoding';
    font-size: 1.5em;
    font-weight: 400;
    line-height: 32px;
  }
</style>
