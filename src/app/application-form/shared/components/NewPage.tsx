'use client';

import { Checkbox } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import NewCell from './NewCell';

interface NewPageProps {
  pageNumber: number;
  onDelete?: () => void;
}

export default function NewPage({ pageNumber, onDelete }: NewPageProps) {
  const [incompleteLead, setIncompleteLead] = useState(false);
  const [cells, setCells] = useState([{ id: 1 }]);

  const handleAddCell = () => {
    setCells((prev) => [...prev, { id: Date.now() }]);
  };

  const handleDeleteCell = (cellId: number) => {
    setCells((prev) => prev.filter((cell) => cell.id !== cellId));
  };

  return (
    <div className="bg-[#F7F7F7] rounded-[16px] p-6 relative">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-semibold text-[#141414]">
          {pageNumber}ci səhifə
        </h3>
        <div className="flex items-center gap-4">
          <Checkbox
            checked={incompleteLead}
            onChange={(e) => setIncompleteLead(e.target.checked)}
          >
            Natamam lead
          </Checkbox>
        </div>
      </div>
      {/* <div className="border border-[##cecece] rounded-[24px] p-5">

        {/* Cells section */}
      <div className="flex flex-col gap-6">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="border border-[#dfdfdf]! rounded-[24px] p-5"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleDeleteCell(cell.id)}
                aria-label="Xananı sil"
              >
                <Trash2 size={16} className="text-[#0044FF]" />
              </button>
            </div>
            <NewCell />
          </div>
        ))}
      </div>
      {/* </div> */}

      {/* Add cell button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAddCell}
          className="flex items-center gap-2 text-[#0044FF] hover:text-[#0033CC] transition-colors"
        >
          <Plus size={20} />
          <span className="text-[14px] font-regular">Əlavə xana əlavə et</span>
        </button>
      </div>
    </div>
  );
}

