'use client';

import { Checkbox } from 'antd';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import FloatInput from '@/components/FloatInput';
import {
  useApplicationFormStore,
  type FieldFormData,
} from '@/store/useApplicationFormStore';

interface NewCellProps {
  pageId: string | number;
  fieldId: string | number;
}

export default function NewCell({ pageId, fieldId }: NewCellProps) {
  const { pages, updateField } = useApplicationFormStore();
  const page = pages.find((p) => p.id === pageId);
  const field = page?.fields.find((f) => f.id === fieldId);

  const { control, watch, reset } = useForm<FieldFormData>({
    defaultValues: field || ({} as FieldFormData),
    mode: 'onChange',
  });

  // Watch all form values and sync with store
  const formValues = watch();
  const isInitialMount = useRef(true);

  // Initialize form when field data changes (e.g., from API)
  // IMPORTANT: All hooks must be called before any early returns
  useEffect(() => {
    if (field && isInitialMount.current) {
      reset(field);
      isInitialMount.current = false;
    }
  }, [field, reset]);

  // Sync form values to store whenever user types (debounced)
  useEffect(() => {
    if (!field) return; // Early exit if field doesn't exist
    if (isInitialMount.current) return; // Skip on initial mount

    const timeoutId = setTimeout(() => {
      Object.entries(formValues).forEach(([key, value]) => {
        const fieldValue = field[key as keyof FieldFormData];
        if (value !== fieldValue && value !== undefined) {
          updateField(pageId, fieldId, {
            [key]: value,
          } as Partial<FieldFormData>);
        }
      });
    }, 300); // Debounce by 300ms

    return () => clearTimeout(timeoutId);
  }, [formValues, field, pageId, fieldId, updateField]);

  // Early return AFTER all hooks are called
  if (!field) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Label sırası */}
      <Controller
        name="label_az"
        control={control}
        rules={{ required: 'Label (aze) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Label (aze)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="label_ru"
        control={control}
        rules={{ required: 'Label (ru) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Label (ru)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="label_en"
        control={control}
        rules={{ required: 'Label (eng) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Label (eng)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />

      {/* Placeholder sırası */}
      <Controller
        name="placeholder_az"
        control={control}
        rules={{ required: 'Placeholder (aze) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Placeholder (aze)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="placeholder_ru"
        control={control}
        rules={{ required: 'Placeholder (ru) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Placeholder (ru)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="placeholder_en"
        control={control}
        rules={{ required: 'Placeholder (eng) mütləq doldurulmalıdır' }}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Placeholder (eng)"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            required
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />

      {/* Field details və Mandatory */}
      <Controller
        name="field_details"
        control={control}
        render={({ field, fieldState }) => (
          <FloatInput
            label="Field details"
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
          />
        )}
      />
      <Controller
        name="mandatory"
        control={control}
        render={({ field }) => (
          <div className="flex items-center">
            <Checkbox
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              Mandatory
            </Checkbox>
          </div>
        )}
      />
    </div>
  );
}
