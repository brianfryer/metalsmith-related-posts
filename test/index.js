const metalsmith = require('metalsmith');
const should = require('should');
const related = require("../")

describe('metalsmith-tags-related', function() {
    it('related array should not include itself', function (done) {
        metalsmith(__dirname)
        .source('./posts')
        .use(related({
        }))
        .build(function(err, files) {
            for (file in files) {
                if (typeof files[file].related !== "undefined") {
                    files[file].related.should.not.containEql(files[file])
                }
            }
            done();
        });

    });
    it('posts should have a maximum of 2 related posts', function (done) {
        metalsmith(__dirname)
        .source('./posts')
        .use(related({
            max_posts: 2,
        }))
        .build(function(err, files) {
            for (file in files) {
                if (typeof files[file].related !== "undefined") {
                    files[file].related.should.not.be.above(2)
                }
            }
            done();
        });

    });
    it('posts should share a minimum of two tags, so Post 2\'s related array should not include Post 3, and vice versa', function (done) {
        metalsmith(__dirname)
        .source('./posts')
        .use(related({
            min_matches: 2,
        }))
        .build(function(err, files) {
            var related = files["Post 2.md"].related.map(file => {
                return file.title
            })
            related.should.containEql("Post 1")
            related.should.not.containEql("Post 3")
            var related = files["Post 3.md"].related.map(file => {
                return file.title
            })
            related.should.containEql("Post 1")
            related.should.not.containEql("Post 2")
            done();
        });
    });
    it('post should be at least one post in the related array or it should be undefined', function (done) {
        metalsmith(__dirname)
        .source('./posts')
        .use(related({
            min_posts: 3,
        }))
        .build(function(err, files) {
            for (file in files) {
                if (files[file].title == "Post 1") {
                    files[file].related.length.should.be.aboveOrEqual(3)
                } else {
                    should.not.exist(files[file].related)
                }
            }
            done();
        });
    });
    it('should use the specified attribute instead of tags, so the length of all the related arrays should be 4', function (done) {
        metalsmith(__dirname)
        .source('./posts')
        .use(related({
            attribute: "test_attribute"
        }))
        .build(function(err, files) {
            for (file in files) {
                if (files[file].title !== "Post Unrelated") {
                    files[file].related.length.should.be.equal(4)
                }
            }
            done();
        });
    });
});
