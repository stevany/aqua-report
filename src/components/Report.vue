<template>
<div>
	<div class="header">
		<img src="../../static/aqua-wide.png"/>
	</div>
	<div class="content">

	<h3>aqua Reports</h3>
	<p>The site allow to download templates for aqua reports. Feel free to download any reports you like and import it into your aqua environment. </p>
	<div class="add-box">
	<input v-model="text"
      type="text"
      placeholder="search in title and description" @change="search" />
    </div>

	<b-container class="bv-example-row" v-for="(r,index) in reports" :key="index" v-show="!load">
	<div class="line"></div>
	<b-row><b-col class="report-title">{{r.title}}</b-col></b-row>
    <b-row>
        <b-col cols="3"><a  @click="viewModal(r)"><img :src="r.thumbnailURL"/></a></b-col>
        <b-col cols="6" class="wrap">{{r.description}}</b-col>
        <b-col cols="2"> 
        <a @click="preview(r)" class="btn"><i class="far fa-eye"></i> PDF Preview</a>
        <a @click="download(r)" class="btn bottom"><i class="fas fa-download"></i> Download</a>
        </b-col>
    </b-row>
  
    </b-container>

    <b-modal size="lg" v-model="modalShow" hide-footer  :title="report.title">
   	<img :src="report.originalURL" class="image-modal"/>
  	</b-modal>
	</div>

	<footer class="site-footer">Maria Stevany</footer>
</div>
</template>
<script>
import {mapState}from 'vuex'
export default{
  data(){
    return{
      modalShow:false,
      text:null,
      report:{
      	title:'',
      	url:''
      }
   }
  },
  created(){
  	this.$store.dispatch('findAllReports')
  },
  computed:mapState({
    reports:store=>store.report.reports,
    load:store => store.report.load

  }),

  methods:{
  	preview(value){
  	  window.open(value.pdfURL, '_blank')
  	},
  	download(value){
  	  var link=document.createElement('a');
      document.body.appendChild(link);
	  link.href=value.zipURL ;
	  link.click();
  	},
  	viewModal(value){
  	  this.modalShow=true
  	  this.report=value
  	},
  	search(){
  	  this.$store.dispatch('search', this.text)
  	}
  },

}
</script>
<style>
html,body{
	height:100%;
}
.header{
	height:188px;
	width: 100%;
	background-color:#4b9cd2;
	margin-top:-60px;
	margin-left: auto;
    margin-right: auto;

}
input[type=text]{
	width: 15%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
 
}
p {
	font-size:10px;
	text-align:left;
	margin-left:170px;
}
h3{
	text-align:left;
	margin-left:170px;
}
.add-box{
	margin-left:-700px;
}
.report-title{
	margin-left:50px;
	text-align:left;
	display:block;
	font-size: 20px; 
	line-height: 23px; 
	font-weight: bold;
	margin-bottom:20px;
}
.image-modal{
	width:100%;
	height:100%;
}
.site-footer, .content:after {
  height: 25px; 
}
.site-footer {
	border-top:1px solid black;
	border-bottom:1px solid black; 
}
.content{
	margin-top:20px;
	min-height:100%;
	margin-bottom:-25px;

}
.content:after{
  content: "";
  display: block;
}
.line{
	margin: 20px 50px 30px ;
	border-bottom:1px solid #D3D3D3;
}
.btn {
	display:block;
	background-color:#4b9cd2;
	color:white;
	border-radius:6px;
	line-height:20px;
	width:100%;
	padding:15px 15px; 
	cursor:pointer;
	text-align:center;
}
.bottom{
	margin-top:5px;
}
.header img {
	margin-top:25px;
	
}
.wrap{
	text-align:left;
	word-wrap: break-word;
}
ul, li{
   list-style-type: none;
   margin: 0;
   padding: 0;	
}

</style>
