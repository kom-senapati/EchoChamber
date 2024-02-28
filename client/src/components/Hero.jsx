import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Hero() {
  const features = [
    {
      name: "Room Creation",
      description:
        "Customize chat spaces easily, fostering collaboration and engagement in EchoChamber.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "Join Rooms",
      description:
        "Instantly connect, foster meaningful interactions within diverse communities of EchoChamber.",
      icon: LockClosedIcon,
    },
    {
      name: "Real-Time Conversations",
      description:
        "Engage instantly, ensuring seamless communication within EchoChamber's vibrant community.",
      icon: ArrowPathIcon,
    },
    {
      name: "Emoji Integration",
      description:
        "Express emotions, enriching conversations within EchoChamber's dynamic environment",
      icon: FingerPrintIcon,
    },
  ];
  const people = [
    {
      name: "K Om Senapati",
      link: "https://github.com/kom-senapati",
      role: "Co-Founder / CEO",
      imageUrl: "https://avatars.githubusercontent.com/u/92045934?v=4",
    },
    {
      name: "Irfan Shaikh",
      link: "https://github.com/IrfanshaikH-7",
      role: "Junior Software Engineer",
      imageUrl: "https://avatars.githubusercontent.com/u/124655192?v=4",
    },
    {
      name: "Sagar Singh",
      link: "https://github.com/SAGARSINGH-1",
      role: "Design Engineer",
      imageUrl: "https://avatars.githubusercontent.com/u/81561733?v=4",
    },
    {
      name: "Girish Bari",
      link: "https://github.com/Girishbari",
      role: "Senior Software Engineer",
      imageUrl: "https://avatars.githubusercontent.com/u/38005544?v=4",
    },
  ];

  return (
    <div className="">
      {/* NavBar */}
      {/* <div className="navbar flex justify-between bg-base-100 my-2 z-20">
        <div className="flex">
          <a className="font-bold pl-4 text-xl">
            Echo<span className="text-accent">Wizards</span>
          </a>
        </div>
        <div className="flex">
          <ul className="flex gap-10 w-full">
            <li className="cursor-pointer hover:text-accent">Team</li>
            <li className="cursor-pointer hover:text-accent">Features</li>
            <li className="cursor-pointer hover:text-accent">Features</li>
            <li className="cursor-pointer hover:text-accent">Features</li>
            <li className="cursor-pointer hover:text-accent">Features</li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control mr-2">
            <label className="cursor-pointer grid place-items-center">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
            >
              <li>
                <a className="justify-between hover:text-accent">
                  Login
                  <spna className="badge bg-base-300">Already a User</spna>
                </a>
              </li>
              <li className="hover:text-accent z-20">
                <a>Register</a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="navbar bg-base-100 px-5">
        <div className="flex-1 text-xl">
          Echo<span className="text-accent">Chamber</span>
        </div>
        <div className="flex-none space-x-2">
          <button className="btn btn-accent btn-sm hidden md:block">
            <Link to="/register">Register</Link>
          </button>
          <button className="btn btn-accent btn-sm">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>

      {/* Section 01 */}

      <div className="flex justify-between items-center mt-12">
        <div className="relative mt-[-50px] mx-auto max-w-7xl px-5 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight sm:text-6xl">
              Echo<span className="text-accent">Chamber</span>: Where
              Conversations Come Alive!
            </h1>
            <p className="mt-4 text-xl text-content">
              Dive into EchoChamber now! Create or join rooms, chat in
              real-time, express with emojis. Experience dynamic conversations
              in an immersive environment. Join the conversation today!
            </p>
            <Link
              to={"/register"}
              className="my-5 px-7 btn hover:text-base-content text-primary-content bg-accent"
            >
              Get Started
            </Link>
          </div>
          <div></div>
        </div>
        {/* <div className="w-"></div> */}
        <div className="mockup-phone border-primary z-0 hidden md:block">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1">Hello</div>
          </div>
        </div>
      </div>

      {/* Section 02 */}

      <div className="bg-base-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 ">
              Explore Our Amazing Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Empowering Chats, Connecting People.
            </p>
            <p className="mt-6 text-lg leading-8 text-content">
              Discover EchoChamber's rich features: room creation, seamless
              joining, real-time chat, and expressive emojis for vibrant
              conversations.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 ">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <feature.icon
                        className="h-6 w-6 text-accent-content"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-content">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Section 02 */}

      <div className="bg-base-100 md:px-32 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 ">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              Meet Echo<span className="text-accent">Wizards</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-content ">
              A diverse team crafting EchoChamber's magic. Led by our CEO, we
              innovate, design, and engineer unforgettable experiences.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <Link to={person.link}>
                      <h3 className="text-base font-semibold leading-7 tracking-tight hover:underline">
                        {person.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-semibold leading-6 text-accent">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}

      <footer className="footer p-10 bg-base-200 text-neutral-content">
        <aside>
          <div className="flex">
            <a className="font-bold text-xl">
              Echo<span className="text-accent">Chamber</span>
            </a>
          </div>
          <p>
            🔮 Echo.io Pvt Ltd
            <br />
            Crafting magic, innovating unforgettable experiences.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to={"https://github.com/kom-senapati/EchoChamber"}>
              <FaGithub size={25} className="hover:text-accent" />
            </Link>
            <Link to={"https://twitter.com/kom_senapati"}>
              <FaXTwitter size={25} className="hover:text-accent" />
            </Link>
          </div>
        </nav>
      </footer>

      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p className="text-lg">
            Build with 💖 by Echo<span className="text-accent">Wizards</span>
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Hero;
