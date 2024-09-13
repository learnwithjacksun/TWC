import Prop from "prop-types";
const Grid = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
        {children}
      </div>
    </>
  );
};
Grid.propTypes = {
  children: Prop.node.isRequired,
};

export default Grid;
