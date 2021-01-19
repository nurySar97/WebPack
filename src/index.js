import Post from './Post';
import createAnalytics from './analytics'

const post = new Post('Webpack Post Title')

console.log('Post To String: ', post.toString())

window.analytics = createAnalytics()