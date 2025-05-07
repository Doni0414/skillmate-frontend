import { useEffect } from "react";
import { useState } from "react";
import { getAdsByUserId, getCurrentUser, getPostsByUserId, getUserById, getUserReviewsByUserId, me } from "../../api";
import Router from "next/router";

export function useProfilePageState(userId) {
  const page = 0;
  const pageSize = 10000000;
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          Router.push("/not-found");
        });

      getUserReviewsByUserId(userId)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          Router.push("/not-found");
        });

      getCurrentUser()
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.log("error while fetching current user", error);
      })

      getPostsByUserId(userId, page, pageSize)
      .then(response => {
        setUser((lastUser) => ({
            ...lastUser,
            postsCount: response.data.length,
        }))
      });

      getAdsByUserId(userId)
      .then(response => {
        setUser((lastUser) => ({
            ...lastUser,
            adsCount: response.data.length,
        }))
      })
      .catch(error => {
        console.log("error while fetching ads", error);
      })
    }
  }, [userId]);

  const isOwn = currentUser && user && currentUser.id === user.id;
  return {user, reviews, currentUser, isOwn};
}