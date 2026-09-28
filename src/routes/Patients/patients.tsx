import HeaderPatiens from "./Header"
import TablePatien from "./Table"

function Patients() {
  return (
    <div className="rounded-3xl bg-(--bg-table) p-4">
      <HeaderPatiens/>
      <TablePatien/>
    </div>
  )
}

export default Patients