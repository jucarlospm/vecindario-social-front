import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

// redux
import { getPosts, getMorePosts } from "../store/slices/posts";

const Dashboard = () => {
  const { posts, total_data_page } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(user.id));
  }, [dispatch, user.id]);

  const handleGetMorePosts = () => {
    dispatch(getMorePosts(user.id));
  };

  if (posts.length === 0) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="alert alert-secondary" role="alert">
              Aun no existen post para mostrar. Se el primero :)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <InfiniteScroll
            style={{
              overflow: "none",
            }}
            dataLength={posts.length}
            next={handleGetMorePosts}
            hasMore={total_data_page >= 10}
            loader={
              <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            endMessage={
              <div className="alert alert-secondary" role="alert">
                No hay mas post por mostrar{" "}
              </div>
            }
          >
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
