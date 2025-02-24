import { FC, useCallback, useEffect } from "react";
import Button from "components/Buttons/button";
import Input from "components/Inputs";
import Header from "components/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { updateNote } from "api/mutations/notes";
import { get } from "api";
import Select from 'react-select'
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {customStyles} from "../../../../utils"

const UpdateNote: FC<{}> = () => {
  type OptionType = { value: string; label: string } | null;

  const [noteData, setNoteData] = useState<any>("");
  const [, setSearchString] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<OptionType>(null);
  const [selectedTag, setSelectedTag] = useState<OptionType>(null);

  const navigate = useNavigate();

  const { state } = useLocation();

  const handleChange = (e: any) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const { data: categoryData, isFetching: isFetchingCategory } = useQuery(
    ["category"],
    () => get("/categories")
  );

  const { data: tagData, isFetching: isFetchingTag } = useQuery(
    ["tag"],
    () => get("/tags")
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: any) => {
      return updateNote(state?._id, { ...body });
    },
    onError: (e) => {
      toast?.error("There was an error");
    },
    onSuccess: () => {
      toast?.success("Note updated successfully");
      navigate("/notes");
    },
  });

  const handleSubmission = useCallback(
    (e: any) => {
      //
      e?.preventDefault();

      if (noteData.title === undefined) {
        return toast?.error("Title can't be empty");
      }

      if (noteData?.content === 1) {
        return toast?.error("Content much be provided");
      }

      mutateAsync({
        ...noteData,
        category: selectedCategory?.value,
        tag: selectedTag?.value,
      })
        ?.then(() => {
          toast?.success("Note updated successfully");
          setNoteData("");
          return navigate("/notes");
        })
        ?.catch((e) => {
          return toast?.warning(e?.message);
        });
    },
    [mutateAsync, navigate, noteData, selectedCategory, selectedTag]
  );

  const initialCheck = useCallback(() => {
    if (state) {
      setNoteData({
        title: state?.title,
        category: state?.category,
        tag: state?.tag,
        content: state?.content
      });
    }
  }, [state]);

  useEffect(() => {
    initialCheck();
  }, [initialCheck]);

  // Populate the default category & tag when noteData is available
useEffect(() => {
  if (noteData?.category) {
    setSelectedCategory({
      value: noteData.category._id,
      label: noteData.category.name,
    });
  }

  if (noteData?.tag) {
    setSelectedTag({
      value: noteData.tag._id,
      label: noteData.tag.name,
    });
  }
}, [noteData]);

 
  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Update Note"
            description="Make your necessary changes to update note."
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
                        <label htmlFor="category" className="block text-sm font-medium text-[#222] mb-1.5">
                          Category
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingCategory}
                          isClearable={true}
                          isSearchable={true}
                          value={selectedCategory}
                          onChange={(e: any) => setSelectedCategory(e)}
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
                        <label htmlFor="tag" className="block text-sm font-medium text-[#222] mb-1.5">
                          Tag
                        </label>
                        <Select
                          onInputChange={(e) => setSearchString(e)}
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={isFetchingTag}
                          isClearable={true}
                          isSearchable={true}
                          value={selectedTag}
                          onChange={(e: any) => setSelectedTag(e)}
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
                      <div className="w-40 mt-5">
                        <Button
                          type="primary-btn"
                          path=""
                          loading={isLoading}
                          hasIcon={true}
                          Icon={<CheckCircleIcon className="w-6" />}
                          onClick={handleSubmission}
                          text={"Update Note"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
export default UpdateNote;