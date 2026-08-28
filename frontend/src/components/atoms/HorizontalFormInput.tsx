import { Controller } from 'react-hook-form'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import type { ChangeEvent } from 'react'
import Input from './Input'

interface IHorizontalFormInputProps<T extends FieldValues> {
  label?: string
  type: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  id?: string
  placeholder?: string
  isSubmitted?: boolean
  minAfterToday?: boolean
  bg?: string
  height?: string
  border?: string
  borderColor?: string
  vertical?: boolean
  width?: string
}

const HorizontalFormInput = <T extends FieldValues>({
  label,
  type,
  name,
  control,
  error,
  id,
  placeholder,
  isSubmitted,
  minAfterToday,
  bg = 'bg-white',
  height = 'h-[44px]',
  border = 'border',
  borderColor = 'border-border-input',
  vertical = false,
  width= 'w-[150px]'
}: IHorizontalFormInputProps<T>) => {
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]

  const min =
    type === 'date' && minAfterToday === true
      ? tomorrowStr
      : undefined
  const max =
    type === 'date' && minAfterToday === false
      ? today
      : undefined

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
            <Input
              id={id}
              type={type}
              error={error?.message}
              placeholder={placeholder}
              color="black"
              fontSize="text-base"
              isSubmitted={isSubmitted}
              min={min}
              max={max}
              value={
                type === 'date'
                  ? field.value
                    ? new Date(field.value).toISOString().split('T')[0]
                    : ''
                  : field.value ?? ''
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value
                if (type === 'date') {
                  field.onChange(val ? new Date(val) : undefined)
                } else if (type === 'number') {
                  field.onChange(val === '' ? undefined : Number(val))
                } else {
                  field.onChange(val)
                }
              }}
            />
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

export default HorizontalFormInput
