import { get, post } from "api";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Select from 'react-select'

const FilterNotes = ({ category, setCategory, tag, setTag, filteredNotes, setFilteredNotes }: any) => {
  const [, setSearchString] = useState<string>("");
  
  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["category"],
    () => get("/categories")
  );

  const { data: tagData, isFetching: isFetchingTag } = useQuery(
    ["tag"],
    () => get("/tags")
  );

  const { mutateAsync } = useMutation(["filterData"], async () => {
    return await post("notes/filter", {
      body: {
        category: category || undefined,
        tag: tag || undefined,
      },
    });
  });

  useEffect(() => {
    const fetchFilteredNotes = async () => {
      try {
        const res = await mutateAsync();
        console.log(res)
        setFilteredNotes(res);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchFilteredNotes();
  }, [category, mutateAsync, setFilteredNotes, tag]);

console.log("filteredNotes: " + filteredNotes);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? "2px solid #6366F1" : "1px solid #DBD3FF",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 5px rgba(99, 102, 241, 0.5)" : "none",
      "&:hover": {
        borderColor: "#6366F1",
      },
      padding: "6px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#7B70AF",
      fontStyle: "italic",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#6366F1" : state.isFocused ? "#E0E7FF" : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#7B70AF",
      padding: "10px",
      cursor: "pointer",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#4F46E5", // Indigo
    }),
  };

  return (
    <div className="flex justify-end items-center">
        
        <div className="w-full sm:flex justify-end items-end gap-6">
          <div className='col-span-2  md:col-span-1 mt-1'>
            <Select
              onInputChange={(e) => setSearchString(e)}
              className="basic-single"
              classNamePrefix="select"
              isLoading={isFetchingCategory}
              isClearable={true}
              isSearchable={true}
              onChange={(e: any) => setCategory(e?.value)}
              isMulti={false}
              name="category"
              styles={customStyles}
              placeholder="Select Category..."
              options={categoryData?.data?.map((item: any) => {
                return {
                  value: item._id,
                  label: item?.name,
                };
              })}
            />
          </div>

          <div className='col-span-6  md:col-span-1 mt-1'>
            <Select
              onInputChange={(e) => setSearchString(e)}
              className="basic-single"
              classNamePrefix="select"
              isLoading={isFetchingTag}
              isClearable={true}
              isSearchable={true}
              onChange={(e: any) => setTag(e?.value)}
              isMulti={false}
              name="tag"
              placeholder="Select Tag..."
              styles={customStyles}
              options={tagData?.data?.map((item: any) => {
                return {
                  value: item._id,
                  label: item?.name,
                };
              })}
            />
          </div>
      </div>
      {/* <button
        className="border rounded-lg flex items-center gap-3 bg-indigo-500 text-white ml-6 px-4 py-3"
      >
        <span>Apply</span>
        {isLoading ? (
          <MoonLoader color="#fff" size={20} />
        ) : (
          <FolderArrowDownIcon className="w-4 text-white" />
        )}
      </button> */}
    </div>
  );
};

export default FilterNotes