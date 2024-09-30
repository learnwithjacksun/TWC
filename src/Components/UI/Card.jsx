import PropTypes from "prop-types";
import { storage } from "../../Lib/appwriteConfig";
import { formatDate } from "../../Utils/dateFormat";
import Icon from "./Icon";
import useAuth from "../../Hooks/useAuth";

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
  userid,
  previewProject,
}) => {
  const imageUrl = storage.getFileView("images", image);
  const { user } = useAuth();

  return (
    <div
   data-aos="fade-up"
                      data-aos-delay="200"
      className="relative border border-line shadow-lg rounded-2xl overflow-hidden"
    >
      {user?.$id === userid && (
        <div
          onClick={() => handleDelete(id, image)}
          className="absolute cursor-pointer bg-red-600 text-white right-2 top-2 h-9 w-9 flex-center rounded-lg"
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
            <p className="font-medium text-sm mb-1">
              {name}&nbsp;<span className="role">{role}</span>
            </p>
            <p className="text-xs text-sub">{formatDate(date)}</p>
          </div>
          <button
            onClick={previewProject}
            className="btn-primary px-6 rounded-lg"
          >
            <span>Preview</span>
            <Icon styles="text-[1.3em]">open_in_new</Icon>
          </button>
        </div>
      </div>
    </div>
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
  userid: PropTypes.string.isRequired,
  previewProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

export default Card;
