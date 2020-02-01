<template>
  <div class="container">
  
    <Nav></Nav>

    <Crawl></Crawl>
<!-- 
    <CreateTodo></CreateTodo>
    <ListTodo></ListTodo> -->
  
  </div>
</template>

<script>
import CreateTodo from "./components/CreateTodo.vue";
import ListTodo from "./components/ListTodo.vue";
import Crawl from "./components/Crawl.vue";
import Nav from "./components/Nav.vue";

export default {
  name: "app",
  components: { Nav, Crawl, CreateTodo, ListTodo }, 

};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
.vertical-centre {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.todo__row {
  width: 400px;
}

body, html {
  background-color: #1b22ff;
  min-height: 100vh;
  color:white;
}
.container {
  padding-left:0;
  position: relative;
  background-color: #1b00cc;
  display: inline-block;
  min-height: 100vh;
  width: 100%;
}
</style>
