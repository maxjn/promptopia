"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [navToggle, setNavToggle] = useState(false);

  // Getting Providers
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
          alt="Logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden  gap-3 md:gap-5  ">
        {session?.user ? (
          <>
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut} type="button">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={44}
                height={44}
                className="rounded-full"
                alt="profile"
              />{" "}
            </Link>
          </>
        ) : (
          <>
            {/* Sign In Button */}
            <button type="button" className="black_btn">
              Sign In
            </button>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="signin_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <Image
                    src={`/assets/images/${provider.id}.svg`}
                    width={25}
                    height={25}
                    alt={provider.name}
                  />
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden relative gap-2 justify-center items-stretch">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={44}
              height={44}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setNavToggle((prev) => !prev);
              }}
            />

            {navToggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_Link"
                  onClick={() => setNavToggle(false)}
                >
                  {" "}
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_Link"
                  onClick={() => setNavToggle(false)}
                >
                  {" "}
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="w-full mt-5 black_btn"
                  onClick={() => {
                    setNavToggle(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Sign In Button */}
            <button type="button" className="black_btn">
              Sign In
            </button>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="signin_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <Image
                    src={`/assets/images/${provider.id}.svg`}
                    width={25}
                    height={25}
                    alt={provider.name}
                  />
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
