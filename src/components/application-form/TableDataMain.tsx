import { ApplicationForm } from "@/lib/types";

function TableDataMain(props: ApplicationForm) {
  const { module, submodule, academic_year } = props;
  return (
    <div className="p-4 border-t border-b border-[#DFDFDF] grid grid-cols-2 gap-4">
      <div>
        <span className="text-[12px] font-medium text-[#555555]">Modul</span>
        <h4 className="text-[12px] font-semibold text-[#141414]">{module.name}</h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Yaradılma tarixi 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">{academic_year.start_date}</h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Alt modul 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">
          {submodule.name}
        </h4>
      </div>
      <div>
        <span className="text-[12px] font-medium text-[#555555]">
          Tədris ili 
        </span>
        <h4 className="text-[12px] font-semibold text-[#141414]">{academic_year.start_date.split('-')[0]}</h4>
      </div>
    </div>
  );
}

export default TableDataMain;
