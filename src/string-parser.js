import React,{Component}from'react';import Linkify from'react-linkify';const StringParser=React.createClass({displayName:'StringParser',getInitialState:function(){return{isMore:!1,text:[]}},getDefaultProps:function(){return{charLimit:200}},componentDidMount:function(){this.createTextArr(this.props)},componentWillReceiveProps:function(a){a.text!=this.props.text&&this.createTextArr(a)},createTextArr:function(a){let b=[],c=[];a.text&&(b=a.text.split('\n')),console.log(this.props.charLimit);for(let d=0;d<b.length;d++){c.push({text:b[d],newLine:!0});let e=b[d],f=[],g='';for(f.push(e),console.log('for loop 1');e.length>this.props.charLimit&&(!f.length||f[0]!=g);){console.log('while loop 1'),g=f[0],e=f[0].substr(0,f[0].length/2);for(let h=0;h<f.length;h+=2){console.log('for loop 2');let k=f[h].length/2;for(;' '!=f[h].charAt(k)&&k<f[h].length;)k++;f.splice(h+1,0,f[h].substr(k)),f.splice(h,1,f[h].substr(0,k))}}b.splice(d,1,f[0]),c.splice(d,1,{text:f[0],newLine:!(1!=f.length)});for(let h=1;h<f.length;h++)console.log('for loop 3'),b.splice(d+h,0,f[h]),c.splice(d+h,0,{text:f[h],newLine:h==f.length-1}),d++}this.setState({text:c})},render(){return React.createElement('div',{style:{width:'100%',wordWrap:'break-word'}},this.state.text.map(function(a,b){return''==a.text&&(b<this.props.breakOn||this.state.isMore)?React.createElement('div',{style:{height:10},className:'',key:b},a.text.replace(/ /g,'\xA0')):b<this.props.breakOn||this.state.isMore?a.newLine?React.createElement('span',{key:b},React.createElement(Linkify,{properties:{target:'_blank'},target:'_blank'},a.text),React.createElement('div',null)):React.createElement(Linkify,{properties:{target:'_blank'},target:'_blank',key:b},a.text):b==this.props.breakOn?React.createElement('span',{key:b,className:'cursor-pointer edittabs-indiv-tabs',onClick:()=>{this.setState({isMore:!0})}},'...Read More'):void 0}.bind(this)),this.state.isMore?React.createElement('div',{className:'cursor-pointer edittabs-indiv-tabs',onClick:()=>{this.setState({isMore:!1})}},'...Show less'):null)}});export default StringParser;