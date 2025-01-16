/* eslint-disable react/prop-types */
//import dependencies
import { useState, useEffect } from "react";

function SingleSelect({
  title,
  dataArray,
  fetchInputValue,
  defaultValue,
  showSearch,
  selectlistModal,
  setSelectlistModal,
  height,
  width,
  showLoadmore,
  loadmoreHandler,
  }) {
  const [query, setQuery] = useState("");
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    setTimezone(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className="relative w-full text-[#121212]"
      onClick={(e) => {
        e.stopPropagation();
        setSelectlistModal(true);
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-black dark:text-white">{title}</div>
        <div className="input-wrapping-div">
          <input
            className="form-input-text"
            type="text"
            value={timezone}
            placeholder={title}
          />
        </div>
      </div>
      {selectlistModal && !!width && !!height ? (
        <div
          style={{ height: `${height}px`, width: `${width}px` }}
          className={`absolute z-10 bg-zinc-200 dark:bg-[#242424] dark:text-white text-[#121212] px-5 py-5 rounded-xl overflow-y-scroll`}
        >
          {showSearch && (
            <input
              className="rounded-full text-center w-full mb-3 bg-zinc-200 p-1"
              type="text"
              placeholder="      Search here"
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <ul>
            {dataArray
              .filter((data) => {
                if (query === "") {
                  return data;
                } else if (data.toLowerCase().includes(query.toLowerCase())) {
                  return data;
                }
              })
              .map((data, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer mb-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimezone(data);
                      fetchInputValue(data);
                      setSelectlistModal(false);
                    }}
                  >
                    <div className="flex gap-3 gap-y-5 justify-start items-center">
                      {data}
                    </div>
                  </li>
                );
              })}
          </ul>
          {showLoadmore && (
            <div
              className="flex mx-auto bg-slate-500 px-3 py-1 text-white w-fit rounded-full"
              onClick={() => loadmoreHandler(true)}
            >
              <button>Load More</button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default SingleSelect;
