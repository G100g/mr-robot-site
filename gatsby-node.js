const path = require('path')

module.exports.createPages = function({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/single-episode.js`);
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allEpisodesJson {
              edges {
                node {
                  id
                  name
                  number
                  season
                  summary
                  image {
                    medium
                    original
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages for each markdown file.
        result.data.allEpisodesJson.edges.forEach(
          ({
            node: { id, name, season, summary, number, image: { original: image } }
          }) => {
            const path = `episode/${id}`;
            createPage({
              path,
              component: template,
              // If you have a layout component at src/layouts/blog-layout.js
              // layout: `blog-layout`,
              // In your blog post template's graphql query, you can use path
              // as a GraphQL variable to query for data from the markdown file.
              context: {
                id,
                path,
                name,
                season,
                number,
                summary,
                image
              }
            });
          }
        );
      })
    );
  });
};
