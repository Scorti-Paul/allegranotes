import { FC, Suspense, useCallback, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import { get } from "../../../api";
import { MoonLoader } from "react-spinners";
import { BriefcaseIcon, CalendarIcon } from "@heroicons/react/24/solid"
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { AdjustmentsHorizontalIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ViewNote from "./components/view";
import TopLoader from "components/loaders/top";
import { toast } from "react-toastify";
import { deleteNote } from "api/mutations/notes";
import Header from "components/Header";

const Notes: FC<{}> = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [, setLoading] = useState(false);
  const [note, setNote] = useState([])
  const navigate = useNavigate();

  const { data, isFetching } = useQuery(["noteList"], () =>
    get("/notes")
  );

  useEffect(() => {
    setNote(data?.data)
  }, [data])

  const invokeDeleteNote = (itemId: string) => {
    setLoading(true);
    deleteNote(itemId)
      .then((response) => {
        setLoading(false);
        toast.success(response?.message);
        setNote(note.filter((note: any) => note._id !== itemId))
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      });
  };

  const toggleShowModal = useCallback(
    (e: React.MouseEvent, idx: number) => {
      e?.preventDefault();
      setSelected(note[idx])
      setShowModal(!showModal);
    },
    [note, showModal]
  );

  const updateNote = useCallback(
    (e: React.MouseEvent, idx: number, note: any) => {
      e?.preventDefault();
      setSelected(note[idx])
      navigate("/update-note", { state: note });
    },
    [navigate]
  );

  return (
    <>
      <div className="md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Notes"
            description="A list of all the Notes."
          >
            <div className="flex gap-4 justify-end items-center">
              <div className="transition-all ease-in-out delay-150 duration-700">
                <Link
                  to=""
                >
                  <span className="transition-all ease-in-out delay-150 duration-500 w-8 h-8 md:w-12 md:h-12 flex justify-center items-center bg-indigo-100 text-white rounded-full">
                    <AdjustmentsHorizontalIcon className="w-4 md:w-6 text-indigo-600 rounded-full" />
                  </span>
                </Link>
              </div>
              <div className="transition-all ease-in-out delay-150 duration-700">
                <Link
                  to="create-note"
                >
                  <span className="transition-all ease-in-out delay-150 duration-500 w-8 h-8 md:w-12 md:h-12 flex justify-center items-center bg-indigo-500 text-white rounded-full">
                    <PlusIcon className="w-4 md:w-6 text-white rounded-full" />
                  </span>
                </Link>
              </div>
            </div>
          </Header>


          {isFetching ? (
            <div className="h-[30rem] flex justify-center items-center">
              <MoonLoader
                color="#7961E4"
                loading={isFetching}
                size={50}
                aria-label="loading spinner"
              />
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden md:rounded-lg p-1">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {
                          note?.map((note: any, idx: any) => (
                            <div key={idx} className="border border-indigo-100 p-6 bg-white rounded-xl min-w-36">
                              <div className="mb-5 flex justify-between">
                                <BriefcaseIcon className="w-12 text-indigo-400 border-[0.005rem] border-indigo-400 p-2 rounded-2xl" />
                                <div className="flex">
                                  <EyeIcon className="w-7 p-1 text-indigo-500 hover:text-indigo-400 hover:cursor-pointer" onClick={(e) => toggleShowModal(e, idx)} />
                                  <PencilSquareIcon className="w-7 p-1 text-slate-500 hover:text-slate-400 hover:cursor-pointer" onClick={(e) => updateNote(e, idx, note)} />
                                  <TrashIcon className="w-7 p-1 text-red-400 hover:text-red-300 hover:cursor-pointer" onClick={() => invokeDeleteNote(note._id)} />
                                </div>
                              </div>
                              <h3 className="text-2xl text-[#2D3748] mb-3">{note.title}</h3>
                              <p className="text-[#6E7D94] mb-4 line-clamp-3">{note.content}</p>
                              <div className="flex gap-2 items-center">
                                <CalendarIcon className="w-6 text-indigo-400" />
                                <small className="text-indigo-900"><strong className="text-indigo-400">Joined on:</strong> {moment(note.createdAt).format("MMM DD, YYYY")}</small>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* View single note */}
      <>
        <Suspense fallback={<TopLoader />}>
          <div className="flex justify-center ml-10">
            <ViewNote show={showModal} setShow={setShowModal} selected={selected} />
          </div>
        </Suspense>
      </>
    </>
  );
};

export default Notes;
