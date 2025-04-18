import { useEffect, useState } from "react";
import apiClient from "../components/api-client";
import { Header } from "../components/header/header";
import Router from "next/router";
import { withAuth } from "../components/auth";

function MyRequestsPage() {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    apiClient
      .get("/users/profile")
      .then((response) => {
        setUser(response.data);
        return apiClient
          .get("/ads/exchange-requests/received")
          .then((response) => {
            setRequests(response.data);
          })
          .catch((error) => {
            console.log("Error while obtaining exchange requests", error);
          });
      })
      .catch((error) => {
        console.log("Error while obtaining user", error);
      });
  }, []);

  return (
    <div>
      <Header />
      {requests.map((request, index) => (
        <ExchangeRequest request={request} key={index} />
      ))}
    </div>
  );
}

function ExchangeRequest({ request }) {
  const [requester, setRequester] = useState({});

  const sendAcceptOrDecline = (status) => {
    apiClient
      .patch("/ads/exchange-requests/" + request.id + "?status=" + status)
      .then((response) => {
        Router.push("/chat");
      })
      .catch((error) => {
        console.log("error while sending accept request", error);
      });
  };

  useEffect(() => {
    apiClient
      .get("/users/profile/" + request.requesterId)
      .then((response) => {
        setRequester(response.data);
      })
      .catch((error) => {
        console.log("Error while obtaining requester", error);
      });
  }, []);

  return (
    <div className="flex gap-10">
      <div className="font-medium text-2xl">{requester.fullName}</div>
      <button onClick={() => sendAcceptOrDecline("ACCEPTED")}>Accept</button>
      <button onClick={() => sendAcceptOrDecline("DECLINED")}>Decline</button>
    </div>
  );
}

export default withAuth(MyRequestsPage, apiClient);
