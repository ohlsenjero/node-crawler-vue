<template>
  <div>
    <div class="crawl-div float-left">
     
      <div class="inputs">
        <label>URL</label>
        <input v-model="url" value="url" />
        <label>Word Search</label>
        <input v-model="wordSearch" value="wordSearch" />
      </div>
      <div class="buttons">
        <button @click="startCrawl();"> START </button>
        <button @click="showResults();"> RESULTS </button>
        <button @click="stopCrawl();"> STOP </button>
      </div>

    </div>
    
    <div id="results">

      <h3>Crawl Results</h3>

      <div class="closeresults" @click="hideCrawlData"> </div>
       
      <a class="d-flex" :href="urls" target="_blank" v-for="urls in crawlFinds">{{ urls }} </a>

      
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        url: "http://www.emol.cl/",
        wordSearch: '',
        crawling:undefined,
        interval:undefined,
        crawlFinds:['no results found...'],
        resultsDiv: 'hide',
        doneLoading: true
      };
    },
    created: function() {
     
      this.listenToNav();
    },
    
    methods: {

      getCrawlFinds () {
    //my query add new
        
        this.interval = setInterval(function(){

          console.log('ANOTHER INTERVAL');

          this.$http.post("/results").then(response => {
  
            console.log(response.data.urls);
            this.crawlFinds = response.data.urls;
          });

        }.bind(this), 3000);
        
      },

      showResults(){
        if(this.crawling){

          clearInterval(this.interval);
          this.getCrawlFinds();
        }

        if(this.resultsDiv != 'show'){
          document.getElementById('results').style.display= 'block';
          this.resultsDiv = 'show';
        }
      },

      startCrawl() {

        if(!this.crawling){

          this.crawling=true;

          clearInterval(this.interval);
          this.crawlFinds=['finding...'];

          if(this.resultsDiv== 'show'){

            this.getCrawlFinds();
          }
          console.log(this.url);
          
          this.$http.post("/crawl2",{url: this.url, word: this.wordSearch, start: true}).then(response => {
            
            console.log(response.data);

          });
        }
      },
      listenToNav() {
        
        bus.$on("getCrawlData", $event => {
          if(this.crawling){

            clearInterval(this.interval);
            this.getCrawlFinds();
          }
        });

        bus.$on("resultsDivShow", $event => {
          this.resultsDiv='show';
        });

        bus.$on("startCrawl", $event => {
          this.startCrawl();
        });

        bus.$on("stopCrawl", $event => {
          this.stopCrawl();
        });
      },
      
      hideCrawlData() {
        clearInterval(this.interval);
        document.getElementById('results').style.display= 'none';
        this.resultsDiv='hide';
      },

      stopCrawl() {
        clearInterval(this.interval);

        this.crawling=false;
        this.crawlFinds=['results flushed...'];

        //alert(this.crawlFinds);

        //setTimeout(function(){ document.getElementById('results').style.display= 'none'; }, 1000);

        this.$http.post("/crawl2",{url: this.url, word: this.wordSearch, start: false}).then(response => {
          
          console.log(response.data);

        });

      }

      
    }, 
    beforeDestroy () {
      this.stopCrawl();
      clearInterval(this.interval)
    }
  };

</script>


<style>

.crawl-div {
  min-width:80%;
  margin-left: 10%;
  min-height: 300px;
  display: block;
}

.crawl-div label {
  margin-top:20px;
  text-align: left;
  display: block;
}

.crawl-div input {
  width: 100%;
  background-color: #1b22ff;
  color: white;
  padding-left: 6px;
}

.crawl-div .inputs {
  width: 40%;
  margin-right:30%;
  margin-left:30%;
}

.crawl-div button {
  width: 120px;
  margin:20px 10px 0 10px;
  padding:20px 0;
  color:#1b00cc;
  background-color: black;
}

.crawl-div button:hover {
  color:#007bff;
}

.crawl-div button:active {
  color:#4bf213;
}


.crawl-div .buttons {
  margin-top:20px;

}

#results {
  margin-left:0;
  position: absolute;
  width: 100%;
  background-color:black;
  border: 2px solid white;
  color:#007bff;
  display: none;
  margin-top:4px;
  z-index: 1000;
}

#results h3 {
  margin-top:10px;
}

#results a {
  margin-left:16px;
  margin-top:4px;
  color:#4bf213;
  max-width: auto;
}
#results a:last-child{
  margin-bottom:20px;
}

#results a:hover{
  color:white;
}

.closeresults {
  position: fixed;
  right: 10%;
  top:100px;
  width: 60px;
  height: 60px;
  background-color: white;
}

.closeresults:hover {
  cursor: pointer;
}

</style>