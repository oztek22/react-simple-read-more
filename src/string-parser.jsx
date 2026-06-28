import React, { useState, useEffect } from 'react';
import Linkify from 'linkify-react';
import { createTextArr } from './createTextArr.js';

export { createTextArr };

function StringParser({ text: inputText, charLimit = 200, breakOn = Infinity }) {
    const [isMore, setIsMore] = useState(false);
    const [text, setText] = useState([]);

    useEffect(() => {
        setText(createTextArr(inputText, charLimit));
    }, [inputText, charLimit]);

    return (
        <div style={{ width: '100%', wordWrap: 'break-word' }}>
            {text.map((station, i) => {
                if (station.text === '' && (i < breakOn || isMore))
                    return <div style={{ height: 10 }} className="" key={i}>{station.text.replace(/ /g, "\u00a0")}</div>;
                else if (i < breakOn || isMore)
                    return station.newLine
                        ? <span key={i}><Linkify options={{ target: '_blank' }}>{station.text}</Linkify><div></div></span>
                        : <Linkify options={{ target: '_blank' }} key={i}>{station.text}</Linkify>;
                else if (i === breakOn)
                    return <span key={i} className='cursor-pointer edittabs-indiv-tabs' onClick={() => setIsMore(true)}>...Read More</span>;
                else
                    return null;
            })}
            {isMore
                ? <div className='cursor-pointer edittabs-indiv-tabs' onClick={() => setIsMore(false)}>...Show less</div>
                : null
            }
        </div>
    );
}

export default StringParser;
