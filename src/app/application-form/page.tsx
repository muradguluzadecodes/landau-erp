import ApplicationFormHead from "@/components/application-form/ApplicationFormHead";
import ApplicationFormTable from "@/components/application-form/ApplicationFormTable";

export default function Page() {
  return (
    <div className="relative border border-border bg-section-bg w-full rounded-[20px] pt-[22px] pb-15 px-8 flex flex-col gap-8">
      <ApplicationFormHead />
      <ApplicationFormTable />
    </div>
  );
}
