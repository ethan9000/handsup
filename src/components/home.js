import Toggle from "./toggle";

const Home = ({ posts, updatePost }) => {
  return (
    <>
      <Toggle posts={posts} updatePost={updatePost} />
    </>
  );
};

export default Home;
