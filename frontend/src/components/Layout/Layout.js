import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{props.children}</main>
      <Footer />
    </div>
  );
};
//SEO is only added in pages
//We cannot add descrp, keyword author for every thing so we add default below

Layout.defaultProps = {
  title:'Ecommerce App - Shop now',
  description:'mern stack project',
  keywords:'mern, node, mongobd',
  author:'Demoplayer',
};

export default Layout;
