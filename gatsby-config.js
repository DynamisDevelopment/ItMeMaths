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
  ]
}
