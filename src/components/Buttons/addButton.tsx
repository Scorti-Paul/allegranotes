import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function AddButton({ label, onClick }: Props) {
  return (
    <div className="transition-all ease-in-out delay-150 duration-700">
      <button
        onClick={onClick}
        className={`flex rounded-lg  items-center gap-3 bg-green-600 text-white p-3`}
      >
        <span className={`text-sm`}>{label}</span>
        <span>
          <PlusCircleIcon className="w-6" />
        </span>
      </button>
    </div>
  );
}

export default AddButton;