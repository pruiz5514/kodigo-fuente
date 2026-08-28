import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Form from '../atoms/Form'
import HorizontalFormInput from '../atoms/HorizontalFormInput'
import HorizontalSelectForm from '../atoms/HorizontalSelectForm'
import HorizontalProductSearchForm from '../atoms/HorizontalProductSearchForm'
import Button from '../atoms/Button'
import discountService from '../../infrastructure/services/discount.service'
import categoryService from '../../infrastructure/services/category.service'
import type { Category } from '../../interfaces/categories/get-categories.interface'
import { successAlert, errorAlertOk } from '../../infrastructure/utils/alerts/alerts'
import { getApiErrorMessage } from '../../infrastructure/utils/get-api-error-message'

function getBogotaToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date())
}

function toDateOnly(date: Date): string {
  return date.toISOString().split('T')[0]
}

const DISCOUNT_TYPE_OPTIONS = [
  { label: 'Porcentaje', value: 1 },
  { label: 'Monto fijo', value: 2 },
]

const DISCOUNT_TARGET_OPTIONS = [
  { label: 'Categoría', value: 'category' },
  { label: 'Producto', value: 'product' },
]

const PERCENTAGE_DISCOUNT_TYPE_ID = 1

const discountFormSchema = z
  .object({
    name: z.string().min(1, 'Campo requerido'),
    discount_target: z.enum(['category', 'product'], { error: 'Campo requerido' }),
    category_id: z.number().optional(),
    product_id: z.number().optional(),
    discount_type_id: z.number({ error: 'Campo requerido' }).min(1, 'Campo requerido'),
    discount_value: z.number({ error: 'Campo requerido' }).positive('Campo requerido'),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.discount_target === 'category' && !data.category_id) {
      ctx.addIssue({ code: 'custom', message: 'Campo requerido', path: ['category_id'] })
    }

    if (data.discount_target === 'product' && !data.product_id) {
      ctx.addIssue({ code: 'custom', message: 'Campo requerido', path: ['product_id'] })
    }

    if (data.discount_type_id === PERCENTAGE_DISCOUNT_TYPE_ID && data.discount_value) {
      if (data.discount_value < 1 || data.discount_value > 100) {
        ctx.addIssue({
          code: 'custom',
          message: 'Si el tipo de descuento es "Porcentaje", el valor debe estar entre 1 y 100',
          path: ['discount_value'],
        })
      } else if (!Number.isInteger(data.discount_value)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Si el tipo de descuento es "Porcentaje", el valor debe ser un número entero',
          path: ['discount_value'],
        })
      }
    }

    if (!data.start_date) {
      ctx.addIssue({ code: 'custom', message: 'Campo requerido', path: ['start_date'] })
    } else if (toDateOnly(data.start_date) < getBogotaToday()) {
      ctx.addIssue({
        code: 'custom',
        message: '"start_date" no puede ser anterior a la fecha de hoy',
        path: ['start_date'],
      })
    }

    if (!data.end_date) {
      ctx.addIssue({ code: 'custom', message: 'Campo requerido', path: ['end_date'] })
    } else if (data.start_date && data.end_date < data.start_date) {
      ctx.addIssue({
        code: 'custom',
        message: '"end_date" no puede ser anterior a "start_date"',
        path: ['end_date'],
      })
    }
  })

type DiscountFormValues = z.infer<typeof discountFormSchema>

interface IDiscountFormProps {
  cancelButton: () => void
  onCreated?: () => void
}

const DiscountForm = ({ cancelButton, onCreated }: IDiscountFormProps) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories()
        setCategories(response.categories ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<DiscountFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const discountTarget = watch('discount_target')

  const onSubmit = async (data: DiscountFormValues) => {
    try {
      await discountService.createDiscount({
        name: data.name,
        discount_type_id: data.discount_type_id,
        discount_value: data.discount_value,
        start_date: data.start_date as Date,
        end_date: data.end_date as Date,
        ...(data.discount_target === 'category'
          ? { category_id: data.category_id }
          : { product_id: data.product_id }),
      })
      successAlert('¡Listo!', 'El descuento se creó correctamente')
      onCreated?.()
      cancelButton()
    } catch (error) {
      console.error(error)
      errorAlertOk('Error', getApiErrorMessage(error))
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold text-muted mb-6">Crear descuento</h2>

      <div className="flex flex-col gap-3">
        <HorizontalFormInput<DiscountFormValues>
          type="text"
          label="Nombre*"
          name="name"
          error={errors.name}
          control={control}
          isSubmitted={isSubmitted}
        />

        <HorizontalSelectForm<DiscountFormValues>
          label="Aplica a*"
          name="discount_target"
          control={control}
          options={DISCOUNT_TARGET_OPTIONS}
          error={errors.discount_target}
          isSubmitted={isSubmitted}
          valueType="string"
        />

        {discountTarget === 'product' && (
          <HorizontalProductSearchForm<DiscountFormValues>
            label="Producto*"
            name="product_id"
            control={control}
            error={errors.product_id}
            isSubmitted={isSubmitted}
          />
        )}

        {discountTarget === 'category' && (
          <HorizontalSelectForm<DiscountFormValues>
            label="Categoría*"
            name="category_id"
            control={control}
            options={categories.map((category) => ({ label: category.name, value: category.id }))}
            error={errors.category_id}
            isSubmitted={isSubmitted}
          />
        )}

        <HorizontalSelectForm<DiscountFormValues>
          label="Tipo de descuento*"
          name="discount_type_id"
          control={control}
          options={DISCOUNT_TYPE_OPTIONS}
          error={errors.discount_type_id}
          isSubmitted={isSubmitted}
        />

        <HorizontalFormInput<DiscountFormValues>
          type="number"
          label="Valor*"
          name="discount_value"
          error={errors.discount_value}
          control={control}
          isSubmitted={isSubmitted}
        />

        <HorizontalFormInput<DiscountFormValues>
          type="date"
          label="Fecha inicio*"
          name="start_date"
          error={errors.start_date}
          control={control}
          isSubmitted={isSubmitted}
        />

        <HorizontalFormInput<DiscountFormValues>
          type="date"
          label="Fecha fin*"
          name="end_date"
          error={errors.end_date}
          control={control}
          isSubmitted={isSubmitted}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button label="Cancelar" variant="secondary" type="button" onClick={cancelButton} />
        <Button label="Crear descuento" variant="primary" type="submit" />
      </div>
    </Form>
  )
}

export default DiscountForm
