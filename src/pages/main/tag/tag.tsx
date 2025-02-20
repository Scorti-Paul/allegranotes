import { FC, Suspense, useCallback, useState } from "react";
import Header from "../../../components/Header";
import { useQuery } from "react-query";
import { MoonLoader } from "react-spinners";
import { get } from "../../../api";
import List from "./components/list";
import AddButton from "components/Buttons/addButton";
import CreateTag from "./components/createtag";
import TopLoader from "components/loaders/top";

const Tags: FC<{}> = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { data, isFetching, refetch } = useQuery(["tags"], () =>
    get("/tags")
  );

  const toggleShowAdd = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      setShowAdd(!showAdd);
    },
    [showAdd]
  );

  return (
    <>
      <div className="md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header
            title="Tags"
            description="A list of all the tags."
          >
            <AddButton onClick={toggleShowAdd} />
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
                  <div className="h-full inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <List data={data?.data} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* <Pagination hasMore={true} total={data?.total} /> */}
              </div>
            </>
          )}
        </div>
      </div>
      {/* View single create tag */}
      <Suspense fallback={<TopLoader />}>
        <div className="flex justify-center ml-10">
          <CreateTag show={showAdd} setShow={setShowAdd} refetch={refetch} />
        </div>
      </Suspense>
    </>
  );
};

export default Tags;