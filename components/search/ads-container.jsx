import clsx from "clsx";
import Image from "next/image";
import { inter } from "./search-page-content";
import { Fira_Sans, Roboto } from "next/font/google";
import { Modal } from "../common/modal";
import { useEffect, useState } from "react";
import apiClient from "../api-client";
import { SuccessMessage } from "../common/success-message";
import { FailureMessage } from "../common/failure-message";
import { FormTextArea } from "../common/form-text-area";
import { getResourceURLById } from "../api";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export function AdsContainer({ className, ads }) {
  return (
    <div className={clsx(roboto.className)}>
      <div className="mb-[38px] font-medium text-[19px]">
        {ads.length} results found
      </div>
      <div
        className={clsx(
          className,
          "grid grid-cols-2 gap-x-[141px] gap-y-[89px]",
        )}
      >
        {ads.map((ad, index) => (
          <AdContainer
            adId={ad.id}
            skillName={ad.skillName}
            userId={ad.userId}
            level={ad.level}
            description={ad.description}
            adImageSrc={getResourceURLById(ad.imageResourceId)}
          />
        ))}
      </div>
    </div>
  );
}

function AdContainer({
  adId,
  skillName,
  userId,
  level,
  description,
  adImageSrc,
}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    apiClient
      .get(`/users/profile/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Error while obtaining user by id in search page", error);
      });
  }, [userId]);
  const [isViewDetailsPopupOpen, setIsViewDetailsPopupOpen] = useState(false);
  const handleClickOnViewDetails = () => {
    setIsViewDetailsPopupOpen(true);
  };
  const closeViewDetailsPopup = () => {
    setIsViewDetailsPopupOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 100%), url(${adImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={clsx(
        "w-[437px] h-[253px] rounded-[13px] shadow-2xl flex justify-center items-end",
      )}
    >
      <Modal isOpen={isViewDetailsPopupOpen} onClose={closeViewDetailsPopup}>
        <AdPopup
          adId={adId}
          skillName={skillName}
          user={user}
          level={level}
          description={description}
          adImageSrc={adImageSrc}
        />
      </Modal>
      <div className="flex w-[400px] justify-between items-end mb-2">
        <div className="max-w-[220px]">
          <div
            className={clsx(
              inter.className,
              "font-bold text-[29px] text-white",
            )}
          >
            {skillName}
          </div>
          <div className="flex items-center gap-x-[10px]">
            <Image
              src={getResourceURLById(user.imageResourceId)}
              width={30}
              height={30}
              className="w-[30px] h-[30px] rounded-full object-fit"
            />
            <div className="w-[170px] text-ellipsis overflow-hidden whitespace-nowrap text-[24px] text-white">
              {user.fullName}
            </div>
          </div>
          <div className={clsx(roboto.className, "text-[24px] text-[#E5E5E5]")}>
            {level}
          </div>
        </div>
        <button
          onClick={handleClickOnViewDetails}
          className={clsx(
            roboto.className,
            "border-4 border-white rounded-[8px] px-5 py-2 text-[24px] font-bold text-white cursor-pointer",
          )}
        >
          More details
        </button>
      </div>
    </div>
  );
}

function AdPopup({ adId, skillName, user, level, description, adImageSrc }) {
  const [showProposeExchangePopup, setShowProposeExchangePopup] =
    useState(false);

  const handleClickOnProposeExchangeButton = (e) => {
    setShowProposeExchangePopup(true);
  };

  const closeProposeExchangePopup = () => {
    setShowProposeExchangePopup(false);
  };

  return (
    <div className="w-[716px] pt-[50px] pb-[23px] border-4 border-[#3C5AA5] rounded-[20px] bg-white">
      <Modal
        isOpen={showProposeExchangePopup}
        onClose={closeProposeExchangePopup}
      >
        <ProposeExchangePopup
          adId={adId}
          closeProposeExchangePopup={closeProposeExchangePopup}
        />
      </Modal>
      <div className="mb-[24px] flex justify-between items-center px-[25px] py-3 bg-[#3C5AA5]">
        <div className="text-white space-y-[15px]">
          <div className="font-medium text-[32px]">{skillName}</div>
          <div className={clsx(roboto.className, "text-[24px]")}>
            {user.country} | {user.city}
          </div>
        </div>
        <Image
          src={adImageSrc}
          width={90}
          height={90}
          className="ml-auto w-[90px] h-[90px] rounded-full object-cover"
        />
      </div>
      <div className="px-10">
        <div className="flex items-center gap-[10px]">
          <Image
            src={getResourceURLById(user.imageResourceId)}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className={clsx(roboto.className, "text-[24px]")}>
            {user.fullName}
          </div>
        </div>
        <div className="ml-10 w-auto text-[25px] leading-[1.2]">
          {description}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleClickOnProposeExchangeButton}
          className="mr-6 px-8 py-2 border-4 border-black/90 rounded-[8px] text-black cursor-pointer"
        >
          Propose exchange
        </button>
      </div>
    </div>
  );
}

function ProposeExchangePopup({ adId, closeProposeExchangePopup }) {
  const [successfulMessage, setSuccessfulMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [proposeMessage, setProposeMessage] = useState("");

  const handleProposeMessageOnChange = (newValue) => {
    setProposeMessage(newValue);
  };

  const handleClickSendExchangeButton = (e) => {
    apiClient
      .post("/ads/exchange-requests", {
        adId: adId,
        message: proposeMessage,
      })
      .then((response) => {
        setSuccessfulMessage("Request successfully sent!");

        setTimeout(() => {
          setSuccessfulMessage(null);
        }, 3000);

        setTimeout(() => {
          closeProposeExchangePopup();
        }, 500);
      })
      .catch((error) => {
        if (
          error.response.data.errorMessage.startsWith(
            "Exchange request with user id",
          )
        ) {
          setFailureMessage(
            "You have already sent exchange request to this ad!",
          );

          setTimeout(() => {
            setFailureMessage(null);
          }, 3000);
        } else if (
          error.response.data.errorMessage.includes(
            "can't request exchange for own ad with id",
          )
        ) {
          setFailureMessage("You can't request exchange for own ad");

          setTimeout(() => {
            setFailureMessage(null);
          }, 3000);
        } else {
          console.log("Error while sending exhange request", error);
        }
      });
  };
  return (
    <div className="px-[66px] py-[50px] border-4 border-[#FFC107] rounded-[20px] bg-white">
      <SuccessMessage
        showMessage={successfulMessage}
        successMessage={successfulMessage}
      />
      <FailureMessage
        showMessage={failureMessage}
        failureMessage={failureMessage}
      />
      <div
        className={clsx(
          "text-black/70 font-semibold text-[26px] w-fit mx-auto mb-10",
          firaSans.className,
        )}
      >
        Propose exchange
      </div>
      <FormTextArea
        className="block mb-10 w-[609px] h-[130px] pl-[12px] pt-[17px] bg-[#F9F9F9] text-black/70 text-[15px] border border-black/10 rounded-[7px] focus:outline-none resize-none"
        placeholder="Write your message to ad creator"
        onChange={handleProposeMessageOnChange}
      />
      <div className="flex justify-end">
        <button
          onClick={handleClickSendExchangeButton}
          className={clsx(
            "px-9 py-3 bg-[#4182F9] rounded-[30px] cursor-pointer text-[20px] text-white font-medium",
          )}
        >
          Send
        </button>
      </div>
    </div>
  );
}
