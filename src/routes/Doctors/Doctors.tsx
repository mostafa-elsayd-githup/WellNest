import Header from "./header";
import Table from "./Table";

function Doctors() {
  return (
    <div className=" rounded-3xl bg-(--bg-table) p-4">
      <Header />
      <Table/>
    </div>
  );
}

export default Doctors;
