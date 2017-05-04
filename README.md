# metalsmith-related-posts
A Metalsmith plugin that adds a list of related posts to each post based on the specified property (e.g. tags, categories, etc). Matches are sorted according to the number of related tags the posts share.

## Install
```
npm install metalsmith-related-posts
```
## Usage

```javascript
const metalsmith = require("metalsmith");
const related = require("metalsmith-related-posts");

metalsmith
    .use(related({
        //options
    }))
```

## Options

#### `attribute`
(default "tags")

The post attribute to use for calculating related posts. The property must be an array.

#### `max_posts`
(default no limit)

The max number of posts to add to the related array.

#### `min_matches`
(default 1)

The minimum number of "tags" a post must share in order to be considered related to another post.

#### `min_posts`
(default 1)

The minimum number of related posts that must be found for the related array to be added to the post.
