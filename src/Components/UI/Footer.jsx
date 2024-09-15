const Footer = () => {
  return (
    <>
      <div className="main py-6">
        <p className="text-center font-medium text-sub text-sm">
          Created with 😒 by{" "}
          <a
            href="https://github.com/learnwithjacksun/TWC"
            target="_blank"
            className="text-main"
          >
            Gift Jacksun <i className="fa-brands fa-github"></i>
          </a>
          , &copy; {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
};

export default Footer;
