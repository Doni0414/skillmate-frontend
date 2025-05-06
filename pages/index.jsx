import clsx from "clsx";
import { Header } from "../components/header/header";
import { firaSans, raleway } from "../components/fonts";
import { LevelUpButton } from "../components/home/level-up-button";
import Image from "next/image";
import mainImageSrc from "../components/home/images/home-page-image.png";
import signupImageSrc from "../components/home/images/sign-up-screen.png";
import learnSkillsImageSrc from "../components/home/images/search-page-screen.png";
import shareSkillsImageSrc from "../components/home/images/create-your-ads.png";
import { FooterElement } from "../components/home/footer-element";

export default function HomePage() {
  return (
    <HomePageLayout
      header={<Header />}
      welcomeGreetingsText="Connect, Learn, and Grow Together"
      welcomeSubText="Empowering Knowledge Exchange for a Brighter Future"
      levelUpNowButton={<LevelUpButton />}
      mainImage={
        <Image src={mainImageSrc} width={539} height={471} alt="main-image" />
      }
      footerElements={[
        <FooterElement
          text="Sign up"
          image={
            <Image
              src={signupImageSrc}
              alt="sign up page"
              width={270}
              height={222}
            />
          }
        />,
        <FooterElement
          text="Learn the skills"
          image={
            <Image
              src={learnSkillsImageSrc}
              width={270}
              height={201}
              alt="learn-skills-screen"
            />
          }
        />,
        <FooterElement
          text="Share your skills"
          image={
            <Image
              src={shareSkillsImageSrc}
              width={270}
              height={201}
              alt="share-skills-screen"
            />
          }
        />,
      ]}
    />
  );
}

function HomePageLayout({
  header,
  welcomeGreetingsText,
  welcomeSubText,
  levelUpNowButton,
  mainImage,
  footerElements,
}) {
  return (
    <div
      className={clsx(
        "bg-[#E1F6FF] min-h-screen pb-[120px]",
        raleway.className,
      )}
    >
      {header}
      <div className="px-[110px] pt-[78px] flex flex-col items-center justify-center">
        <div className="font-bold text-[36px] text-black/70 mb-8">
          {welcomeGreetingsText}
        </div>
        <div className="font-medium text-[20px] mb-[59px]">
          {welcomeSubText}
        </div>
        <div className="mb-[59px]">{levelUpNowButton}</div>
        {mainImage}
        <div className="mb-[235px]">
          <div className="mb-[6px] text-black/80 font-semibold text-[25px]">
            About Us
          </div>
          <div className="w-[149px] h-[6px] bg-[#3C5AA5] rounded-[5px] mb-8"></div>
          <div
            className={clsx(
              firaSans.className,
              "text-black/70 font-semibold text-[20px]",
            )}
          >
            Everyone thinks about personal growth at least once in their life —
            whether it's learning a new profession, deepening existing
            knowledge, or simply wanting to get better at something they love.
            In a world where information evolves rapidly and skills quickly
            become outdated, it’s especially important to find a place where you
            can not only learn but grow together with others. That’s exactly
            what our platform offers — a space where people share knowledge,
            exchange experience, and find like-minded individuals. Whether
            you’re a seasoned expert, a curious beginner, or just someone eager
            to learn, you’ll always find valuable information, inspiration, and
            support here.
          </div>
        </div>
        <div className="flex w-[1065px] justify-between">{footerElements}</div>
      </div>
    </div>
  );
}
