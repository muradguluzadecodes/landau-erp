import FormHeaderContent from '@/components/new-application-form/FormHeaderContent';
import TechnicalInfo from '@/components/new-application-form/TechnicalInfo';

export default function Page() {
  return (
    <div className="relative border border-border bg-section-bg w-full rounded-[20px] p-10 flex flex-col gap-8">
      <FormHeaderContent />
      <TechnicalInfo />
      <div className="flex justify-end">
        <button className="bg-[#0044FF] text-white text-[16px] font-regular py-4 rounded-[100px] w-[30%]">
          Növbəti
        </button>
      </div>
    </div>
  );
}
