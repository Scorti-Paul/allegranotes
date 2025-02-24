import { XCircleIcon } from "@heroicons/react/24/outline";
import { get } from "api";
import { filterNote } from "api/mutations/notes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from 'react-select'
import { toast } from "react-toastify";
import { customStyles } from "utils";

const FilterNotes = ({ category, setCategory, tag, setTag, filteredNotes, setFilteredNotes, note }: any) => {
  const [, setSearchString] = useState<string>("");

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["category"],
    () => get("/categories")
  );

  const { data: tagData, isFetching: isFetchingTag } = useQuery(
    ["tag"],
    () => get("/tags")
  );

  const { data } = useQuery(["filterNoteList", category, tag], () =>
    filterNote(category, tag)
  );

  useEffect(() => {
    const fetchFilteredNotes = async () => {
      try {
        if (category || tag) {
          setFilteredNotes(data?.data);
        } else {
          setFilteredNotes(note);
        }
      } catch (error) {
        toast.error("Error fetching notes. Clear options and try again");
      }
    };

    fetchFilteredNotes();
  }, [category, data?.data, note, setFilteredNotes, tag]);

  const handleClear = (e: any) => {
    e.preventDefault()
    setCategory(null)
    setTag(null)
  }

  return (
    <div className="flex justify-end items-center transition-all duration-500 delay-200 ease-in-out">
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

        <div className='col-span-2 md:col-span-1 mt-1'>
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
          <div className="pt-4 flex flex-row-reverse mt-2" onClick={(e) => handleClear(e)}>
            <button
              type="submit"
              className=" flex items-center gap-2 text-indigo-400 hover:text-indigo-500 transition-all duration-300 delay-200 ease-in-out px-4 py-3 rounded-lg"
            >
              <span>Clear</span>
              <XCircleIcon className="h-5 w-5 text-indigo-400" />
            </button>
          </div>
      </div>
    </div>
  );
};

export default FilterNotes