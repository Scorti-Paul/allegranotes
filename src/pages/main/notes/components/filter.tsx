import { get } from "api";
import { filterNote } from "api/mutations/notes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from 'react-select'
import { customStyles } from "utils";

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

  const { data } = useQuery(["fNoteList", category, tag], () =>
    filterNote(category, tag)
  );


  useEffect(() => {
    const fetchFilteredNotes = async () => {
      try {
        setFilteredNotes(data?.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchFilteredNotes();
  }, [category, data?.data, setFilteredNotes, tag]);

  console.log(filteredNotes);

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
    </div>
  );
};

export default FilterNotes