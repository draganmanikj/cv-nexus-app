import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

const ErrorFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext()

  useEffect(() => {
    const keys = Object.keys(errors)
   
    if (keys.length > 0 && isSubmitting && !isValidating) {
      let errorElement = document.querySelector(`div.formScroll [name="${keys[0]}"]`)
      if(errorElement) {      
         errorElement.scrollIntoView({behavior:"smooth"})
      }
    }
  }, [isSubmitting, isValidating, errors])

  return null
}
 export default ErrorFocus;

