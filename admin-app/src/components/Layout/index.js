import React from "react";
import { Header } from '../Header/index'


export const Layout = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
