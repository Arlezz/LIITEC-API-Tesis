export default function Layout({children}) {
    return (
      <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
        <div className="w-full">{children}</div>
      </div>
    );
  }
  