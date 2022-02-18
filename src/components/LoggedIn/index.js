import Main from "components/Feed";
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import {
	useData,
} from "utilities/firebase.js";
import CreatePost from "components/CreatePost";
import Profile from "components/Profile";
import PostWithThreads from "components/Post/index.js";
import Navigation from "components/Navigation";

import { Container } from "@mui/material"
function getPostList(posts) {
	const listOfPost = Object.entries(posts).map(([postId, postObj]) => {
		return { ...postObj, id: postId };
	});
	return listOfPost;
}

function getUserList(users) {
	return Object.entries(users).map(([uid, userObj]) => {
		return { ...userObj, uid: uid };
	});
}
export const UserContext = React.createContext();

function LoggedIn({ user }) {
	const [postList, postListLoading, postListError] = useData(
		"/posts",
		getPostList
	);

	const [userList, userListLoading, userListError] = useData(
		"/users",
		getUserList
	);


	// console.log(postList, userList)
	if (postListLoading || userListLoading) {
		return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
	}

	return (
		<UserContext.Provider value={{
			user: user,
			postList: postList,
			userList: userList
		}}>
			<Navigation user={user} />
			<Container sx={{ marginTop: "80px" }}>
				<Routes>
					<Route exact path="/createPost" element={<CreatePost />} />
					<Route exact path="/profile" element={<Profile user={user} />} />
					<Route exact path="/profile/:userID" element={<Profile user={user} />} />
					<Route exact path="/"
						element={<Main />}
					/>
					<Route path="/createPost" element={<CreatePost />} />
					<Route path="/post/:pageId" element={<PostWithThreads />}>
					</Route>
				</Routes>
			</Container>
		</UserContext.Provider>
	)
}

export default LoggedIn;
