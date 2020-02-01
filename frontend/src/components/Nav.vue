<template>
   <nav>
      <a @click="stopCrawl($event)" href="/">Home</a>
      <a @click="stopCrawl($event)" href="/crawl">Crawl</a>
      <a @click.prevent="crawlData($event);" href="/results">Results</a>
      <a @click.prevent="startCrawl($event);" href="/start">Start</a>
      <a @click.prevent="stopCrawl($event);" href="/stop">Stop</a>

    </nav>
</template>

<script>
  import axios from "axios";
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        doneLoading: true
      };
    },

    
    
    methods: {
       
      startCrawl(event){
        bus.$emit("startCrawl");
      }, 
      stopCrawl(event){
        bus.$emit("stopCrawl");
      },
      crawlData(event) {

        // function switchVisibility(){
        //   return (document.getElementById('results').style.display=='none') ? 'block':'none';
        // }
        bus.$emit("getCrawlData");

        bus.$emit("resultsDivShow");

        document.getElementById('results').style.display= 'block';

        /// CALL getCrawlFinds()  from here!!!
      }, 


    }
  };

</script>

<style>
nav {
  margin:10px 0 30px 0;
  font-size: 1.7em;
  font-weight:bold;
}
nav a {
  margin:0 8px;
  text-decoration: none;
}

nav a:hover {
  text-decoration: none;
  color: white;
}

/*nav a:active {
  text-decoration: none;
  color: #ff002f;
}*/

</style>