import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form'
import productService from '../../infrastructure/services/product.service'
import type { Product } from '../../interfaces/products/get-products.interface'

interface IHorizontalProductSearchFormProps<T extends FieldValues> {
  label?: string
  name: Path<T>
  control: Control<T>
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
}

const HorizontalProductSearchForm = <T extends FieldValues>({
  label,
  name,
  control,
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
}: IHorizontalProductSearchFormProps<T>) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query) {
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await productService.getProducts({ name: query })
        setResults(response.products ?? [])
      } catch (error) {
        console.error(error)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`flex items-center ${vertical ? 'flex-col items-start gap-2' : 'flex gap-5'} `}>
      {label && (
        <label className={`block text-[17px] text-black font-medium ${width}`}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative w-full" ref={containerRef}>
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
              <input
                id={id}
                type="text"
                placeholder={placeholder ?? 'Buscar producto...'}
                className="flex-1 h-full focus:outline-none focus:ring-0 text-black"
                value={query}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIsOpen(true)
                  field.onChange(undefined)
                }}
              />
            </div>

            {isOpen && query && results.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full max-h-52 overflow-auto bg-white border border-border-input rounded-[10px] shadow-md">
                {results.map((product) => (
                  <li
                    key={product.id}
                    className="px-3.5 py-2 cursor-pointer hover:bg-border-color"
                    onClick={() => {
                      field.onChange(product.id)
                      setQuery(product.name)
                      setIsOpen(false)
                    }}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
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

export default HorizontalProductSearchForm
