import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./animes.css";
import axios from "axios";

export default function Animes() {
  const [portals, setPortals] = useState();

  useEffect(() => {
    console.log("sdasasdsad");
    axios({
      method: "GET",
      url: "https://quizzooo.herokuapp.com/portals",
    }).then((res) => {
      console.log(res);
      setPortals(res.data.portals);
    });
  }, []);

  return (
    <div className="animes_div">
      <div className="anime_header">
        <h1>animes</h1>
        <hr />
      </div>
      <div className="animes_list">
        {portals &&
          portals.map((portal, i) => (
            <Link key={i} to={`/portal/${portal._id}`}>
              <div className="anime_anime">
                <div className="image">
                  <img src={portal.image} alt="" />
                </div>
                <div className="description">
                  <h6 className="name">{portal.animeName}</h6>
                  <div>
                    <p className="name">Season: {portal.season}</p>
                    <p className="name">Episodes: {portal.episodes}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
