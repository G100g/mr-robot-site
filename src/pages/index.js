import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => (
  <div>
    <h1>Episodes</h1>

    <div className="episodes">
      {data.allEpisodesJson.edges.map(({ node: { id, name, season, number, image: { medium: imageMedium } } }) => (
        <div key={id} className="episode">
          <Link to={`/episode/${id}`}><img src={imageMedium} alt={name} /></Link>
          <h3>#{number}<br /> {name}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default IndexPage;

export const query = graphql`
  query EpisodesQuery {
    allEpisodesJson {
      edges {
        node {
          id
          name
          number
          season
          image {
            medium
            original
          }
        }
      }
    }
  }
`;
