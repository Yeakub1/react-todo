import Templete from "./components/Templete";

function App() {
  const cards = [...Array(15).keys()];
  const todo = [
    "Incomplete",
    "ToDo",
    "Doing",
    "Under Review",
    "Completed",
    "OverDated",
  ];
  return (
    <>
      <div className="overflow-x-auto h-screen">
        <div className="flex pt-4">
          {todo?.map((dt) => (
            <div key={dt} className="bg-gray-200 ml-4 pl-4">
              <h2 className="px-4 py-4 font-semibold flex justify-between">
                {dt} <span className="bg-gray-300 px-[6px] rounded-md">0</span>
              </h2>
              <div
                className="overflow-y-auto flex-shrink-0 space-y-4 inline-block"
                style={{ height: `calc(100vh - 96px)` }}
              >
                {cards?.map((cardNo) => (
                  <Templete key={cardNo}></Templete>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
