import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Post from '@models/Post';
import '@/styles/style';
import json from '@/assets/json';
import Webpack from '@/assets/webpack-logo';
import "./babel";
import xml from '@/assets/dataXML';
import csv from '@/assets/dataCSV';
import * as $ from 'jquery';
import "./styles/less.less";
import "./styles/sass.scss";

const post = new Post('Webpack Post Title', Webpack);
$('.json').addClass('post').html(post.toString());
console.log('Post To String: ', post.toString(), " This is index.js");
console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv, "Hello");

const App = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div className="container">
            <h1>Webpack Course</h1>
            <div className="logo" />
            <pre className="json" />
            <div className="box"><span>Hello</span></div>
            <div className="combo-box" />
            <h1>React</h1>
            <div>
                <h1>Count: {counter}</h1>
                <button onClick={() => setCounter(c => ++c)}>
                    Increment
                </button>
            </div>
        </div>
    )
}

ReactDOM.render(<App name='Fido' />, document.getElementById('root'));