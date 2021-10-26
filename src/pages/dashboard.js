import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

// redux
import { getPosts, getMorePosts } from "../store/slices/posts";


const Dashboard = () => {
  const { posts, total_data_page } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleGetMorePosts = () => {
    dispatch(getMorePosts());
  };

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
              <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            }
            endMessage={
              <div class="alert alert-secondary" role="alert">
                No Hay mas post por mostrar{" "}
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
