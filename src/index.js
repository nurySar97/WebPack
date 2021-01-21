import Post from '@models/Post';
import '@/styles/style';
import json from '@/assets/json';
import Webpack from '@/assets/webpack-logo';
import xml from '@/assets/dataXML';
import csv from '@/assets/dataCSV';

const post = new Post('Webpack Post Title', Webpack);

console.log('Post To String: ', post.toString(), " This is index.js");

console.log('JSON: ', json);
console.log('XML: ', xml);
console.log('CSV: ', csv);