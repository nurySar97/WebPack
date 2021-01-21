import Post from './Post';
import './styles/style.css';
import json from './assets/json';
import Webpack from './assets/webpack-logo.png';
import xml from './assets/data.xml';
import csv from './assets/data.csv'

const post = new Post('Webpack Post Title', Webpack);

console.log('Post To String: ', post.toString(), " This is index.js");

console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv)