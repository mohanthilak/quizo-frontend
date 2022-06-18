import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import backLogo from "./back.png";

export default function LeftSide({
  user,
  setClientId,
  changeView,
  display,
  setDisplay,
}) {
  const [searching, setSearching] = useState(false);
  const [searchingUser, setSearchingUser] = useState("");
  const [searchResults, setSearchResults] = useState(user.rooms);

  const searchUsers = () => {
    setSearching(true);
    axios({
      method: "POST",
      data: {
        searchingUser,
      },
      withCredentials: true,
      url: `https://quizzooo.herokuapp.com/user/${user._id}/findusers`,
    }).then((res) => {
      setSearchResults(res.data.users);
    });
  };

  return (
    <div
      className={
        changeView === true
          ? display
            ? "names_div full_display"
            : "no_display"
          : "names_div"
      }
    >
      <div className="search_div">
        {searching && (
          <img
            src={backLogo}
            alt=""
            onClick={() => {
              setSearchResults(user.rooms);
              setSearching(false);
              setSearchingUser("");
            }}
            className="ms-3"
            style={{ height: "15px", width: "15px" }}
          />
        )}
        <div>
          {/* <label>Find eople</label> */}
          <input
            type="text"
            value={searchingUser}
            onChange={(e) => setSearchingUser(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchUsers();
              }
            }}
            placeholder="Username"
          />
          <button onClick={searchUsers}>Search</button>
        </div>
      </div>

      <div className="names_list_div">
        {searchResults && searchResults ? (
          searchResults.map(
            (item, i) => (
              searching ? (item = item) : (item = item.with),
              (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchingUser("");
                    setDisplay(false);
                    setClientId(item._id);
                  }}
                  className="name_div"
                  key={i}
                >
                  <div className="image">
                    <img
                      src={
                        item.image
                          ? item.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuCwSGCSFDd2fiwEJIivTZMtyi_C-rJviL6eaNYj_D6JSCsqGeNKxGSikjn8QcPqPvWQ&usqp=CAU"
                      }
                      alt=""
                    />
                  </div>
                  <div className="name_text">
                    <h6>{item.username}</h6>
                  </div>
                </div>
              )
            )
          )
        ) : (
          <div className="name_div">
            <div className="image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuCwSGCSFDd2fiwEJIivTZMtyi_C-rJviL6eaNYj_D6JSCsqGeNKxGSikjn8QcPqPvWQ&usqp=CAU"
                alt=""
              />
            </div>
            <div className="name_text">
              <h6>naruto Uzumaki</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// {searchResults &&
//   searchResults.map((item, i) => (
//     <div className="name_div" key={i}>
//       {console.log(searchResults)}
//       <div className="image">
//         <img
//           src={
//             item.image
//               ? item.image
//               : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuCwSGCSFDd2fiwEJIivTZMtyi_C-rJviL6eaNYj_D6JSCsqGeNKxGSikjn8QcPqPvWQ&usqp=CAU"
//           }
//           alt=""
//         />
//       </div>
//       <div className="name_text">
//         <h6>{item.username}</h6>
//       </div>
//     </div>
//   ))}

// {
//   {searchResults
//                 ? console.log(searchResults)
//                 : console.log("no data yet")}
// }

// <div className="name_div">
//   <div className="image">
//     <img
//       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuCwSGCSFDd2fiwEJIivTZMtyi_C-rJviL6eaNYj_D6JSCsqGeNKxGSikjn8QcPqPvWQ&usqp=CAU"
//       alt=""
//     />
//   </div>
//   <div className="name_text">
//     <h6>naruto Uzumaki</h6>
//   </div>
// </div>
