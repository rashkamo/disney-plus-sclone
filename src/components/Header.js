import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => alert(error.message));
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" alt="homeicon" />
              <span>HOME</span>
            </a>

            <a>
              <img src="/images/search-icon.svg" alt="homeicon" />
              <span>SEARCH</span>
            </a>

            <a>
              <img src="/images/watchlist-icon.svg" alt="homeicon" />
              <span>WATCHLIST</span>
            </a>

            <a>
              <img src="/images/original-icon.svg" alt="homeicon" />
              <span>ORIGINALS</span>
            </a>

            <a>
              <img src="/images/movie-icon.svg" alt="homeicon" />
              <span>MOVIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} />
            <Dropdown>
              <span onClick={handleAuth}>Log out</span>
            </Dropdown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  width: 100%;
  background: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
`;

const Logo = styled.img`
  width: 80px;
`;
const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      padding: 5px;
      a {
        padding: 0 2px;
      }
      img {
        height: 16px;
      }
      span {
        font-size: 10px;
      }
    }

    @media (max-width: 590px) {
      span {
        font-size: 8px;
      }
      img {
        height: 10px;
      }
    }

    @media (max-width: 500px) {
      a {
        padding: 0 0px;
      }
      img {
        height: 15px;
      }
      span {
        display: none;
      }
    }
  }
`;
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
`;

const Login = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 38px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  padding: 5px;
  font-size: 15px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 45px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
