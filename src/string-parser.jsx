import React, {Component} from 'react';
import Linkify from 'react-linkify';

const StringParser = React.createClass({
    getInitialState: function() {
        return {
        isMore: false,
        text: []
        }
    },
    componentDidMount: function(){
        this.createTextArr(this.props);
    },
    componentWillReceiveProps: function(nextProp) {
        if(nextProp.text != this.props.text) {
            this.createTextArr(nextProp);
            console.log('hahaha');
        }
    },
    createTextArr: function(nextProp) {
        let text = [];
        let result = [];
        if(nextProp.text) text = nextProp.text.split("\n");
        for (let i=0; i< text.length; i++) {
            result.push({
                text: text[i],
                newLine: true
            });
            // let wordList = text[i].split(' ');
            let tempText = text[i];
            let tempArr = [];
            tempArr.push(tempText);
            while(tempText.length > 200) {
                tempText = tempArr[0].substr(0,tempArr[0].length/2);
                for (let j = 0; j<tempArr.length; j=j+2) {
                    let splitIndex = tempArr[j].length/2;
                    while(tempArr[j].charAt(splitIndex) != ' ' && splitIndex < tempArr[j].length) {
                        splitIndex++;
                    }
                    tempArr.splice(j+1,0,tempArr[j].substr(splitIndex));
                    tempArr.splice(j,1,tempArr[j].substr(0,splitIndex));
                }
            }
            text.splice(i, 1, tempArr[0]);
            result.splice(i,1,{
                text: tempArr[0],
                newLine: tempArr.length == 1? true : false
            });
            for (let j = 1; j<tempArr.length; j++) {
                text.splice(i+j, 0, tempArr[j]);
                result.splice(i+j,0,{
                    text: tempArr[j],
                    newLine: j == (tempArr.length - 1)? true : false
                });
                i++;
            }
        //     if(wordList.length) {
        //         let nextWords = wordList[0];
        //         for (let j = 1; j< wordList.length; j++) {
        //             if(wordList[i]=='') {

        //             } else if (j == 10) {
        //                 text[i] = nextWords
        //             } else if(j%10 == 0) {

        //             }
        //         }
        //     }
        }
        console.log(result);
        this.setState({text: result});
    },

    render() {
        return (
            <div style={{width:'100%',wordWrap: 'break-word'}}>
            {this.state.text.map(function(station, i){
                if(station.text == '' && (i<this.props.breakOn || this.state.isMore))
                return <div style={{height:10}} className="" key={i}>{station.text.replace(/ /g, "\u00a0")}</div>;
                else if (i<this.props.breakOn || this.state.isMore)
                return station.newLine? <span key={i}><Linkify properties={{target: '_blank'}}>{station.text}</Linkify><div></div></span> : <Linkify  properties={{target: '_blank'}} key={i}>{station.text}</Linkify>;
                else if(i == this.props.breakOn)
                return <span key={i} className='cursor-pointer edittabs-indiv-tabs' onClick={()=>{this.setState({isMore: true})}}>...Read More</span>
                else
                return
            }.bind(this))}
             {this.state.isMore?
                <div className='cursor-pointer edittabs-indiv-tabs' onClick={()=>{this.setState({isMore: false})}}>...Show less</div>
                :
                null
            } 
            </div>
        );
    }
});

export default StringParser;