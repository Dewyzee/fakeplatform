<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="canvas-container">
      <canvas class="background"></canvas>
    </div>
    <router-view class="router-entry"/>
  </div>
</template>

<script>
import navBar from '@/components/nav/nav'
import particlesjs from 'particlesjs'

window.onload = function () {
  particlesjs.init({
    selector: '.background',
    color: '#75A5B7',
    maxParticles: 130,
    connectParticles: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 80,
          connectParticles: true
        }
      }, {
        breakpoint: 375,
        options: {
          maxParticles: 50,
          connectParticles: true
        }
      }
    ]
  })
}

export default {
  name: 'App',
  components: {
    'nav-bar': navBar
  }
}
</script>

<style lang="less" scoped>

.canvas-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: url('./assets/background.jpg') no-repeat top left / 100% 100%;
  .background {
    display: block;
  }
}

#app {
  position: relative;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .router-entry {
    position: relative;
    top: 80px;
    width: 1000px;
    z-index: 9;
  }
}
</style>
