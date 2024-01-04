import React, { useEffect,useState } from "react";
import { Row, Col, Button, Input } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {followUser, getAllUsers, unfollowUser} from "../redux/actions/userActions"
import {
  CheckOutlined,
  UserAddOutlined,
  UserDeleteOutlined
} from "@ant-design/icons";

const {TextArea}= Input
const currentUser = JSON.parse(localStorage.getItem('user'))
function AllUsers() {
  const { users } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const { followLoading , unfollowLoading} = useSelector((state) => state.alertsReducer);
  const [searchKey, setSearchKey]=useState('');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [followLoading, unfollowLoading]);

  return (
    <DefaultLayout>

        <Row justify='center'>
          <Col lg={20} className="d-flex">
            <Input style={{width:'40%'}} value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}}/>
          </Col>

        </Row>
 
      <div>
        <Row  justify="center" gutter={16}>
          {users.filter(obj=>obj.username.toLowerCase().includes(searchKey.toLowerCase())).map((user) => {
           return (
             <>
               {currentUser._id !== user._id && (
                 <Col lg={5} xs={24} className="text-start">
                   <div className="bs1 p-2">
                     {user.profilePicUrl == "" ? (
                       <p className="ProfilPic2 d-flex align-items-center">
                         {user.username[0]}
                       </p>
                     ) : (
                       <img src={user.profilePicUrl} alt="" />
                     )}
                     <Link>{user.username}</Link>
                     <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                     {user.followers.find((obj) => obj == currentUser._id) ? (
                       <div className="d-flex">
                         <Button icon={<CheckOutlined />}>Following</Button>
                         <Button
                           className="ml-2"
                           onClick={() =>
                             dispatch(
                               unfollowUser({
                                 currentuserid: currentUser._id,
                                 receiveruserid: user._id,
                               })
                             )
                           }
                           icon={<UserDeleteOutlined /> }
                         >
                           unFollow
                         </Button>
                       </div>
                     ) : (
                       <Button
                         onClick={() =>
                           dispatch(
                             followUser({
                               currentuserid: currentUser._id,
                               receiveruserid: user._id,
                             })
                           )
                         }
                         icon={<UserAddOutlined />}
                       >
                         Follow
                       </Button>
                     )}
                   </div>
                 </Col>
               )}
             </>
           );
          
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AllUsers;
