<template>
    <div id="sideNav" class="text-center sideNav">
        
            <a href="javascript:void(0)" class="closebtn" onclick="closeSide()"><i class="fa fa-close fa-2x"></i></a>
        <div class="hidden-xs">
            <a href="#">My Info</a>
            <a href="#">Reservation</a>
            <a href="#">Menu3</a>
        </div>
        <div class="visible-xs">
            <a href="#"><i class="fa fa-cog fa-2x"></i> </a>
            <a href="#"><i class="fa fa-calendar fa-2x"></i></a>
            <a href="#"><i class="fa fa-list fa-2x"></i></a>
        </div>
    </div>
    <nav class="navbar">
      <div id="home" class="container-fluid">
        <div class="navbar-header">
          <a class="btn navbar-hover navbar-toggle collapsed" onclick="openSide()">{{name}} 님</a>
          <a class="navbar-hover navbar-brand" href="#">SMART CAR FACTORY</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse hidden-xs">
          <ul class="nav navbar-nav navbar-right">
                <li><a href="#" v-if="!logIn" class="navbar-hover"><i class="fa fa-sign-in"></i> Sign in</a></li>
                <li><a class="navbar-hover btn" onclick="openSide()" v-if="logIn" >{{name}} 님</a></li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="active"><a class="navbar-hover" href="#home">Home</a></li>
                <li><a class="navbar-hover" href="#about">About</a></li>
                <li><a class="navbar-hover" href="#contact">Book</a></li>
          </ul> 
        </div>
      </div>
    </nav>
</template>
<script>
    var app = new Vue({
        el: '#home',
        data:{
            name: 'User Name',
            logIn: true
        }
    })

    function openSide(){
        document.getElementById("sideNav").style.width = "22%";
    }

    function closeSide(){
        document.getElementById("sideNav").style.width = "0";
    }
</script>
<style>
</style>