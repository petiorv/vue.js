<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            Home
          </li>
        </ul>
      </nav>
    </header>
    <main>    
    <HomePage/>
    </main>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage
  }
}
</script>

<style>
body{
  background: linear-gradient(to bottom, #556, #999);
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
}
main{
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  width: 1024px;
  min-height: 300px;
}
</style>
