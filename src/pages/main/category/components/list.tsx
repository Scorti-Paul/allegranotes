import { GiftIcon,  } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteCategory } from "api/mutations/category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function List({ data }: any) {
  const [,setLoading] = useState(false);
    const [category, setCategory] = useState([])
  
    useEffect(() => {
      setCategory(data)
    }, [data])
  
    const invokeDeleteCategory = (itemId: string) => {
      setLoading(true);
      deleteCategory(itemId)
        .then((response) => {
          setLoading(false);
          toast.success(response?.message);
          setCategory(category.filter((category: any) => category._id !== itemId))
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          setLoading(false);
        });
    };
  return (
    <>
      {category?.map((item: any) => (
        <div
          key={item._id}
          className="relative cat-card flex items-center space-x-3 rounded-lg border border-indigo-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-indigo-400"
        >
          <div className="flex-shrink-0">
            <GiftIcon className="h-10 w-10 text-indigo-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              {/* <span className="absolute inset-0" aria-hidden="true" /> */}
              <p className="text-sm font-medium text-indigo-900">{item.name}</p>
            </div>
          </div>
          <div className="remove-btn cursor-pointer" onClick={() => invokeDeleteCategory(item._id)}>
            <TrashIcon className="h-6  w-6 text-red-600 bg-red-100 rounded-full p-1" />
          </div>
        </div>
      ))}
    </>
  );
}