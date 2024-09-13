import PropTypes from "prop-types";
import { storage } from "../../Lib/appwriteConfig";
import { Link } from "react-router-dom";
import { formatDate } from "../../Utils/dateFormat";
import Icon from "./Icon";
import useProject from "../../Hooks/useProject";

const Card = ({
  id,
  name,
  role,
  tools,
  title,
  description,
  image,
  date,
  handleDelete,
}) => {
  const imageUrl = storage.getFileView("images", image);
  const { projects } = useProject();
  return (
    <>
      <div className="relative border border-line shadow-lg rounded-2xl overflow-hidden">
        {projects?.$id === id && (
          <div
            onClick={handleDelete}
            className="absolute z-20 cursor-pointer bg-red-600 text-white right-2 top-2 h-9 w-9 flex-center rounded-lg"
          >
            <Icon styles="text-[1.3em]">delete</Icon>
          </div>
        )}
        <div className="card-image h-40 overflow-hidden border-b border-line">
          <img src={imageUrl} alt={title} className="w-full object-cover" />
        </div>
        <div className="px-2 flex flex-col gap-2 mt-2 justify-between">
          <div>
            <h3 className="text-lg font-sora font-semibold">{title}</h3>
            <p className="line-clamp-2 text-sub text-sm">{description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {tools.map((x, y) => (
              <span
                key={y}
                className="text-xs bg-lighter font-semibold px-2 py-1 rounded-full"
              >
                {x}
              </span>
            ))}
          </div>

          <div className="flex border-t border-line py-2 ms-0 mt-auto">
            <div className="flex-1">
              <p className="font-medium text-sm">
                {name}&nbsp;<span className="role">{role}</span>
              </p>
              <p className="text-xs text-sub">{formatDate(date)}</p>
            </div>
            <Link
              to={`/projects/${id}`}
              className="btn-primary px-6 rounded-lg"
            >
              <span>Preview</span>
              <Icon styles="text-[1.3em]">open_in_new</Icon>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  tools: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Card;
