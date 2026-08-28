import { Controller } from 'react-hook-form'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'

interface IOption {
  label: string
  value: string | number
}

interface IHorizontalSelectFormProps<T extends FieldValues> {
  label?: string
  name: Path<T>
  control: Control<T>
  options: IOption[]
  error?: FieldError
  id?: string
  placeholder?: string
  isSubmitted?: boolean
  bg?: string
  height?: string
  border?: string
  borderColor?: string
  vertical?: boolean
  width?: string
  valueType?: 'number' | 'string'
}

const HorizontalSelectForm = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
  id,
  placeholder,
  isSubmitted,
  bg = 'bg-white',
  height = 'h-[44px]',
  border = 'border',
  borderColor = 'border-border-input',
  vertical = false,
  width = 'w-[150px]',
  valueType = 'number',
}: IHorizontalSelectFormProps<T>) => {
  return (
    <div className={`flex items-center ${vertical ? 'flex-col items-start gap-2' : 'flex gap-5'} `}>
      {label && (
        <label className={`block text-[17px] text-black font-medium ${width}`}>
          {label}
        </label>
      )}
      <div
        className={`
          w-full
          rounded-[10px]
          px-3.5
          ${border}
          ${borderColor}
          flex
          items-center
          ${bg}
          ${height}
        `}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              id={id}
              className="flex-1 h-full focus:outline-none focus:ring-0 text-black bg-transparent"
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value
                field.onChange(val === '' ? undefined : valueType === 'number' ? Number(val) : val)
              }}
            >
              <option value="" disabled>
                {placeholder ?? 'Seleccione una opción'}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      {isSubmitted && error?.message && (
        <div className="mt-1.5">
          <p className="text-sm text-red-500 transition-opacity duration-300">
            {error.message}
          </p>
        </div>
      )}
    </div>
  )
}

export default HorizontalSelectForm
