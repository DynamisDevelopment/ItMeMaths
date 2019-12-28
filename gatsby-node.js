const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // * Archives
    const archiveTemplate = path.resolve('./src/templates/archive/Archive.js')
    const archive = await graphql(`
        query {
            graphcms {
              categories {
                slug
              }
            }
          }
        `)

    archive.data.graphcms.categories.forEach(edge => {
        createPage({
            component: archiveTemplate,
            path: `/archive/${edge.slug}`,
            context: { slug: edge.slug }
        })
    })

    // * Posts
    const postTemplate = path.resolve('./src/templates/post/Post.js')
    const posts = await graphql(`
        query {
            graphcms {
              posts {
                slug
              }
            }
          }
        `)

    posts.data.graphcms.posts.forEach(edge => {
        createPage({
            component: postTemplate,
            path: `/posts/${edge.slug}`,
            context: { slug: edge.slug }
        })
    })
}

