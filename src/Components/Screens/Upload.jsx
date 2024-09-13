import { useState } from "react";
import Heading from "../UI/Heading";
import ImageInput from "../UI/ImageInput";
import Input from "../UI/Input";
import Layout from "../UI/Layout";
import TextArea from "../UI/TextArea";
import toast from "react-hot-toast";
import TagInput from "../UI/TagInput";
import Icon from "../UI/Icon";

const Upload = () => {
  const [tools, setTools] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Convert size to MB

      if (!["image/png", "image/jpeg"].includes(fileType)) {
        toast.error("Only PNG and JPG files are allowed!");
        return;
      }

      if (fileSize > 2) {
        toast.error("File size should not exceed 2MB!");
        return;
      }

      setImage(file); // Set image if validation passes
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) toast.error("Project title is required!");
    else if (!description) toast.error("Project description is required!");
    else if (!link) toast.error("Project link is required!");
    else if (!tools) toast.error("Project tools are required!");
    else if (!image) toast.error("Project image is required!");
    else {
      console.log({
        title,
        description,
        link,
        tools,
        image,
      });
      toast.success("Project added successfully!");
    }
  };

  return (
    <>
      <Layout>
        <div className="main">
          <div className="layout">
            <Heading
              title="Upload Project"
              subtitle="What have you been cooking? 💁‍♂️"
            />

            <form
              className="flex flex-col gap-4 my-6 rounded-xl"
              onSubmit={handleSubmit}
            >
              {/* Project Title */}
              <Input
                id="title"
                label="Project Title"
                type="text"
                placeholder="What's the name of the project?"
                bg_color="bg-secondary"
                value={title}
                handleChange={(e) => setTitle(e.target.value)}
              />

              {/* Project Description */}
              <TextArea
                id="description"
                label="Project Description"
                placeholder="Briefly describe your project"
                bg_color="bg-secondary"
                value={description}
                handleChange={(e) => setDescription(e.target.value)}
              />

              {/* Project Link */}
              <Input
                id="link"
                label="Project Link"
                type="text"
                placeholder="Live link or project location url"
                bg_color="bg-secondary"
                value={link}
                handleChange={(e) => setLink(e.target.value)}
              />

              {/* Tools Input */}
              <TagInput tools={tools} setTools={setTools} />

              {/* Image Input */}
              <ImageInput handleImageChange={handleImageChange}>
                <div className="border-dashed bg-secondary border-line border flex-center p-6 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Icon styles="text-sub">add_a_photo</Icon>
                    <div className="font-semibold text-sm text-sub">
                      Upload Image
                    </div>

                    {image?.name && (
                      <div className="font-semibold text-sm bg-light px-6 py-2 rounded-full border border-line mt-2">
                        {image?.name}
                      </div>
                    )}
                  </div>
                </div>
              </ImageInput>

              {/* Submit Button */}
              <button type="submit" className="btn-primary h-10 rounded-lg">
                Post
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Upload;
