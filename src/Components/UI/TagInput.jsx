import { useState } from "react";
import PropTypes from 'prop-types'
import Icon from "./Icon";


const TagInput= ({ tools, setTools }) => {
  const [newTool, setNewTool] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') { 
      e.preventDefault();
      const trimmedTool = newTool.trim();
      if (trimmedTool && !tools.includes(trimmedTool)) {
        setTools([...tools, trimmedTool]);
        setNewTool("");
      }
    }
  };
  

  const handleRemoveTool = (index) => {
    setTools(tools.filter((_, i) => i !== index)); 
  };

  return (
    <div>
      <label htmlFor="tools" className="font-sora font-medium text-sm pl-1">Tools Used:</label>
      <div className="flex flex-wrap gap-1 bg-secondary items-center border border-line p-2 py-[.6em] rounded-lg">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center gap-1 shadow-lg bg-light border border-line p-1 px-2 pr-1 rounded-full"
          >
            <span className="text-xs">{tool}</span>
            <div
              onClick={() => handleRemoveTool(index)} 
              className="bg-lighter h-5 w-5 flex-center rounded-full cursor-pointer"
            >
              <Icon styles="text-sm">close</Icon>
            </div>
          </div>
        ))}

        <input
          type="text"
          name="tools"
          id="tools"
          placeholder="Enter tools used..."
          className="bg-transparent pl-2 text-sub font-medium placeholder:text-sub text-sm"
          value={newTool}
          onChange={(e) => setNewTool(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
              />
          </div>
          <p className="text-xs font-medium text-sub mt-1">Press &quot;Enter&quot; or &quot;Space Bar&quot; or use a Comma &quot; , &quot; (for desktop) to enter multiple tools.</p>
          
    </div>
  );
};

TagInput.propTypes = {
    tools: PropTypes.object,
    setTools: PropTypes.func
}

export default TagInput;
