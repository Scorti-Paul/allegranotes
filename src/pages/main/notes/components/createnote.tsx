import { FC, useCallback } from "react";
import Button from "components/Buttons/button";
import Input from "components/Inputs";
import Header from "components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { createNote } from "api/mutations/notes";
import { get } from "api";
import Select from 'react-select'
import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const CreateNote: FC<{}> = () => {
  const [noteData, setNoteData] = useState<any>("");
  const [, setSearchString] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const navigate = useNavigate();

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["category"],
    () => get("/categories")
  );

  const { data: tagData, isFetching: isFetchingTag } = useQuery(
    ["tag"],
    () => get("/tags")
  );

  const handleChange = useCallback(
    (e: any) => {
      setNoteData({
        ...noteData,
        [e.target.name]: e.target.value,
      });
    },
    [noteData]
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return createNote(body);
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Note created successfully");
      navigate("/notes");
    },
  });

  const handleSubmission = (e: any) => {
    //
    e?.preventDefault();

    if (noteData.title === undefined) {
      return toast?.error("Title must be provider");
    }

    if (noteData.content === undefined) {
      return toast?.error('Specify the content')
    }

    mutateAsync({
      ...noteData,
      category: selectedCategory,
      tag: selectedTag,
    })
      ?.then(() => {
        setNoteData("");
      })
      ?.catch((e) => {
        toast?.warning(e?.message);
      })
  };

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
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Create Note"
            description="Fill out the details to create new note."
          >
            <Button
              Icon={<ChevronLeftIcon className="w-4" />}
              text={"Back"}
              type={"secondary-link"}
              path={"/notes"}
              onClick={() => null}
              hasIcon={true}
            />


          </Header>

          <div className="">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmission}>
                <div className="overflow-hidden">
                  <div className="bg-white md:px-16 md:py-12 p-6 sm:block rounded-md md:rounded-2xl">
                    <div className="w-full grid grid-cols-6 gap-6">
                      <div className='col-span-6  md:col-span-3 mt-1'>
                        <label htmlFor="category" className="block text-base text-[#7B70AF] mb-1.5">
                          Category
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingCategory}
                          isClearable={true}
                          isSearchable={true}
                          onChange={(e: any) => setSelectedCategory(e?.value)}
                          isMulti={false}
                          name="category"
                          styles={customStyles}
                          options={categoryData?.data?.map((item: any) => {
                            return {
                              value: item._id,
                              label: item?.name,
                            };
                          })}
                        />
                      </div>
                          
                      <div className='col-span-6  md:col-span-3 mt-1'>
                        <label htmlFor="tag" className="block text-base text-[#7B70AF] mb-1.5">
                          Tag
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingTag}
                          isClearable={true}
                          isSearchable={true}
                          onChange={(e: any) => setSelectedTag(e?.value)}
                          isMulti={false}
                          name="tag"
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

                    <div className="w-full grid grid-cols-6 gap-6 mt-8">
                      <Input
                        label="Title"
                        name="title"
                        inputLength="large"
                        placeholder="eg. Note Title"
                        value={noteData["title"] || ""}
                        onChange={handleChange}
                        optionalLabel={true}
                        hasShowPassword="disable"
                        type="text"
                        field="input"
                        autoComplete="true"
                      />
                    </div>
                    
                    <div className="w-full grid grid-cols-6 gap-6 mt-8">
                      <Input
                        label="Content"
                        name="content"
                        inputLength="large"
                        placeholder="Write notes here"
                        value={noteData["content"] || ""}
                        onChange={handleChange}
                        type=""
                        field="textarea"
                        autoComplete="true"
                      />

                    </div>
                    <div className="w-full flex justify-end">
                      <div className="w-36 mt-5">

                        <Button
                          type="primary-btn"
                          path=""
                          loading={isLoading}
                          hasIcon={true}
                          Icon={<ArrowUpTrayIcon className="w-6" />}
                          onClick={handleSubmission}
                          text={"Save Note"}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <DoubleButton
                    loading={isLoading || loading}
                    buttonText="Save note"
                    onClick={handleSubmission}
                  /> */}
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
export default CreateNote;