// "use client"

// import { useState } from "react"
// import { MacWindow } from "./mac-window"
// import { getTables, getTableData } from "@/app/actions"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Database, TableIcon } from "lucide-react"

// export function DatabaseExplorer() {
//   const [selectedTable, setSelectedTable] = useState<string | null>(null)
//   const [tables, setTables] = useState<string[]>([])
//   const [tableData, setTableData] = useState<{ columns: string[]; rows: any[] } | null>(null)
//   const [isTablesCollapsed, setIsTablesCollapsed] = useState(false)
//   const [isDataCollapsed, setIsDataCollapsed] = useState(false)

//   const loadTables = async () => {
//     const tables = await getTables()
//     setTables(tables)
//   }

//   const loadTableData = async (tableName: string) => {
//     setSelectedTable(tableName)
//     const data = await getTableData(tableName)
//     setTableData(data)
//     // Automatically collapse the tables window when a table is selected
//     setIsTablesCollapsed(true)
//   }

//   return (
//     <div className="grid grid-cols-12 gap-4 p-4">
//       <div className={cn("transition-all duration-300", isTablesCollapsed ? "col-span-1" : "col-span-4")}>
//         <MacWindow
//           title="Database Tables"
//           className="h-[calc(100vh-2rem)]"
//           isCollapsed={isTablesCollapsed}
//           onToggleCollapse={() => setIsTablesCollapsed(!isTablesCollapsed)}
//           showCollapseButton
//         >
//           <div className="space-y-4">
//             <Button variant="outline" className="w-full justify-start" onClick={loadTables}>
//               <Database className="w-4 h-4 mr-2" />
//               Load Tables
//             </Button>
//             <div className="space-y-1">
//               {tables.map((table) => (
//                 <Button
//                   key={table}
//                   variant={selectedTable === table ? "secondary" : "ghost"}
//                   className="w-full justify-start"
//                   onClick={() => loadTableData(table)}
//                 >
//                   <TableIcon className="w-4 h-4 mr-2" />
//                   {table}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </MacWindow>
//       </div>

//       <div className={cn("transition-all duration-300", isTablesCollapsed ? "col-span-11" : "col-span-8")}>
//         <MacWindow
//           title={selectedTable ? `Table: ${selectedTable}` : "Select a table"}
//           className="h-[calc(100vh-2rem)]"
//           isCollapsed={isDataCollapsed}
//           onToggleCollapse={() => setIsDataCollapsed(!isDataCollapsed)}
//           showCollapseButton
//         >
//           {tableData ? (
//             <div className="overflow-auto max-h-[calc(100vh-8rem)]">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     {tableData.columns.map((column) => (
//                       <TableHead key={column}>{column}</TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {tableData.rows.map((row, i) => (
//                     <TableRow key={i}>
//                       {tableData.columns.map((column) => (
//                         <TableCell key={column}>{row[column]?.toString()}</TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center text-zinc-500">Select a table to view its data</div>
//           )}
//         </MacWindow>
//       </div>
//     </div>
//   )
// }

