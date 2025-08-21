import React from 'react'
import { Form, FormField, FormItem, FormLabel, FormControl, Input, FormMessage, FormDescription } from '@/components/ui/form'

const FormField = () => (
  <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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