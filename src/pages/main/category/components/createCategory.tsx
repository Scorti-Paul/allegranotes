import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { createCategory } from "../../../../api/mutations/category";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonLoader from "components/loaders/buttonloader";

type Inputs = {
  name: string;
};
export default function CreateCategory({
  selected,
  show,
  setShow,
  refetch,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);

  const invokeCreateCategory: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    createCategory({ ...data })
      ?.then((response) => {
        setLoading(false);
        setShow(false);
        refetch();
        reset();
        toast?.success(response?.data?.message);
      })
      ?.catch((response) => {
        toast?.error(response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <Modal
      show={show}
      setShow={setShow}
      modalTitle="Create Category"
      modalDesc="Create new category to list with notes"
      size={2}
    >
      <div className="flex h-full mt-5">
        <div className="flex min-w-0 flex-1 flex-col ">
          <div className="relative z-0 flex flex-1 ">
            <form
              onSubmit={handleSubmit(invokeCreateCategory)}
              className="relative w-full lg:w-[30vw] z-0 flex-1  focus:outline-none xl:order-last"
            >
              {/* Breadcrumb */}
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter category name"
                className={` ${
                  errors?.name
                    ? "focus:border-rose-500 focus:ring-rose-500"
                    : "focus:border-indigo-500 focus:ring-indigo-500"
                } mt-2 block w-full text-black rounded-md border-gray-300 shadow-sm py-3 placeholder:text-gray-400  sm:text-sm`}
                type="text"
              />
              {errors?.name && (
                <span
                  data-testid={"nameError"}
                  className="ml-1 bg-transparent text-xs font-medium text-red-500 "
                >
                  Category name is required
                </span>
              )}
              <div className=" pt-4 flex flex-row-reverse mt-2">
                <button
                  type="submit"
                  className="text-white flex items-center gap-2 bg-indigo-600 px-4 py-3 rounded-lg"
                >
                  <span>Submit</span>
                  {loading ? (
                    <ButtonLoader />
                  ) : (
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}