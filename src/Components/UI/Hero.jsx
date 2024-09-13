import { Link } from "react-router-dom";
import Icon from "./Icon";

const Hero = () => {
  return (
    <>
      <div className="main">
        <div className="layout line pb-8 md:min-h-[400px] flex-center">
          <div className="flex flex-col gap-6 items-center">
            <div className="text-center">
              <span className="bg-secondary text-sub py-1 px-4 rounded-full text-sm font-semibold">
                60 days of Tech 🚀
              </span>
              <h1 className="text-5xl md:text-6xl font-sora font-extrabold mt-4">
                Tech Watch{" "}
                <span className="font-sora gradient-text">Community</span>
              </h1>
              <p className="text-sm mt-4 text-sub">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
                necessitatibus corporis! Ullam ipsum molestias minima
                consectetur officiis explicabo.
              </p>
            </div>

            <div className="flex-center flex-col-reverse md:flex-row gap-4">
              <Link
                to=""
                className="btn bg-lighter px-8 h-12 w-[250px] md:w-auto rounded-full"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i>
                <span>WhatsApp</span>
              </Link>

              <Link
                to="/upload"
                className="btn-primary px-8 h-12 w-[250px] md:w-auto rounded-full"
              >
                <Icon>add</Icon>
                <span>Add Project</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
