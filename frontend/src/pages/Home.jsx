import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { Col,  Row} from "antd";

function Home() {
  const { users } = useSelector((state) => state.usersReducer)
  const { posts } = useSelector((state) => state.postsReducer);
  return (
    <div>
      <DefaultLayout>
       <Row justify="center">
  
        <Col lg={12} xs= {24}>
          {posts.map(post=>{
            return <Post post={post} />;
          }
            
            )}
        </Col>
       </Row>
      </DefaultLayout>
    </div>
  );
}

export default Home;
