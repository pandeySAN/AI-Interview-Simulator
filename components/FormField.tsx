import React from 'react'
import { Form, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, FormDescription } from '@/components/ui/form'
import { Controller } from 'react-hook-form'
interface FormFieldProps<T extends FieldValues>{
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    type?: string
}

const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (
  <Controller name={name} control={control} render={({ field }) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} type={type} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        )

export default FormField