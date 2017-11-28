import React from "react";

export default function SingleEpisode({ pathContext: { name, season, number, image, summary } }) {

    return (<div className="singleEpisode">
        
        <h1>{name}</h1>
        <small>Season {season} • Episode {number}</small>

        <img src={image} />

        <div className="singleEpisode__summary"><p>{summary}</p></div>

        </div>)

}