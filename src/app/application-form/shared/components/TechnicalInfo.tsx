'use client';

import { Pencil } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import BannerPreviewCard from './BannerPreviewCard';
import FloatInput from '@/components/FloatInput';
import {
  NEW_APPLICATION_FORM_CONFIRMATION_TEXTS,
  NEW_APPLICATION_FORM_RULES,
  NEW_APPLICATION_FORM_TECHNICAL_INFO,
} from '@/constants/newApplicationForm';
import {
  useApplicationFormStore,
  type TechnicalInfoFormData,
} from '@/store/useApplicationFormStore';

export default function TechnicalInfo({
  openTechnicalInfoRulesModal,
  openBannerDeleteModal,
}: {
  openTechnicalInfoRulesModal: (
    value: boolean,
    ruleKey?: 'rules_text_az' | 'rules_text_ru' | 'rules_text_en',
  ) => void;
  openBannerDeleteModal: (value: boolean) => void;
}) {
  const { technicalInfo, setTechnicalInfoField, isInitialized } =
    useApplicationFormStore();
  const isInitialMount = useRef(true);

  const { control, watch, reset } = useForm<TechnicalInfoFormData>({
    defaultValues: technicalInfo,
    mode: 'onChange',
  });

  // Watch all form values and sync with store
  const formValues = watch();

  // Initialize form when store data is loaded from API (only once)
  useEffect(() => {
    if (isInitialized && isInitialMount.current) {
      reset(technicalInfo);
      isInitialMount.current = false;
    }
  }, [isInitialized, technicalInfo, reset]);

  // Sync form values to store whenever user types (debounced to avoid excessive updates)
  useEffect(() => {
    if (isInitialMount.current) return; // Skip on initial mount

    const timeoutId = setTimeout(() => {
      // Only sync string fields (exclude objects, numbers, booleans)
      const stringFields = [
        ...NEW_APPLICATION_FORM_TECHNICAL_INFO.map((item) => item.key),
        ...NEW_APPLICATION_FORM_CONFIRMATION_TEXTS.map((item) => item.key),
        ...NEW_APPLICATION_FORM_RULES.map((item) => item.key),
      ] as (keyof TechnicalInfoFormData)[];

      stringFields.forEach((key) => {
        const value = formValues[key];
        const storeValue = technicalInfo[key];
        if (
          value !== storeValue &&
          value !== undefined &&
          typeof value === 'string'
        ) {
          setTechnicalInfoField(key, value || '');
        }
      });
    }, 300); // Debounce by 300ms

    return () => clearTimeout(timeoutId);
  }, [formValues, technicalInfo, setTechnicalInfoField]);

  return (
    <div className="bg-[#f7f7f7] rounded-[16px] overflow-hidden p-8">
      <h3 className="text-[20px] font-semibold text-[#141414] mb-6">
        Texniki məlumatlar
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {NEW_APPLICATION_FORM_TECHNICAL_INFO.map((item) => (
          <Controller
            key={item.key}
            name={item.key as keyof TechnicalInfoFormData}
            control={control}
            rules={{
              required: item.required
                ? `${item.label} mütləq doldurulmalıdır`
                : false,
            }}
            render={({ field, fieldState }) => {
              // Handle object fields (module, submodule, academic_year, responsible_person)
              const isObjectField = [
                'module',
                'submodule',
                'academic_year',
                'responsible_person',
              ].includes(item.key);
              let displayValue = '';

              if (typeof field.value === 'string') {
                displayValue = field.value;
              } else if (field.value && typeof field.value === 'object') {
                // For module, submodule, academic_year, responsible_person
                if ('name' in field.value) {
                  displayValue = (field.value as { name?: string }).name || '';
                } else if ('start_date' in field.value) {
                  displayValue =
                    (field.value as { start_date?: string }).start_date || '';
                } else if ('username' in field.value) {
                  displayValue =
                    (field.value as { username?: string }).username || '';
                }
              }

              return (
                <FloatInput
                  label={item.label}
                  type={item.type}
                  required={item.required}
                  value={displayValue}
                  onChange={
                    item.type === 'select' || isObjectField
                      ? undefined
                      : (e) => {
                          const value = e.target.value;
                          if (typeof value === 'string') {
                            field.onChange(value);
                          }
                        }
                  }
                  onSelectChange={
                    item.type === 'select'
                      ? (value) => {
                          if (typeof value === 'string') {
                            field.onChange(value);
                          }
                        }
                      : undefined
                  }
                  options={item.options}
                  errorMessage={fieldState.error?.message}
                  isError={!!fieldState.error}
                  disabled={isObjectField} // Disable object fields as they come from API
                />
              );
            }}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 auto-rows-fr">
          {NEW_APPLICATION_FORM_RULES.map((item) => (
            <div
              key={item.key}
              className="relative rounded-[24px] h-[200px] py-4 px-5 border border-[#CECECE]"
              onClick={() =>
                openTechnicalInfoRulesModal(
                  true,
                  item.key as
                    | 'rules_text_az'
                    | 'rules_text_ru'
                    | 'rules_text_en',
                )
              }
            >
              <p className="text-[14px] font-regular text-[#141414]">
                {item.label}
              </p>
              <span className="absolute right-6 bottom-4 text-[#555555]">
                <Pencil size={24} />
              </span>
            </div>
          ))}
          {/* <BannerUploadPlaceholder/> */}
          <BannerPreviewCard openBannerDeleteModal={openBannerDeleteModal} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {NEW_APPLICATION_FORM_CONFIRMATION_TEXTS.map((item) => (
          <Controller
            key={item.key}
            name={item.key as keyof TechnicalInfoFormData}
            control={control}
            rules={{
              required: item.required
                ? `${item.label} mütləq doldurulmalıdır`
                : false,
            }}
            render={({ field, fieldState }) => (
              <FloatInput
                label={item.label}
                type={item.type}
                required={item.required}
                value={
                  (typeof field.value === 'string' ? field.value : '') || ''
                }
                onChange={(e) => field.onChange(e.target.value)}
                errorMessage={fieldState.error?.message}
                isError={!!fieldState.error}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
}
