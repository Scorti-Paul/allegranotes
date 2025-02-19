import { FC, useState } from "react";
import { FunnelIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Modal from "../../../components/Modal";
import { useQuery } from "react-query";
import { get } from "../../../api";
import { MoonLoader } from "react-spinners";
import { BriefcaseIcon, CalendarIcon } from "@heroicons/react/24/solid"
import moment from "moment";
import { Link } from "react-router-dom";

const Notes: FC<{}> = () => {
  const [showView, setShowView] = useState(false);

  const { data, isFetching } = useQuery(["noteList"], () =>
    get("/notes")
  );

  console.log(data)

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* <Header title="Notes" description="A list of all the notes.">
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add produce"}
              type={"primary-link"}
              path={"create-note"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header> */}

          <div className="flex gap-4 justify-end items-center">
            <div className="transition-all ease-in-out delay-150 duration-700">
              <Link
                to="create-note"
              >
                <span>
                  <FunnelIcon className="transition-all ease-in-out delay-150 duration-700 w-14 p-4 hover:bg-indigo-400 text-indigo-600 rounded-full" />
                  {/* <PlusCircleIcon className="transition-all ease-in-out delay-150 duration-700 w-16 hover:bg-indigo-400 text-indigo-600 rounded-full" /> */}
                </span>
              </Link>
            </div>
            <div className="transition-all ease-in-out delay-150 duration-700">
              <Link
                to="create-note"
              >
                <span>
                  <PlusCircleIcon className="transition-all ease-in-out delay-150 duration-700 w-16 hover:bg-indigo-400 text-indigo-600 rounded-full" />
                </span>
              </Link>
            </div>
          </div>
          {isFetching ? (
            <div className="h-[30rem] flex justify-center items-center">
              <MoonLoader
                color="#22C55E"
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
                      <div className="sm:grid sm:grid-cols-3 md:grid-ro md:mb-5 gap-6">

                        {
                          data?.data?.map((note: any, idx: any) => (
                            <div key={idx} className="border border-indigo-100 p-6 bg-white rounded-xl">
                              <div className="mb-5">
                                <BriefcaseIcon className="w-14 text-indigo-500 border-2 border-indigo-500 p-2 rounded-2xl" />
                                <div>

                                </div>
                              </div>
                              <h3 className="text-2xl text-[#2D3748] mb-3">{note.title}</h3>
                              <p className="text-[#6E7D94] mb-4">{note.content}</p>
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
      {/* View single product */}
      <>
        <Modal show={showView} setShow={setShowView}>
          {/* <ViewNote selected={selected} /> */}ksdl
        </Modal>
      </>
    </>
  );
};

export default Notes;