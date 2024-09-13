import Prop from "prop-types";

const Heading = ({ title = "Title", subtitle }) => {
  return (
    <>
      <div className="text-center">
        <h1 className="gradient-text font-bold font-sora text-xl">{title}</h1>
        <p className="text-sub text-sm">{subtitle}</p>
      </div>
    </>
  );
};

Heading.propTypes = {
  title: Prop.string.isRequired,
  subtitle: Prop.string,
};

export default Heading;
