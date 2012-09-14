//
//Game API for Novel-Game
//
//
var NobelGameAPI = function(
	BaseDOMElement
){
	this.ID = BaseDOMElement ;
	this.cue = [] ;
}

NobelGameAPI.prototype = {
	toString : function(){ return "[object NobelGameAPI]" } ,
	getDOMElement : function(){ return document.getElementById(this.ID).childNodes[1] } ,
	cue_num : 0 ,
	keystrokable : true ,
	skipKey : false ,
	canNext : true ,
	dlgHeight : "300" ,
	nextskip : false ,
	Ready : function(func){
		if(window.onload){
			var front = window.onload ;
			window.onload = function(){ front() ; func() ; }
		}else{
			window.onload = func ;
		}
	} ,
	size : function(width , height){
		var api = this ;
		this.cue.push({
			run : function(){
				api.getDOMElement().parentNode.style.width = width ;
				api.getDOMElement().parentNode.style.height = height ;
			} ,
			keywait : false
		})
		return this ;
	} ,
	dlgSize : function(height){
		var api = this ;
		this.cue.push({
			run : function(){
				api.dlgHeight = height ;
			} ,
			keywait : false
		})
		return this ;
	} ,
	mes : function(str , keywait){
		if(keywait != false) keywait = true ;
		str += "\n"
		var api = this ;
		this.cue.push({
			run : function(){
				str = str	.replace(/&/g , "&amp;")
							.replace(/</g , "&lt;")
							.replace(/>/g , "&gt;")
							
							.replace(/\n/g , "<br>")
							.replace(/ /g , "&nbsp;")
				api.showMessage( str , api.getDOMElement() , api )  ; 
			} ,
			keywait : keywait
		}) ;
		return this ;
	} ,
	name : function(str){
		var api = this ;
		this.cue.push({
			run : function(){
				if(!str){
					str = ""
					api.getDOMElement().parentNode.childNodes[0].style.display = "none"
					api.getDOMElement().style.top = api.dlgHeight + "px"
				}else{
					api.getDOMElement().parentNode.childNodes[0].style.display = "inline"
					api.getDOMElement().parentNode.childNodes[0].style.top = (parseInt(api.dlgHeight) - 30) + "px"
					api.getDOMElement().style.top = (parseInt(api.dlgHeight - 21)) + "px"
				}
				str = str	.replace(/&/g , "&amp;")
							.replace(/</g , "&lt;")
							.replace(/>/g , "&gt;")
							
							.replace(/\n/g , "<br>")
							.replace(/ /g , "&nbsp;")
				api.getDOMElement().parentNode.childNodes[0].innerHTML = str ;
			} , 
			keywait : false
		})
		return this ;
	} ,
	mesHTML : function(str , keywait){
		if(keywait != false) keywait = true ;
		var api = this ;
		this.cue.push({
			run : function(){api.getDOMElement().innerHTML += str;} ,
			keywait : keywait
		}) ;
		return this ;
	} ,
	bgColor : function(color){
		var api = this ;
		this.cue.push({
			run : function(){  api.getDOMElement().parentNode.style.backgroundColor = color ; } ,
			keywait : false
		})
		return this ;
	} ,
	bgImg : function(src){
		var api = this ;
		this.cue.push({
			run : function(){
				if(!src) api.getDOMElement().parentNode.style.backgroundImage = "" ; 
				else api.getDOMElement().parentNode.style.backgroundImage = "url(" + src + ")" ; 
			} ,
			keywait : false
		}) ;
		return this ;
	} ,
	color : function(color){
		var api = this ;
		this.cue.push({
			run : function(){  api.getDOMElement().parentNode.style.color = color ; } ,
			keywait : false
		})
		return this ;
	} ,
	font : function(fontFamily){
		var api = this ;
		this.cue.push({
			run : function(){  api.getDOMElement().parentNode.style.fontFamily = fontFamily ; } ,
			keywait : false
		})
		return this ;
	} ,
	dlg : function(){
		var api = this ;
		this.cue.push({
			run : function(){
				api.getDOMElement().style.position = "relative" ;
				api.getDOMElement().style.top = api.dlgHeight + "px" ;
				api.getDOMElement().style.borderTop = "solid 1px #555" ;
				api.getDOMElement().parentNode.childNodes[0].style.display = "none" ;
			} ,
			keywait : false
		})
		return this ;
	} ,
	all : function(){
		var api = this ;
		this.cue.push({
			run : function(){
				api.getDOMElement().style.position = "" ;
				api.getDOMElement().style.top = "" ;
				api.getDOMElement().parentNode.childNodes[0].style.display = "none"
			} ,
			keywait : false
		})
		return this ;
	} ,		
	cls : function(keywait){
		if(keywait != false) keywait = true ;
		var api = this ;
		this.cue.push({
			run : function(){ api.getDOMElement().innerHTML = "" ; api.nextskip = true ; } ,
			keywait : keywait
		})
		return this ;
	} ,
	showMessage : function(str , dom , api){
		var cue_number = 0 ;
		api.keystrokable = false ;
		var func = function(){
			var flag = str.substring(cue_number , cue_number + 1) == "<" || str.substring(cue_number , cue_number + 1 ) == "&" ;
			while(flag){
				if(str.substring(cue_number , cue_number + 1) == "<"){
					var strs = "" ;
					do{
						strs += str.substring(cue_number , cue_number + 1) ;
						cue_number ++ ;
					}while(str.substring(cue_number , cue_number + 1) != ">")
					
					strs += ">"
					cue_number++ ;
					dom.innerHTML += strs ;
				}
				if(str.substring(cue_number , cue_number + 1 ) == "&"){
					var strs = "" ;
					do{
						strs += str.substring(cue_number , cue_number + 1) ;
						cue_number ++ ;
					}while(str.substring(cue_number , cue_number + 1) != ";")
					
					strs += ";"
					cue_number++ ;
					dom.innerHTML += strs ;
				
				}
				flag = str.substring(cue_number , cue_number + 1) == "<" || str.substring(cue_number , cue_number + 1 ) == "&" ;
			}
			dom.innerHTML += str.substring(cue_number , cue_number + 1) ;
			cue_number ++;
			var speed = 100 ;
			if(api.skipKey) speed = 1 ;
			if(str.length > cue_number){
				setTimeout( func , speed) ;
			}else{
				api.keystrokable = true ;
				api.skipKey = false ;
			}
		}
		setTimeout(func , 1)
	} ,
	Start : function(){
		this.nextskip = true ;
		while(
			this.cue.length > this.cue_num &&
			(!this.cue[this.cue_num].keywait ||
			this.nextskip)){
			
			if(this.cue[this.cue_num].keywait) this.nextskip = false ;		
			this.cue[this.cue_num].run() ;
			this.cue_num ++ ;
		}
		
		var api = this ;
		var func = function(){
			if(event.keyCode){
				if(event.keyCode == 13 && api.cue.length > api.cue_num && api.keystrokable){
					api.cue[api.cue_num].run() ;
					api.cue_num ++ ;
				}else if(event.keyCode == 13 && api.cue.length > api.cue_num){
					api.skipKey = true ;
				}
			}else{
				if(api.keystrokable && api.cue.length > api.cue_num){
					api.cue[api.cue_num].run() ;
					api.cue_num ++ ;
				}else if(api.cue.length > api.cue_num)
					api.skipKey = true ;
			}

			while(
				api.cue.length > api.cue_num &&
				(!api.cue[api.cue_num].keywait ||
				 api.nextskip)
			){
				if(api.cue[api.cue_num].keywait) api.nextskip = false ;
				api.cue[api.cue_num].run() ;
				api.cue_num ++ ;
			}
		}
		if(this.getDOMElement().onkeydown){
			var front = this.getDOMElement().parentNode.onkeydown ;
			this.getDOMElement().onkeydown = function(){
				front() ;
				func() ;
			}
		}else{
			this.getDOMElement().parentNode.onkeydown = func ;
		}
		if(this.getDOMElement().onclick){
			var front = this.getDOMElement().parentNode.onclick ;
			this.getDOMElement().onclick = function(){
				front() ;
				func() ;
			}
		}else{
			this.getDOMElement().parentNode.onclick = func ;
		}
	}
	
}