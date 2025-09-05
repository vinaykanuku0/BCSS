import React, { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const CommonTable = ({ values, columns, goTo, notIncludekeys = [], callApi, pagination, searchEnable }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [paginationData, setPaginationData] = useState(pagination);
  const [columns1, setColumns1] = useState([]);
  const [sortedValues, setSortedValues] = useState([]);

  const changePaginationData = (u) => {
    const updated = { ...paginationData, ...u };
    setPaginationData(updated);
    callApi(updated);
  };

  const sorting = (item) => {
    if (!item?.sortable) return;
    const key = item.key;
    const sorted = item.sorted;

    const sortedData = [...sortedValues].sort((a, b) => {
      const valA = a?.[key];
      const valB = b?.[key];

      if (item.type === "Number") {
        return sorted ? valB - valA : valA - valB;
      } else if (item.type === "Date") {
        return sorted ? new Date(valB) - new Date(valA) : new Date(valA) - new Date(valB);
      } else {
        return sorted
          ? String(valB || "").localeCompare(String(valA || ""))
          : String(valA || "").localeCompare(String(valB || ""));
      }
    });

    setSortedValues(sortedData);

    const updatedColumns = columns1.map((col) =>
      col.key === key ? { ...col, sorted: !sorted } : { ...col, sorted: false }
    );
    setColumns1(updatedColumns);
  };

  const totalPages = Math.ceil(paginationData?.totalCount / paginationData?.pageSize);
  const startIndex = ((paginationData?.pageNumber || 1) - 1) * (paginationData?.pageSize || 10);
  useEffect(() => {
    setColumns1(columns?.map((e) => ({ ...e, sorted: false })));
  }, [columns]);

  useEffect(() => {
    setSortedValues(values || []);
  }, [values]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPaginationData(pagination);
  }, [pagination]);

  return (
    <div className="d-flex flex-column px-1 border rounded mt-2" style={{ height: "98%" }}>
      {sortedValues?.length > 0 ? (
        <>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowX: "auto" }}>
            {!isMobile ? (
              <>
                <div className="d-flex fw-bold bg-light" style={{ minWidth: `${(columns?.length + 1) * 150}px` }}>
                  <div className="py-2 px-1 fw-bold" style={{ minWidth: "60px" }}>
                    S.No
                  </div>
                  {columns1?.map((col, index) => (
                    <div
                      key={index}
                      className="py-2 pointer px-1"
                      style={{ flex: 1, minWidth: "140px" }}
                      onClick={() => sorting(col)}
                    >
                      {col?.name}
                      {col?.sortable && <>{col?.sorted ? <BiDownArrow size={15} /> : <BiUpArrow size={15} />}</>}
                    </div>
                  ))}
                </div>

                <div
                  className="border-bottom"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    minWidth: `${(columns?.length + 1) * 150}px`,
                  }}
                >
                  {sortedValues?.map((e, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-start py-2 border-bottom pointer"
                     style={{
  backgroundColor:
    e?.medication === "Yes"
      ? "#5afa8d" // medication - top priority (green)
      : e?.investigation === "Yes"
      ? "#f7b40a" // investigation - second priority (yellow)
      : e?.isPrescriptionUpdated === "Yes"
      ? "#00bfff" // prescription updated - last priority (blue)
      : "white",  // default
}}

                    >
                      <div className="px-2" style={{ minWidth: "60px" }}>
                        {startIndex + i + 1}
                      </div>
                      {columns1?.map((c, j) => (
                        <div
                          key={j}
                          className="px-2"
                          style={{
                            flex: 1,
                            minWidth: "140px",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                          onClick={() => {
                            if (!notIncludekeys?.includes(j)) {
                              goTo && goTo(e);
                            }
                          }}
                        >
                          {c?.selector?.(e, i) || e[c?.key] || "-"}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, overflowY: "auto" }}>
                {sortedValues?.map((e, i) => (
                  <div
                    key={i}
                    className="card p-3 my-2 shadow-sm"
                      style={{
  backgroundColor:
    e?.medication === "Yes"
      ? "#5afa8d" // medication - top priority (green)
      : e?.investigation === "Yes"
      ? "#f7b40a" // investigation - second priority (yellow)
      : e?.isPrescriptionUpdated === "Yes"
      ? "#00bfff" // prescription updated - last priority (blue)
      : "white",  // default
}}
                  >
                    <div className="d-flex justify-content-between mb-1">
                      <strong className="me-2">S.No:</strong>
                      <span>{startIndex + i + 1}</span>
                    </div>
                    {columns1?.map((c, j) => (
                      <div key={j} className="d-flex justify-content-between mb-1">
                        <strong className="me-2">{c?.name}:</strong>
                        <span className="text-end">{c?.selector?.(e, j) || e[c?.key] || "-"}</span>
                      </div>
                    ))}
                    <hr className="my-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {pagination && (
            <div className="d-flex justify-content-between align-items-center flex-wrap pt-2 bg-white">
              <div>
                Showing {pagination?.searchKey ? 1 : startIndex + 1} -{" "}
                {Math.min(startIndex + paginationData?.pageSize, paginationData?.totalCount)} of{" "}
                {paginationData?.totalCount} entries
              </div>
              <div className="d-flex gap-2 align-items-center mt-2 mt-md-0">
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled={paginationData?.pageNumber === 1 || totalPages === 1}
                  onClick={() => changePaginationData({ pageNumber: paginationData?.pageNumber - 1 })}
                >
                  Prev
                </button>
                <div>Page {paginationData?.pageNumber}</div>
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled={paginationData?.pageNumber === totalPages || totalPages === 1}
                  onClick={() => changePaginationData({ pageNumber: paginationData?.pageNumber + 1 })}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center p-4">No Data Found</div>
      )}
    </div>
  );
};

export default CommonTable;
