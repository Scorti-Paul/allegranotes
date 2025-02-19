import { FC, useCallback } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
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
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

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
      // status: "Active",
    })
      ?.then(() => {
        setNoteData("");
      })
      ?.catch((e) => {
        toast?.warning(e?.message);
      })
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
              Icon={<EyeIcon className="w-4" />}
              text={"Notes"}
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
                  <div className="bg-white md:px-16 md:py-12 sm:p-6 sm:block rounded-3xl">
                    <div className="w-full grid grid-cols-6 gap-6">
                      <div className='col-span-3 mt-1'>
                        <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                          options={categoryData?.data?.map((item: any) => {
                            return {
                              value: item._id,
                              label: item?.name,
                            };
                          })}
                        />
                      </div>
                          
                      <div className='col-span-3 mt-1'>
                        <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                          Icon={<ArrowDownOnSquareIcon className="w-6" />}
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