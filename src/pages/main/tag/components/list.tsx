import { TagIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTag } from "../../../../api/mutations/tag";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function List({ data, refetch }: any) {
  const [,setLoading] = useState(false);
  const [tags, setTags] = useState([])

  useEffect(() => {
    setTags(data)
  }, [data])

  const invokeDeleteTag = (itemId: string) => {
    setLoading(true);
    deleteTag(itemId)
      .then((response) => {
        setLoading(false);
        toast.success(response?.message);
        setTags(tags.filter((tag: any) => tag._id !== itemId))
        refetch(); // Refresh the list
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <>
      {tags?.map((item: any) => (
        <div
          key={item._id}
          className="relative  flex items-center space-x-3 rounded-lg border border-indigo-300 bg-white px-6 py-5 shadow-sm  hover:border-indigo-400"
        >
          <div className="flex-shrink-0">
            <TagIcon className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              {/* <span className="absolute inset-0" aria-hidden="true" /> */}
              <p className="text-sm font-medium text-indigo-900">{item.name}</p>
            </div>
          </div>
          <div
            className="remove-btn cursor-pointer g-red-200 p-2 rounded-full"
            onClick={() => invokeDeleteTag(item._id)}
          >
            <TrashIcon className="h-8  w-8 text-red-500 bg-red-50 rounded-full p-2" />
          </div>
        </div>
      ))}
    </>
  );
}
