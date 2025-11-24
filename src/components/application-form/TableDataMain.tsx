
function TableDataMain() {
  return (
    <div className="p-4 border-t border-b border-[#DFDFDF] grid grid-cols-2 gap-4">
      <div>
        <span className="text-[12px] font-medium text-[#555555]">Modul</span>
        <h4 className="text-[12px] font-semibold text-[#141414]">Modul adı</h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Yaradılma tarixi 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">25.09.2024</h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Alt modul 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">
          Alt modul adı
        </h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Tədris ili 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">2025</h4>
      </div>
    </div>
  );
}

export default TableDataMain;
