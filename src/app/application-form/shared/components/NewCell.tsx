'use client';

import { Checkbox } from 'antd';
import { ChangeEvent, useState } from 'react';

import FloatInput from '@/components/FloatInput';

export default function NewCell() {
  const [formData, setFormData] = useState({
    entryTextAze: '',
    entryTextRu: '',
    entryTextEng: '',
    headerAze: '',
    headerRu: '',
    headerEng: '',
    linkedField: '',
    mandatory: false,
  });

  const handleInputChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSelectChange = (key: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, mandatory: checked }));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Giriş mətni sırası */}
      <FloatInput
        label="Giriş mətni (aze)"
        type="text"
        value={formData.entryTextAze}
        onChange={handleInputChange('entryTextAze')}
        required
      />
      <FloatInput
        label="Giriş mətni (ru)"
        type="text"
        value={formData.entryTextRu}
        onChange={handleInputChange('entryTextRu')}
        required
      />
      <FloatInput
        label="Giriş mətni (eng)"
        type="text"
        value={formData.entryTextEng}
        onChange={handleInputChange('entryTextEng')}
        required
      />

      {/* Header sırası */}
      <FloatInput
        label="Header (aze)"
        type="text"
        value={formData.headerAze}
        onChange={handleInputChange('headerAze')}
        required
      />
      <FloatInput
        label="Header (ru)"
        type="text"
        value={formData.headerRu}
        onChange={handleInputChange('headerRu')}
        required
      />
      <FloatInput
        label="Header (eng)"
        type="text"
        value={formData.headerEng}
        onChange={handleInputChange('headerEng')}
        required
      />

      {/* Linked field və Mandatory */}
      <FloatInput
        label="Linked field"
        type="select"
        value={formData.linkedField}
        onSelectChange={handleSelectChange('linkedField')}
        options={[
          { label: 'Seçin', value: '' },
          // Buraya real seçimlər əlavə edilə bilər
        ]}
        required
      />
      <div className="flex items-center">
        <Checkbox
          checked={formData.mandatory}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        >
          Mandatory
        </Checkbox>
      </div>
    </div>
  );
}
