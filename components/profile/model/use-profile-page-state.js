import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser, getPostsByUserId, getUserById, getUserReviewsByUserId, me } from "../../api";
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
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      getPostsByUserId(userId, page, pageSize)
      .then(response => {
        setUser((lastUser) => ({
            ...lastUser,
            postsCount: response.data.length,
            adsCount: 0
        }))
      });
    }
  }, [user]);

  return {user, reviews, currentUser};
}