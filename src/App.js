import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setFollowers(data[page]);
  }, [loading, page]);

  function handlePage(index) {
    setPage(index);
  }

  function handlePrev() {
    if (page <= 0) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page >= data.length - 1) {
      setPage(data.length - 1);
    } else {
      setPage(page + 1);
    }
  }
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "Pagination"}</h1>
        <div className="underline"></div>
      </div>

      <section className="follower">
        <div className="container">
          {followers.map((person) => {
            return <Follower key={person.id} {...person} />;
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <div className="prev-btn" onClick={handlePrev}>
              prev
            </div>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <div className="next-btn" onClick={handleNext}>
              next
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
