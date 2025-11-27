import React from 'react';

export default function NoInfo() {
  return (
    <div className="w-1/2 mx-auto flex flex-col gap-3 items-center justify-center bg-[#F7F7F7] rounded-[20px] p-[60px]">
      <h3 className="text-[24px] font-semibold text-[#141414]">
        Məlumat yoxdur
      </h3>
      <p className="text-[16px] font-medium text-[#383838]">
        Yeni məlumat əlavə etmək üçün səhifə yaradın!
      </p>
    </div>
  );
}

