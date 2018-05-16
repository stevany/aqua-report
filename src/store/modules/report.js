'use strict';
import * as types from '../types';
import axios from 'axios';


const store={
	state:{
			reports:[],
			load:false,
			report:{
				
				_id:0,
				name:''
			},
			listReport:[]
		},

	mutations:{
		[types.GET_REPORTS](state, data){
			state.reports=data
			state.listReports=data

		},
		[types.SEARCH_REPORTS](state,name){
			state.load=false
			let r=[...state.listReports]
			let search=''
			search = r.filter((item) => {
		        return item.title.toLowerCase().indexOf(name.toLowerCase()) > -1
		        
			})
			let r2=[...state.listReports]
			if(!search){
				search = r2.filter((item) => {
		        	return item.description.toLowerCase().indexOf(name.toLowerCase()) > -1
				})
			}
			state.reports=search
			state.load=true
		},
	},

	actions:{
		findAllReports({ commit } ){
			return axios.get(types.API_URL)
			.then(response => {
			    commit(types.GET_REPORTS, response.data) 
				
			})
			 .catch(function (error) {
			 	console.log(error)
			 })
			
		},
		search({ commit }, name){
			commit(types.SEARCH_REPORTS, name)
		} 

	}
}
export default store