module.exports = {
  siteMetadata: {
    title: "Gatsby-starter",
    author: "Dynamis Development"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Graphcms",
        // This is field under which it's accessible
        fieldName: "graphcms",
        // Url to query from
        url: "https://api-useast.graphcms.com/v1/ck1wrwwpk1dk401a07d1v0nyv/master",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
      },
    },
  ]
}
